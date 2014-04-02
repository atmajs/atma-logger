(function(root, factory){
	"use strict";

	var _global, _exports;
	
	if (typeof exports !== 'undefined' && (root === exports || root == null)){
		// raw nodejs module
    	_global = _exports = global;
		
		if (_exports.logger != null) 
			_exports = module.exports;
    }
	
	if (_global == null) {
		_global = typeof window === 'undefined'
			? global
			: window
			;
	}
	
	if (_exports == null) 
		_exports = root || _global;
	
	
	factory(_global, _exports);
	
}(this, function(global, exports){
	"use strict";
	
	// source ../src/vars.js
	var _format = require('atma-formatter');
	
	
	var _cfg = {
	        logCaller: true,
	        logDate: false
	    },
	    _transport,
	    _level = 50;
	
	// end:source ../src/vars.js
	// source ../src/utils/obj.js
	
	function obj_typeof(x) {
	    return Object
	        .prototype
	        .toString
	        .call(x)
	        .replace('[object ', '')
	        .replace(']', '');
	}
	
	function obj_inherit(target /* source, ..*/ ) {
		if (typeof target === 'function') {
			target = target.prototype;
		}
		var i = 1,
			imax = arguments.length,
			source, key;
		for (; i < imax; i++) {
	
			source = typeof arguments[i] === 'function'
				? arguments[i].prototype
				: arguments[i];
	
			for (key in source) {
				target[key] = source[key];
			}
		}
		return target;
	}
	
	function obj_extend(target, source) {
	    if (source == null) 
	        return target;
	    
	    for (var key in source) 
	        target[key] = source[key];
	        
	    return target;
	}
	
	var obj_dimissCircular = (function() {
	    var cache;
	
	    function clone(mix) {
	        if (mix == null) 
	            return mix;
	        
	        var type = obj_typeof(mix),
	            cloned;
	        
	        
	        switch (type) {
	            case 'String':
	            case 'Number':
	            case 'Date':
	            case 'RegExp':
	            case 'Function':
	            case 'Error':
	            case 'Boolean':
	                return mix;
	            case 'Array':
	            case 'Arguments':
	                cloned = [];
	                for (var i = 0, imax = mix.length; i < imax; i++) {
	                    cloned[i] = clone(mix[i]);
	                }
	                return cloned;
	            case 'Object':
	            case 'global':
	                if (cache.indexOf(mix) !== -1) 
	                    return '<circular>';
	                
	                cache.push(mix);
	                cloned = {};
	                
	                for (var key in mix) {
	                    cloned[key] = clone(mix[key]);
	                }
	                return cloned;
	            default:
	                console.warn('obj_dimissCircular: Unknown type', type);
	                return mix;
	        }
	    }
	
	    return function(mix) {
	        if (typeof mix === 'object' && mix != null) {
	            cache = [];
	            mix = clone(mix);
	            cache = null;
	        }
	
	        return mix;
	    };
	}());
	
	
	
	var obj_stringify = (function(){
	    
	    function doIndent(count) {
	        var str = '',
	            i = 0;
	        for (; i < count; i++){
	            str += '  ';
	        }
	        return str;
	    }
	    
	    
	    return function stringify(obj, visitor, indent){
	        if (indent == null) 
	            indent = 0;
	            
	        var tuple = ['', 0];
	        
	        if (typeof obj === 'undefined'){
	            tuple[1] = '<undefined>';
	            
	            visitor(tuple, 'undefined');
	            return tuple[1];
	        }
	        
	        if (obj == null) {
	            tuple[1] = '<null>';
	            
	            visitor(tuple, 'null');
	            return tuple[1];
	        }
	        
	        var type = obj_typeof(obj);
	        
	        switch (type) {
	            case 'Array':
	            case 'Arguments':
	                var str = '[',
	                    array = obj;
	                    
	                for (var i = 0, x, imax = array.length; i < imax; i++){
	                    x = array[i];
	                    
	                    if (str === '[')
	                        str += '\n';
	                    
	                    str += doIndent(indent + 1)
	                        + stringify(x, visitor, indent + 1)
	                        + (i < imax - 1 ? ',' : '')
	                        + '\n'
	                        ;
	                }
	                
	                str += doIndent(indent) + ']';
	                
	                return str;
	                
	            case 'RegExp':
	                tuple[1] = obj.toString();
	                
	                visitor(tuple, 'regexp');
	                return tuple[1];
	            case 'Date':
	                tuple[1] = obj.toISOString();
	                
	                visitor(tuple, 'date');
	                return tuple[1];
	            
	            case 'String':
	            case 'Number':
	            case 'Boolean':
	                tuple[1] = obj;
	                
	                visitor(tuple, type.toLowerCase());
	                return tuple[1];
	            case 'Function':
	                tuple[1] = '<function>';
	                
	                visitor(tuple, type.toLowerCase());
	                return tuple[1];
	            case 'Error':
	                return obj.toString().red;
	            
	            case 'Object':
	            case 'global':
	                var str = '{',
	                    keys = Object.keys(obj),
	                    key;
	                    
	                i = 0;
	                imax = keys.length;
	                    
	                for (; i < imax; i++){
	                    key = keys[i];
	                    
	                    
	                    if (str === '{') 
	                        str += '\n'
	                    
	                    tuple[0] = key;
	                    tuple[1] = obj[key];
	                    
	                    visitor(tuple);
	                    
	                    
	                    str += doIndent(indent + 1)
	                        + tuple[0]
	                        + ': '
	                        + stringify(obj[key], visitor, indent + 1)
	                        + (i < imax - 1 ? ',' : '')
	                        + '\n'
	                        ;
	                }
	                
	                str += doIndent(indent) + '}';
	                
	                return str;
	        }
	        
	        
	        
	    };
	    
	}());
	
	
	// end:source ../src/utils/obj.js
	// source ../src/utils/function.js
	function fn_doNothing() {
	    return this;
	}
	// end:source ../src/utils/function.js
	// source ../src/utils/stack.js
	var stack_formatCaller;
	
	(function() {
	
	
		var stackEntry = {
			path: null,
			file: null,
			line: null
		};
	
		var currentFile;
	
		function parseStackEntry(line) {
	
			if (line[line.length - 1] === ')')
				line = line.substr(
					line.indexOf('(') + 1,
					line.lastIndexOf(')') - 1);
	
			var match = /^(.+):(\d+):(\d)/.exec(line);
			if (match == null)
				return null;
	
			var path = stackEntry.path = match[1];
			stackEntry.file = path.substring(path.search(/[\/\\][^\/\\]+$/) + 1);
			stackEntry.line = match[2];
	
			if (currentFile == null)
				currentFile = stackEntry.file;
	
			return stackEntry;
		}
	
		stack_formatCaller = function(format, entryIndex) {
	
			var stack = new Error()
				.stack
				.split('\n')
				.splice(1);
	
			var imax = stack.length,
				i = -1,
				entry;
	
	
			while (++i < imax) {
				entry = parseStackEntry(stack[i]);
				if (entry == null || currentFile == null)
					continue;
	
				if (entry.file !== currentFile)
					break;
			}
	
			if (entry == null || i === imax)
				return '';
	
			return format
				.replace('P', entry.path)
				.replace('F', entry.file)
				.replace('L', entry.line);
		};
	
	}());
	// end:source ../src/utils/stack.js
	// source ../src/utils/date.js
	var date_formatForMessage
	    ;
	
	(function(){
	    
	    date_formatForMessage = function(format){
	        if (typeof format !== 'string') 
	            format = 'dd-MM hh:mm:ss';
	        
	        return _format(new Date, format);
	    };
	}());
	// end:source ../src/utils/date.js
	// source ../src/utils/message.js
	var message_format,
		message_prepair;
	
	(function() {
	
		message_prepair = function(args) {
			var message = message_format(args);
			
			if (_cfg.logCaller !== false) 
	            message += stack_formatCaller(' (F:L)', 5);
	        
	        if (_cfg.logDate !== false) {
	            message = date_formatForMessage(_cfg.logDate)
	                + ' '
	                + message;
	        }
			
			return message;
		};
	
		message_format = function(args) {
			var str = '',
				rgx_format = /%s|%d/,
				item;
	
			var format = args.length > 1
				&& typeof args[0] === 'string'
				&& rgx_format.test(args[0])
				;
	
	
			for (var i = 0, x, imax = args.length; i < imax; i++) {
				x = args[i];
	
				item = typeof x === 'string' ? x : Color.formatJSON(x);
	
				if (i > 0 && format && rgx_format.test(str)) {
					str = str.replace(rgx_format, item);
					continue;
				}
	
				if (str !== '')
					str += '  ';
	
				str += item;
			}
			return str;
		}
	
	}());
	// end:source ../src/utils/message.js
	// source ../src/color/color.js
	var Color = (function() {
	
	    var _colorize;
	    
	    // source data/none.js
	    	
	    var ColorNone = {
	    	END : '',
	        value: {
	    		red: '',
	    		green: '',
	    		yellow: '',
	    		blue: '',
	    		magenta: '',
	    		cyan: '',
	    		
	    
	    		bold: '',
	    		italic: '',
	    		underline: '',
	    		inverse: ''
	    	},
	        start: function(key){
	            return '';
	        }
	    };
	    // end:source data/none.js
	    // source data/html.js
	    	
	    var ColorHtml = {
	    	END : '</span>',
	    	
	    	value: {
	    		red: 'color:red',
	    		green: 'color:green',
	    		yellow: 'color:yellow',
	    		blue: 'color:blue',
	    		magenta: 'color:magenta',
	    		cyan: 'color:cyan',
	    		
	    
	    		bold: 'font-weight:bold',
	    		italic: 'font-style:italic',
	    		underline: 'text-decoration:underline',
	    		inverse: 'color:black;background:white'
	    	},
	        
	        
	        start: function(key){
	            var str = '<span style="'
	                + this.value[key]
	                + '">';
	            
	            return str;
	        }
	    };
	    // end:source data/html.js
	    // source data/ascii.js
	    	
	    var ColorAscii = {
	    	type: 'ascii',
	    	START : '\u001b[',
	    	END : '\u001b[0m',
	    	
	    	value: {
	    		red: '31m',
	    		green: '32m',
	    		yellow: '33m',
	    		blue: '34m',
	    		magenta: '35m',
	    		cyan: '36m',
	    		white: '37m',
	    		black: '30m',
	    
	    		bg_black: '40m',
	    		bg_red: '41m',
	    		bg_green: '42m',
	    		bg_yellow: '43m',
	    		bg_blue: '44m',
	    		bg_magenta: '45m',
	    		bg_cyan: '46m',
	    		bg_white: '47m',
	    		
	    		bold: '1m',
	    		italic: '3m',
	    		underline: '4m',
	    		inverse: '7m'
	    	},
	    	
	    	start: function(key){
	    		return this.START + this.value[key];
	    	}
	    };
	    // end:source data/ascii.js
	    
	    
	    function initialize(ColorData) {
	        
	        
	        function index_End(str, start) {
	            var count = 1,
	                imax = str.length,
	                i = start,
	                c;
	            for (; i < imax; i++){
	                c = str.charCodeAt(i);
	                
	                if (c === 60) {
	                    // <
	                    count++;
	                }
	                
	                if (c === 62) {
	                    // >
	                    count--;
	                }
	                
	                if (count === 0) 
	                    return i;
	            }
	            
	            return -1;
	        }
	        
	
	        function color(str) {
	            
	            ColorData.rgx_search.lastIndex = 0;
	            
	            var match,
	                key,
	                end,
	                doRenew = ColorData.type === 'ascii',
	                stack = doRenew
	                    ? []
	                    : null;
	                
	            
	            
	            
	            while (1) {
	                match = ColorData.rgx_search.exec(str);
	                
	                if (match == null) 
	                    break;
	                
	                key = match[1];
	                
	                if (ColorData.value[key] == null) 
	                    continue;
	                
	                var index = match.index,
	                    bound = index + match[0].length,
	                    head;
	                
	                
	                end = index_End(str, bound);
	                
	                if (end !== -1) {
	                    head = ColorData.start(key);
	                    
	                    str = str.substring(0, index)
	                        + head
	                        + str.substring(bound, end)
	                        + ColorData.END
	                        
	                        + (doRenew ? stack_renew(stack, end) : '')
	                        
	                        + str.substring(end + 1);
	                        
	                    if (doRenew) 
	                        stack.push({end: end, key: key});
	                        
	                    ColorData.rgx_search.lastIndex = index + head.length;
	                }
	            }
	            
	
	
	            return str;
	        }
	        
	        function stack_renew(stack, index) {
	            var str = '';
	            for (var i = 0, x, imax = stack.length; i < imax; i++){
	                x = stack[i];
	                
	                if (x.end < index) 
	                    continue;
	                
	                str += ColorData.start(x.key);
	            }
	            
	            return str;
	        }
	        
	        if (ColorData.rgx_search == null) {
	            var str = '(';
	            for (var key in ColorData.value) {
	                str += str === '('
	                    ? key
	                    : '|' + key;
	            }
	            
	            str += ')<';
	            
	            ColorData.rgx_search = new RegExp(str, 'g');
	        }
	
	        Object
	            .keys(ColorData.value)
	            .forEach(function(key) {
	
	            try {
	                Object.defineProperty(String.prototype, key, {
	                    get: function() {
	                        return ColorData.start(key)
	                            + this
	                            + ColorData.END;
	                    },
	                    enumerable: false,
	                    configurable: true
	                });
	    
	            } catch(e) {
	                // already exists ( with configurable: false )
	            }
	            
	        });
	
	
	        Object.defineProperty(String.prototype, 'color', {
	            get: function() {
	                return color(this);
	            },
	            enumerable: false,
	            configurable: true
	        });
	
	        return color;
	    }
	    
	    
	    _colorize = initialize(ColorAscii);
	    
	    
	    var JSONTheme = {
	        'string': 'yellow',
	        'number': 'cyan',
	        'boolean': 'cyan',
	        
	        'regexp': 'magenta',
	        'date': 'magenta',
	        'function': 'magenta',
	        
	        'null': 'blue',
	        'undefined': 'blue'
	    };
	    
	
	    return {
	        init: {
	            ascii: function() {
	                _colorize = initialize(ColorAscii);
	            },
	            html: function(){
	                _colorize = initialize(ColorHtml);
	            },
	            none: function(){
	                _colorize = initialize(ColorNone);
	            }
	        },
	        
	        colorize: function(str){
	            
	            return _colorize(str);
	        },
	        
	        
	        formatJSON: function(obj){
	            
	            var json = obj;
	            if (json !== void 0 && typeof json === 'object') {
	                json = obj_dimissCircular(obj);
	            }
	            
	            return obj_stringify(json, function(tuple, type){
	                
	                if (type && JSONTheme[type]) {
	                    
	                    tuple[1] = String(tuple[1])[JSONTheme[type]];
	                }
	                
	                if (tuple[0]) {
	                    tuple[0] = tuple[0].bold;
	                }
	                
	                
	            });
	        },
	        
	        define: function(type){
	            
	            if (Color.init[type]) 
	                return Color.init[type]();
	            
	            console.error('Invalid Color Type ', type);
	        }
	    };
	}());
	// end:source ../src/color/color.js
	
	// source ../src/transport/Transport.js
	var Transport = (function(){
	    var _transports = {},
	        _transport;
	        
	    
	    // source Std.js
	    _transports.std = (function(){
	        
	        
	        return {
	            write: function(message){
	                process
	                    .stdout
	                    .write('\n' + message)
	                    ;
	            },
	            
	            cfg: function(){}
	        }
	    }());
	    // end:source Std.js
	    // source fs/transport.js
	    _transports.fs = function(){
	        
	        var Path = require('path'),
	            Fs = require('fs')
	            ;
	        
	        var _directory,
	            _file,
	            _extension
	            ;
	            
	        // source vars.js
	        var path_DIR = 'logs',
	            path_Ext = 'txt',
	            os_EndOfLine = require('os').EOL,
	            
	            FILE_MAXSIZE = 500 * 1024 * 1024,
	            FILE_MAXCOUNT = 10,
	            BUFFER_SIZE = 64,
	            
	            use_SYNC = false,
	            
	            // EOL or <br/>
	            newLine
	            ;
	        
	        // end:source vars.js
	        // source utils/file.js
	        var file_append,
	            file_appendAsync,
	            file_readSize,
	            file_removeAsync,
	            file_remove
	            ;
	        
	        (function(){
	            
	            var Fs = require('fs'),
	                Path = require('path')
	                ;
	            
	            file_readSize = function(path){
	                try {
	                    var x = Fs.statSync(path);
	                    return x && x.size;
	                }
	                catch(error) {
	                    return 0;
	                }
	            };
	            
	            file_removeAsync = function(path, callback){
	                Fs.unlink(path, function(error){
	                    if (error) 
	                        exception_(error);
	                    
	                    callback(error);
	                });
	            };
	            
	            file_remove = function(path){
	                try {
	                    Fs.unlink(path);
	                }catch(error) {}
	            }
	            
	            file_appendAsync = function(path, str, callback){
	                
	                
	                Fs.open(path, 'a', function(error, fd){
	                    if (error != null) {
	                        exception_(error);
	                        callback(error);
	                        return;
	                    }
	                    
	                    
	                    var buffer = new Buffer(str, 'utf8');
	                    Fs.write(fd, buffer, 0, buffer.length, 0, function(error){
	                        if (error) {
	                            exception_(error);
	                            callback(error);
	                            return;
	                        }
	                        
	                        Fs.close(fd, callback);
	                    });
	                });
	            };
	            
	            file_append = function(path, str){
	                console.log('>>append file', path, str.length);
	                try {
	                    var fd = Fs.openSync(path, 'a');
	                
	                    Fs.writeSync(fd, str);
	                    Fs.closeSync(fd);
	                    
	                } catch(error){
	                    console.error('>> error', error);
	                }
	            }
	        }());
	        // end:source utils/file.js
	        // source utils/dir.js
	        var dir_read,
	            dir_ensure
	            ;
	            
	        (function(){
	            
	            dir_read = function(path){
	                
	                try {
	                    return Fs
	                        .readdirSync(path);
	                } catch(error){
	                    exception_(error);
	                    return [];
	                }
	            };
	            
	            
	            dir_ensure = function(path){
	                if (Fs.existsSync(path))
	                    return;
	                
	                dir_ensure(Path.dirname(path));
	                
	                try {
	                    Fs.mkdirSync(path, 777);
	                } catch(error) {
	                    
	                    exception_(error);
	                }
	            };
	            
	        }());
	        // end:source utils/dir.js
	        // source File.js
	        var File = function(name, shouldReadStats){
	            
	            this.buffer = [];
	            this.path = Path.resolve(_directory, name)
	                + '.'
	                + _extension
	                ;
	            
	            this.size = shouldReadStats !== true
	                ? 0
	                : file_readSize(this.path);
	            
	        };
	        
	        File.prototype = {
	            busy: false,
	            errored: false,
	            
	            write: function(message){
	                this.size += message.length;
	                this.buffer.push(message);
	                
	                if (this.buffer.length > BUFFER_SIZE) {
	                    this[use_SYNC ? 'flushSync' : 'flush']();
	                }
	                
	                if (this.size > FILE_MAXSIZE) 
	                    flow_nextFile();
	                
	            },
	            
	            flush: function(){
	                var file = this,
	                    data;
	                
	                if (file.busy)
	                    return;
	                
	                file.busy = true;
	                
	                data = this.getBuffer_();
	                file_appendAsync(file.path, data, function(error){
	                    file.busy = false;
	                });
	            },
	            
	            flushSync: function(){
	                file_append(this.path, this.getBuffer_());
	            },
	            
	            getBuffer_: function(){
	                if (this.buffer.length === 0) 
	                    return '';
	                
	                var data = this
	                    .buffer
	                    .join(newLine)
	                    + newLine
	                    ;
	                this
	                    .buffer
	                    .length = 0
	                    ;
	                return data;
	            }
	        };
	        
	        // end:source File.js
	        // source flow.js
	        var flow_initialize,
	            flow_nextFile
	            ;
	            
	        (function(){
	            
	            flow_initialize = function(){
	                
	                newLine = _cfg.color === 'html'
	                    ? '<br/>'
	                    : os_EndOfLine
	                    ;
	                
	                dir_ensure(_directory);
	                
	                var files = dir_read(_directory).sort(),
	                    filename,
	                    imax = files.length,
	                    i = -1,
	                    
	                    rgx = /^\d+_/g
	                    ;
	                
	                
	                while ( ++i < imax ) {
	                    filename = files[i];
	                    if (rgx.test(filename)) {
	                        break;
	                    }
	                }
	                
	                _file = i < imax
	                    ? new File(filename.replace(/\.\w+$/, ''), true)
	                    : flow_nextFile()
	                    ;
	                    
	                if (files.length > FILE_MAXCOUNT) {
	                    files
	                        .slice(FILE_MAXCOUNT)
	                        .forEach(function(filename){
	                            file_remove(Path.resolve(_directory, filename));
	                        });
	                }
	            };
	            
	            
	            flow_nextFile = function(){
	                if (_file != null)
	                    _file.flush();
	                
	                var d = new Date();
	                _file = new File(d.getTime() + '_' + _format(d, 'dd-MM_hh'));
	                
	                return _file;
	            };
	            
	        }());
	        // end:source flow.js
	        // source exception.js
	        function exception_(error) {
	            Fs.appendFileSync(
	                Path.resolve(_directory, 'logger-exceptions.txt'),
	                message_format([error])
	            );
	        }
	        // end:source exception.js
	     
	        return {
	            write: function(message, level){
	                if (_file == null) 
	                    flow_initialize();
	                    
	                _file.write(message);
	            },
	            
	            flush: function(){
	                _file.flushSync();
	            },
	            
	            /*
	             * { extension, directory, filesCount, fileSize, bufferSize }
	             */
	            cfg: function(cfg){
	                _extension = cfg.extension || path_Ext;    
	                _directory = Path.resolve(
	                    //process.mainModule.filename,
	                    Path.dirname(module.parent.filename),
	                    cfg.directory || path_DIR
	                );
	                
	                if (cfg.bufferSize != null) 
	                    BUFFER_SIZE = cfg.bufferSize;
	                
	                if (cfg.filesCount) 
	                    FILE_MAXCOUNT = cfg.filesCount;
	                
	                if (cfg.fileSize) 
	                    FILE_MAXSIZE = cfg.fileSize;
	                    
	                if (cfg.sync != null) 
	                    use_SYNC = cfg.sync;
	            }
	        }
	    };
	    // end:source fs/transport.js
	    
	    
	    _transport = _transports.std;
	    return {
	        
	        define: function(transportCfg){
	            
	            var type = transportCfg.type;
	            
	            _transport = _transports[type];
	            
	            if (typeof _transport === 'function') {
	                // initialize
	                _transport = _transport();
	            }
	            
	            _transport.cfg(transportCfg);
	            
	            return this;
	        },
	        
	        write: function(message){
	            
	            _transport.write(message);
	        }
	    };
	    
	}());
	// end:source ../src/transport/Transport.js
	// source ../src/logger.js
	
	var Logger = (function(){
	    
	    function cfg_set(key, value) {
	        switch (key) {
	            case 'level':
	                _level = value;
	                break;
	            
	            case 'transport':
	                Transport.define(value);
	                break;
	            
	            case 'color':
	                Color.define(value);
	                /* breakthrough */            
	            case 'logCaller':
	            case 'logDate':
	            default:
	                _cfg[key] = value;
	                break;
	        }
	    }
	    
	    
	    var LoggerProto = {
	          cfg: function(mix){
	            if (typeof mix === 'string'){
	                if (arguments.length === 1) 
	                    return _cfg[mix];
	                
	                cfg_set(mix, arguments[1]);
	            }
	            
	            for (var key in mix) {
	                cfg_set(key, mix[key]);
	            } 
	        },
	        
	        color: Color,
	        formatMessage: function(){
	            return message_format(arguments);
	        },
	        
	        log: function(){
	            //message_write(message_format(arguments));
	            Transport.write(message_prepair(arguments))
	            return this;
	        },
	        error: function(){
	            Transport.write(message_prepair(arguments).red.bold);
	            return this;
	        },
	        warn: function(){
	            Transport.write(message_prepair(arguments).yellow);
	            return this;
	        }
	    };
	    
	    var LoggerEmptyProto = {
	        cfg: LoggerProto.cfg,
	        color: LoggerProto.color,
	        
	        log: fn_doNothing,
	        error: fn_doNothing,
	        warn: fn_doNothing
	    };
	    
	    function Logger(level) {
	        
	        if (level > _level) 
	            return LoggerEmptyProto;
	        
	        return LoggerProto;
	    }
	    
	    obj_extend(Logger, LoggerProto);
	    
	    
	    
	    return Logger;
	}());
	// end:source ../src/logger.js
	// source ../src/configurate.js
	if (typeof process !== 'udefined') {
	    
	    var args = process.argv.slice(2);
	    
	    for (var i = 0, x, imax = args.length; i < imax; i++){
	        x = args[i].replace(/^\-+/,'')
	        
	            
	        switch (x) {
	            case 'no-color':
	                Logger.cfg('color', 'none');
	                break;
	            case 'level':
	                var level = args[++i] << 0;
	                if (level === 0) {
	                    Logger.warn('<logger> invalid cli command --level X');
	                    break;
	                }
	                Logger.cfg('level', level);
	                break;
	        }
	    }
	}
	// end:source ../src/configurate.js
	
	
	exports.logger = Logger;
}));