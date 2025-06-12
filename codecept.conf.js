// @ts-check
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
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
  name: 'CeltraQA'
}