'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quan = exports.qual = exports.logger = exports.Config = exports.scales = exports.chart = exports.Chart = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _chart = require('./chart');

Object.defineProperty(exports, 'Chart', {
  enumerable: true,
  get: function get() {
    return _chart.Chart;
  }
});

var _chart2 = require('./decorator/chart');

Object.defineProperty(exports, 'chart', {
  enumerable: true,
  get: function get() {
    return _chart2.chart;
  }
});

var _scales = require('./decorator/scales');

Object.defineProperty(exports, 'scales', {
  enumerable: true,
  get: function get() {
    return _scales.scales;
  }
});

var _utils = require('./utils');

Object.keys(_utils).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});
exports.configure = configure;
exports.isObject = isObject;

var _config = require('./config');

var _aureliaLogging = require('aurelia-logging');

var logger = (0, _aureliaLogging.getLogger)('aurelia-charts');

function configure(aurelia, chartsConfig) {
  aurelia.globalResources('./component/chart-element', './component/dimensions-picker', './component/chart-picker');

  var config = aurelia.container.get(_config.Config);
  var libraries = Object.keys(config.charts);

  if (isObject(chartsConfig)) {
    config.configure(chartsConfig);
  } else if (typeof chartsConfig === 'function') {
    chartsConfig(config);
  } else if (!chartsConfig) {} else if (chartsConfig) {
      logger.warn('chart configurations can be a function or an object not ' + chartsConfig);
    }

  if (libraries.length === 0) {
    logger.warn('no aurelia-charts plugins installed. Head to the docs and read');
  } else {
    logger.debug('installed ' + libraries.join(' and ') + ' as aurelia-charts libraries');
  }
}

var qual = 'qualitative';
var quan = 'quantitative';

exports.Config = _config.Config;
exports.logger = logger;
exports.qual = qual;
exports.quan = quan;
function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
}