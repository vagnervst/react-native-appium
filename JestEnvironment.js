const NodeEnvironment = require('jest-environment-node')
const appium = require('appium')
const wd = require('wd')


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

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)

    this.testPath = context.testPath
    this.docblockPragmas = context.docblockPragmas
  }

  async setup () {
    await super.setup()


    const driver = await wd.promiseChainRemote({
      host: '127.0.0.1',
      port: APPIUM_PORT,
    })

    await initializeDriver(driver)

    this.global.driver = driver
  }

  async teardown () {
    await super.teardown()

    if (this.appium) {
      await this.appium.close()
    }
  }
}

module.exports = CustomEnvironment
