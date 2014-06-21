var _format;

// if NodeJS
_format = require('atma-formatter');
// endif

// if Browser
(function(){
	var window,
		module = { exports: {} };
		
	//import /node_modules/atma-formatter/lib/format.min.js
	
	_format = module.exports;
}());
// endif

var level_TRACE = 100,
	level_DEBUG = 75,
	level_LOG = 50,
	level_WARN = 25,
	level_ERROR = 0,
	level_EXCEPTION = -25
	;

var _cfg = {
		formatMessage: true,
		logCaller: true,
		logDate: false,
		logMeta: null,
		color: 'ascii',
		handleExceptions: false
	},
	_level = level_LOG,
	_levels = {}
	;
