// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
require('ts-node/register');
require('tsconfig-paths/register');
const JSR = require('jasmine-spec-reporter');
const JR = require('jasmine-reporters');

exports.config = {
  getPageTimeout: 60000,
  allScriptsTimeout: 60000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  chromeDriver: './node_modules/chromedriver/lib/chromedriver/chromedriver',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: process.env.CHROME_BIN,
      args: [ "--headless", "--disable-gpu", "--window-size=1224,1983", "--no-sandbox" ]
    }
  },
  skipSourceMapSupport: true,
  directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: false,
    defaultTimeoutInterval: 600000,
    print: function () {
    }
  },
  onPrepare: function () {
    require('ts-node').register({ project: 'e2e/tsconfig.e2e.json' });
    jasmine.getEnv().addReporter(new JSR.SpecReporter({spec: {displayStacktrace: true}, colors: {enabled: false}}));
    jasmine.getEnv().addReporter(new JR.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './test-results/jasmine-xml',
      filePrefix: 'xmlresults'
    }));
  },
  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');

      var HTMLReport = require('protractor-html-reporter');

      var testConfig = {
        reportTitle: 'Protractor Mock E2E Test Execution Report',
        outputPath: './test-results/protractor-html',
        screenshotPath: './test-results/screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true
      };
      new HTMLReport().from('./test-results/jasmine-xml/xmlresults.xml', testConfig);
    });
  },
  params: {
    // afoster
    foxtusr0: 'foxtusr0',
    foxtusr0password: 'password',
    // jjensen
    foxtusr1: 'foxtusr1',
    foxtusr1password: 'password',
    // mmorris
    foxtusr2: 'foxtusr2',
    foxtusr2password: 'password',
    // aphillip
    foxtusr3: 'foxtusr3',
    foxtusr3password: 'password',
    // rparker
    foxtusr4: 'foxtusr4',
    foxtusr4password: 'password',
    // lrogers
    foxtusr5: 'foxtusr5',
    foxtusr5password: 'password',
    // swhite
    foxtusr6: 'foxtusr6',
    foxtusr6password: 'password',
    // vpanchel
    foxtusr7: 'foxtusr7',
    foxtusr7password: 'password',
    // candrews
    foxtusr8: 'foxtusr8',
    foxtusr8password: 'password',
    // cpurl
    foxtusr9: 'foxtusr9',
    foxtusr9password: 'password',
    // bgreen
    foxtusra: 'foxtusra',
    foxtusrapassword: 'password',
    // tdavies
    foxtusrb: 'foxtusrb',
    foxtusrbpassword: 'password',
    // mswanson
    foxtusrc: 'foxtusrc',
    foxtusrcpassword: 'password',
    // nolsen
    foxtusrd: 'foxtusrd',
    foxtusrdpassword: 'password'
  }
};
