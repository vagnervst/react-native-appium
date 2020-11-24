const NodeEnvironment = require('jest-environment-node')
const wdio = require('webdriverio')
const appium = require('appium')

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: 'Android',
    platformVersion: '9',
    deviceName: 'Android Emulator',
    app: './android/app/build/outputs/apk/debug/app-debug.apk',
    appPackage: 'com.appiumapptypescript',
    appActivity: '.MainActivity',
    automationName: 'UiAutomator2',
  }
}

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)

    this.testPath = context.testPath
    this.docblockPragmas = context.docblockPragmas
  }

  async setup () {
    await super.setup()

    this.appium = await appium.main({ 'loglevel': 'none' })

    this.global.client = await wdio.remote(opts)
  }

  async teardown () {
    await super.teardown()

    if (this.global.client) {
      await this.global.client.deleteSession()
    }

    await this.appium.close()
  }
}

module.exports = CustomEnvironment
