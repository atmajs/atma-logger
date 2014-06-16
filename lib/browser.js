(function(root, factory){
	"use strict";

	var __global = typeof window === 'undefined'
		? global
		: window
		;
	
	var Logger = factory(__global);
	

	
	// if Global
	__global.logger = Logger;
	// endif
	
}(this, function(global){
	"use strict";
	
	// source ../src/vars.js
	var _format;
	
	
	
	// if Browser
	(function(){
		var window,
			module = { exports: {} };
			
		//source /node_modules/atma-formatter/lib/format.min.js
		/*!
	 * format v0.8.9
	 *
	 * MIT license
	 * http://opensource.org/licenses/MIT
	 *
	 * (c) 2012, 2014
	 */
	!function(n,e){"use strict";function r(){return e(i,t)}var t,u="undefined"!=typeof window&&null!=window.navigator,i=u?window:global;"undefined"!=typeof Mask&&(t=Mask),"undefined"!=typeof mask&&(t=mask),null==t&&n&&(t=n.mask||n.atma&&n.atma.mask),null==t&&(t=i.mask||i.atma&&i.atma.mask);var a=r();return"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=a),u&&(window.Formatter=a),a}(this,function(n,e){"use strict";function r(n){if(null==n)return"";switch(typeof n){case"string":return s.apply(null,arguments);case"number":return c.apply(null,arguments);case"object":return u(n)?l.apply(null,arguments):n.toString.apply(n,Array.prototype.slice.call(arguments,1));default:return""}}var t,u;!function(){t=function(n){return"number"==typeof n&&!isNaN(n)},u=function(n){return null!=n&&"object"==typeof n&&"function"==typeof n.toUTCString&&"function"==typeof n.constructor.UTC}}();var i,a;!function(){i=function(n,e){if(null==n&&(n={}),null==e)return n;for(var r in e)n[r]=e[r];return n},a=function(n,e){for(var r=n,t=e.split("."),u=-1,i=t.length;null!=r&&++u<i;)r=r[t[u]];return r}}();var o;!function(){o=function(n,e,r,t){for(var u,i=0,a=n.length;a>e;)if(u=n.charCodeAt(++e),92!==u)if(u!==r){if(u===t&&--i<0)break}else i++;else e++;return e===a||i>-1?-1:e}}();var l;!function(){function n(n){return n>9?n:"0"+n}var e,r;l=function(n,l,y){return e=n,r=y||p[g],l=l.replace("Mm",o).replace("MMM",c).replace("MM",a).replace("#M",i).replace("yyyy",t).replace("yy",u).replace("dd",f).replace("#d",s).replace("Dd",d).replace("DDD",h).replace("HH",m).replace("hh",M).replace("#h",v).replace("mm",T).replace("#m",b).replace("ss",O).replace("#s",S)};var t,u,i,a,o,c,s,f,d,h,y,m,v,M,b,T,S,O;t=function(){return e.getFullYear()},u=function(){return e.getFullYear()%100},i=function(){return e.getMonth()+1},a=function(){return n(e.getMonth()+1)},o=function(){return r.MONTH_SHORT[e.getMonth()]},c=function(){return r.MONTH[e.getMonth()]},s=function(){return e.getDate()},f=function(){return n(e.getDate())},d=function(){return r.DAY_SHORT[e.getMonth()]},h=function(){return r.DAY_SHORT[e.getMonth()]},y=function(){return e.getHours()},m=function(){return n(e.getHours())},M=m,v=y,b=function(){return e.getMinutes()},T=function(){return n(e.getMinutes())},S=function(){return e.getSeconds()},O=function(){return n(e.getSeconds())}}();var c;!function(){function n(n,e){return n.replace(/^([\d]{0,2})(([\d]{3})*)$/,function(n,r,t){var u=r?r+e:"";return u+t.replace(/([\d]{3})/g,"$1"+e).slice(0,-1)})}function e(n){return n>=48&&57>=n}function r(n,e){for(var r="";--e>0;)r+=n;return r}c=function(t,u,i){var a,o,l,c,s,f,g,d=null==i||null==i.NUMBER?p.$get("NUMBER"):i.NUMBER,h=!e(u.charCodeAt(0));return h&&(s=u[0],u=u.substring(1),","===s&&(s=d.Delimiter)),a=u.split("."),o=a[0],l=1===a.length?null:a[1],c=null==l?0:0===l.length?null:l.length,g=null==c?t.toString():t.toFixed(c),f=g.indexOf("."),-1===f&&(f=g.length),o.length>=f&&(g=r("0",o.length-f+1)+g),null!=c&&c>g.length-f-1&&(g+=r("0",c-(g.length-f+1))),h?(f=g.indexOf("."),null==l?n(g,s):3>=f?g.replace(".",d.Point):n(g.substring(0,f),s)+d.Point+g.substring(f+1)):g.replace(".",d.Point)}}();var s,f;!function(){function n(n,t,u){for(var i,a="",l=0,c=0,s=-1;-1!==(l=n.indexOf("{",l));)if(l>0&&92===n.charCodeAt(l-1))a+=n.substring(c,l-1)+"{",c=l+1;else{if(a+=n.substring(c,l),c=l+1,l=o(n,l,123,125),-1===l)break;switch(i=new r(n.substring(c,l)),i.accessorType){case"index":s<i.accessor&&(s=i.accessor);break;case"property":-1===s&&(s=0)}a+=i.process(t,u),c=l+1}return c<n.length&&(a+=n.substring(c)),++s<t.length?e(a,t.slice(s)):a}function e(n,e){for(var r,t=n,u=/%s|%d/,i=u.test(n),a=-1,o=e.length;++a<o;)r=e[a],i!==!0||0!==a&&!u.test(t)?(""!==t&&(t+=" "),t+=r):t=t.replace(u,r);return t}s=function(e){return n(e,Array.prototype.slice.call(arguments,1))},f=function(e,r,t){return n(e,r,t)};var r;!function(){function e(n,e){var r=y.exec(e);return null==r?void console.error("Format pattern not matched",e):(n.accessorType=r[f]?"index":"property",n.accessor="index"===n.accessorType?parseInt(r[f]):r[p],n.alignment=r[g]||null,n.pattern=r[d]||null,void(n.pluralizer=r[h]||null))}function i(n,e){if(null==n||isNaN(n))return e;var r=0>n?-1*n:n;if(e.length>r)return e;var t=o(" ",r-e.length);return 0>n?e+t:t+e}function o(n,e){for(var r="";--e>-1;)r+=n;return r}var s={};r=function(n){return s.hasOwnProperty(n)?s[n]:(s[n]=this,void e(this,n))},r.prototype={accessorType:null,accessor:null,alignment:null,pattern:null,pluralizer:null,process:function(e,r){var o,s=this.accessorType,f=this.accessor,p=this.pattern,g=this.alignment,d=this.pluralizer;if("index"===s&&(o=e[f]),"property"===s&&(o=a(e[0],f)),null==o)return i(g,"");if(p)return t(o)?i(g,c(o,p,r)):u(o)?i(g,l(o,p,r)):i(g,o.toString(p,r));if(d){var h=pluralize(o,d,r);return-1===h.indexOf("{")?h:n(h,e,r)}return i(g,o.toString())}};var f=2,p=3,g=5,d=7,h=9,y=/^((\d+)|([\w\d._]+))(,([-\d]+))?(:(.+))?(;(.+))?$/}()}();var p,g;return function(){g="en",p={$register:function(n,e){var r=this[n]||(this[n]={});i(r,e)},$get:function(n,e){var r=null==e?this[g]:this[e]||this[g];return r[n]},$use:function(n){return n=n.toLowerCase(),null==this[n]?void console.error("<FormatterLib> Language is not defined",n):void(g=n)}},function(){var n=["January","February","March","April","May","June","July","August","September","October","November","December"],e=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],r=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],t=["Mon","Tues","Weds","Thurs","Fri","Sat","Sun"];p.$register("en",{MONTH:n,MONTH_SHORT:e,DAY:r,DAY_SHORT:t,NUMBER:{Delimiter:",",Point:"."},Pluralize:"1:0; *:1"})}(),function(){var n=["Januar","Februar","M�rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],e=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];p.$register("de",{MONTH:n,MONTH_SHORT:n.map(function(n){return n.substring(0,3)}),DAY:e,DAY_SHORT:e.map(function(n){return n.substring(0,2)}),NUMBER:{Delimiter:".",Point:","},Pluralize:"1:0; *:1"})}()}(),null!=e&&e.registerUtil("format",{arguments:"parsed",process:r}),r.Lang=p,r});
		//end:source /node_modules/atma-formatter/lib/format.min.js
		
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
			color: 'ascii'
		},
		_level = level_LOG,
		_levels = {}
		;
	
	// end:source ../src/vars.js
	// source ../src/utils/obj.js
	var obj_typeof,
		obj_inherit,
		obj_extend,
		obj_dimissCircular,
		obj_stringify
		;
	
	(function(){
		
		obj_typeof = function(x) {
			return Object
				.prototype
				.toString
				.call(x)
				.replace('[object ', '')
				.replace(']', '');
		};
		
		obj_inherit = function(target /* source, ..*/ ) {
			if (typeof target === 'function') 
				target = target.prototype;
			
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
		};
		
		obj_extend = function(target, source) {
			if (source == null) 
				return target;
			
			for (var key in source) 
				target[key] = source[key];
				
			return target;
		};
		
		obj_dimissCircular = (function() {
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
		
		
		
		obj_stringify = (function(){
			
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
			if (_cfg.formatMessage === false) 
				return args;
			
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
	
				item = typeof x === 'string'
					? x
					: Color.formatJSON(x)
					;
	
				if (i > 0 && format && rgx_format.test(str)) {
					str = str.replace(rgx_format, item);
					continue;
				}
	
				if (str !== '')
					str += ' ';
	
				str += item;
			}
			return str;
		}
	
	}());
	// end:source ../src/utils/message.js
	// source ../src/utils/process.js
	var process_handleExceptions;
	
	(function(){
		
		process_handleExceptions = function(state){
			process
				.removeListener('uncaughtException', onException);
				
			if (state !== false) 
				process.on('uncaughtException', onException);
				
		};
		
		
		// private
		function onException(error) {
			var Transport = Logger
				.error(error)
				.getTransport()
				;
			
			if (Transport && Transport.flush) 
				Transport.flush();
			
			process.exit(1);
		}
	}());
	// end:source ../src/utils/process.js
	// source ../src/utils/cfg.js
	var cfg_set;
	
	(function(){
		
		cfg_set = function(key, value) {
			switch (key) {
				case 'level':
					_level = value;
					break;
				case 'levels':
					obj_extend(_levels, value);
					break;
				case 'transport':
					Transport.define(value);
					break;
				
				case 'handleExceptions':
					process_handleExceptions(value);
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
		
	}());
	// end:source ../src/utils/cfg.js
	// source ../src/utils/logger.js
	var logger_canWrite;
	
	(function(){
		
		logger_canWrite = function(instance, level){
			var logLevel = level,
				current = _level;
			if (instance == null || instance instanceof Logger === false)
				instance = mockedInstance;
				
			if (instance._level != null) 
				logLevel = instance._level
			
			
			if (logLevel <= current) 
				return true;
			
			if (instance.name != null) {
				current = _levels[instance._name];
				
				if (current != null && logLevel <= current) 
					return true;
			}
			
			return false;
		};
		
		
		var mockedInstance = {
			_level: null,
			_name: null
		};
		
	}());
	// end:source ../src/utils/logger.js
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
		var ColorHtml;
		(function(){
			
			ColorHtml = {
				END : '</span>',
				
				value: {
					red: 'color:red',
					green: 'color:green',
					yellow: 'color:yellow',
					blue: 'color:blue',
					magenta: 'color:magenta',
					cyan: 'color:cyan',
					
					bg_black: 'background-color:black',
					bg_red: 'background-color:red',
					bg_green: 'background-color:green',
					bg_yellow: 'background-color:yellow',
					bg_blue: 'background-color:blue',
					bg_magenta: 'background-color:magenta',
					bg_cyan: 'background-color:cyan',
					bg_white: 'background-color:white',
			
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
			
			var str_htmlEncode = (function() {
				var map = {
					'&': '&amp;',
					'<': '&lt;',
					'>': '&gt;',
					'"': '&quot;',
					"'": '&#x27;',
					'/': '&#x2F;'
				};
				function replaceEntity(chr) {
					return map[chr];
				}
				function str_htmlEncode(html) {
					return html.replace(/[&"'\<\>\/]/g, replaceEntity);
				}
				
				return str_htmlEncode;
			}());
		}());
		
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
			
		
	
		
		// if Browser
			// source Console.js
			_transports.console = (function(){
				
				function write(args){
					console.log.apply(console, args);
				}
				
				return {
					write: function(mix){
						if (typeof mix === 'string') 
							return write([ mix ]);
						
						write(mix);
					},
					cfg: function(config){}
				}
			}());
			// end:source Console.js
			_transport = _transports.console;
		// endif
		
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
			},
			
			get: function(){
				return _transport;
			}
		};
		
	}());
	// end:source ../src/transport/Transport.js
	// source ../src/logger.js
	
	var Logger = (function(){
		
		
		var LoggerProto = {
	        _name: null,
	        _level: null,
	        
			cfg: function(mix){
				if (arguments.length === 0) 
					return _cfg;
				
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
	            if (logger_canWrite(this, level_LOG)) 
	                Transport.write(message_prepair(arguments))
				return this;
			},
			error: function(){
	            if (logger_canWrite(this, level_ERROR)) 
	                Transport.write(message_prepair(arguments).red.bold);
				return this;
			},
			warn: function(){
	            if (logger_canWrite(this, level_WARN)) 
	                Transport.write(message_prepair(arguments).yellow.bold);
				return this;
			},
	        debug: function(){
	            if (logger_canWrite(this, level_DEBUG)) 
	                Transport.write(message_prepair(arguments));
				return this;
	        },
	        trace: function(){
	            if (logger_canWrite(this, level_TRACE)) 
	                Transport.write(message_prepair(arguments));
				return this;
	        },
			
			getTransport: function() {
				return Transport.get();
			}
		};
		
		var LoggerEmptyProto = {
			cfg: LoggerProto.cfg,
			color: LoggerProto.color,
			
			log: fn_doNothing,
			error: fn_doNothing,
			warn: fn_doNothing
		};
		
		function Logger(arg0, arg1) {
			
	        if (this == null || this === global) 
	            return new Logger(arg0, arg1)
	        
	        var level, name;
	        var type = typeof arg0;
	        
	        if ('number' === type) {
	            level = arg0;
	            name = arg1;
	        }
	        if ('string' === type) {
	            name = arg0;
	            level = arg1;
	        }
	        
	        if (typeof level === 'number') 
	            this._level = level;
	        if (typeof name === 'string') 
	            this._name = name;
	        
	        
	        var self = this;
	        function log(){
	            return self.log.apply(self, arguments);
	        }
	        
	        log.__proto__ = self;
	        
	        return log;
		}
		Logger.prototype = LoggerProto;
	    
		obj_extend(Logger, LoggerProto);
		
		
		
		return Logger;
	}());
	// end:source ../src/logger.js
	// source ../src/configurate.js
	if (typeof process !== 'undefined') {
		
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
	
	
	return Logger;
}));