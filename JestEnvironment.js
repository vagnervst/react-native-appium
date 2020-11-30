require('dotenv').config()

const NodeEnvironment = require('jest-environment-node')
const appium = require('appium')
const wd = require('wd')
const isPortReachable = require('is-port-reachable')
const { resolve } = require('path')

const pagarme = require('./src/clients/pagarme')

const APPIUM_PORT = 4723

const isAppiumInspectorRunning = () => isPortReachable(APPIUM_PORT)

const initializeDriver = (driver) => {
  const options = {
    autoLaunch: true,
    platformName: 'Android',
    platformVersion: '9',
    deviceName: 'Android Emulator',
    app: resolve('./android/app/build/outputs/apk/debug/app-debug.apk'),
    appPackage: 'com.appiumapptypescript',
    appActivity: '.MainActivity',
    automationName: 'UiAutomator2',
  }

  return driver.init(options)
}

const sleep = timeout => new Promise(
  resolve => setTimeout(() => resolve(), timeout)
)

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)

    this.testPath = context.testPath
    this.docblockPragmas = context.docblockPragmas
    this.openAppLink = this.openAppLink.bind(this)
  }

  async openAppLink (url) {
    const { driver } = this.global

    if (!driver) throw new Error('appium driver not initialized')

    const deepLinkIntent = `-a android.intent.action.VIEW -d ${url}`

    return driver.startActivity({
      appPackage: 'com.appiumapptypescript',
      appActivity: '.MainActivity',
      optionalIntentArguments: deepLinkIntent,
    })
  }

  async setup () {
    await super.setup()

    const isInspectorRunning = await isAppiumInspectorRunning()
    if (!isInspectorRunning) {
      this.appium = await appium.main({ 'loglevel': 'none' })
    }

    const driver = await wd.promiseChainRemote({
      host: '127.0.0.1',
      port: APPIUM_PORT,
    })

    await initializeDriver(driver)

    const pagarmeClient = pagarme()
    pagarmeClient.authenticate({ api_key: process.env.API_KEY })

    this.global.driver = driver
    this.global.openAppLink = this.openAppLink
    this.global.pagarme = pagarmeClient
    this.global.sleep = sleep
  }

  async teardown () {
    await super.teardown()

    if (this.appium) {
      await this.appium.close()
    }
  }
}

module.exports = CustomEnvironment
