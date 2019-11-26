// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
require('ts-node/register');
require('tsconfig-paths/register');
const JSR = require('jasmine-spec-reporter');
const JR = require('jasmine-reporters');

exports.config = {
  getPageTimeout: 50000,
  allScriptsTimeout: 50000,
  specs: [
    './e2e/**/login.e2e-spec.ts',
    './e2e/**/current-statistics.e2e-spec.ts'
  ],
  chromeDriver: './node_modules/chromedriver/lib/chromedriver/chromedriver',
  capabilities: {
    browserName: 'chrome',
    acceptInsecureCerts: true,
    chromeOptions: {
      binary: process.env.CHROME_BIN,
      args: ["--headless", "--disable-gpu", "--window-size=1224,1983", "--no-sandbox"]
    }
  },
  skipSourceMapSupport: true,
  directConnect: true,
  baseUrl: 'https://foxin2-foxui.ocp-elr-core-nonprod.optum.com/#/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: false,
    defaultTimeoutInterval: 300000,
    print: function () {
    }
  },
  onPrepare: function () {
    require('ts-node').register({project: 'e2e/tsconfig.e2e.json'});
    jasmine.getEnv().addReporter(new JSR.SpecReporter({spec: {displayStacktrace: true}, colors: {enabled: false}}));
    jasmine.getEnv().addReporter(new JR.JUnitXmlReporter({
      consolidateAll: true,
      savePath: '../fox-ui-integration-tests/jasmine-xml',
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
        reportTitle: 'Protractor Integration Test Execution Report',
        outputPath: '../fox-ui-integration-tests/protractor-html',
        screenshotPath: '../fox-ui-integration-tests/screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true
      };
      new HTMLReport().from('../fox-ui-integration-tests/jasmine-xml/xmlresults.xml', testConfig);
    });
  },
  params: {
    // afoster
    foxtusr0: 'foxtusr0',
    foxtusr0password: process.env.foxtusr0_password,
    // jjensen
    foxtusr1: 'foxtusr1',
    foxtusr1password: process.env.foxtusr1_password,
    // mmorris
    foxtusr2: 'foxtusr2',
    foxtusr2password: process.env.foxtusr2_password,
    // aphillip
    foxtusr3: 'foxtusr3',
    foxtusr3password: process.env.foxtusr3_password,
    // rparker
    foxtusr4: 'foxtusr4',
    foxtusr4password: process.env.foxtusr4_password,
    // lrogers
    foxtusr5: 'foxtusr5',
    foxtusr5password: process.env.foxtusr5_password,
    // swhite
    foxtusr6: 'foxtusr6',
    foxtusr6password: process.env.foxtusr6_password,
    // vpanchel
    foxtusr7: 'foxtusr7',
    foxtusr7password: process.env.foxtusr7_password,
    // candrews
    foxtusr8: 'foxtusr8',
    foxtusr8password: process.env.foxtusr8_password,
    // cpurl
    foxtusr9: 'foxtusr9',
    foxtusr9password: process.env.foxtusr9_password,
    // bgreen
    foxtusra: 'foxtusra',
    foxtusrapassword: process.env.foxtusra_password,
    // tdavies
    foxtusrb: 'foxtusrb',
    foxtusrbpassword: process.env.foxtusrb_password,
    // mswanson
    foxtusrc: 'foxtusrc',
    foxtusrcpassword: process.env.foxtusrc_password,
    // nolsen
    foxtusrd: 'foxtusrd',
    foxtusrdpassword: process.env.foxtusrd_password
  }
};
