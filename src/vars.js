var _format = require('atma-formatter');

var level_TRACE = 100,
    level_DEBUG = 75,
    level_LOG = 50,
    level_WARN = 25,
    level_ERROR = 0,
    level_EXCEPTION = -25
    ;
    
var _cfg = {
		logCaller: true,
		logDate: false,
        color: 'ascii'
	},
	_level = level_LOG,
    _levels = {}
    ;
