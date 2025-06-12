/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  plugins: {
    workers: 4,
  },
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost',
      show: true, // Not headless?
      waitForNavigation: "domcontentloaded"
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'CeltraQA',
  multiple: {
    parallel: {
      browsers: ['chromium', 'firefox', 'webkit'],
      browser: {
        chromium: { browser: 'chromium' },
        firefox: { browser: 'firefox' },
        webkit: { browser: 'webkit' }
      }
    }
  }
}