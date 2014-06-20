var Color;
(function() {
	Color = {
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

	var _colorize;
	
	// import data/none.js
	// import data/html.js
	// import data/ascii.js
	
	
	function initialize(ColorData) {
		Object
			.keys(ColorData.value)
			.forEach(function(key) {
				try {
					Object.defineProperty(String.prototype, key, {
						get: function() {
							var txt = this,
								decorator = ColorData.decorator;
							if (decorator != null) {
								if (txt.__wrapped !== true) 
									txt = decorator(txt);
							}
							var out = ColorData.start(key)
								+ txt
								+ ColorData.END;
							
							if (decorator == null) 
								return out;
							
							out = new String(out);
							out.__wrapped = true;
							return out;
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
				return painter(this, ColorData);
			},
			enumerable: false,
			configurable: true
		});

		return function(str){
			return painter(str, ColorData);
		};
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
	
	var painter;
	(function(){
		painter = function(str, ColorData) {
			prepairColor(ColorData)
			ColorData.rgx_search.lastIndex = 0;
			
			var match,
				key,
				end,
				doRenew = ColorData.type === 'ascii',
				stack = doRenew && [] || null,
				txt
				;
			
			var out = '', last = 0;
			while (1) {
				match = ColorData.rgx_search.exec(str);
				if (match == null) 
					break;
				
				key = match[1];
				if (ColorData.value[key] == null) 
					continue;
				
				var index = match.index,
					bound = index + match[0].length,
					head, txt;
					
				if (last !== index) 
					out += createRange(str, last, index, ColorData);
				
				
				end = index_End(str, bound);
				last = end + 1;
				
				if (end === -1) {
					out += createRange(str, index, end, ColorData);
					continue;
				}
				
				head = ColorData.start(key);
				txt = str.substring(bound, end);
				txt = painter(txt, ColorData);
				
				out += head
					+ txt
					+ ColorData.END
					+ (doRenew ? stack_renew(stack, end, ColorData) : '')
					;
					
				if (doRenew) 
					stack.push({end: end, key: key});
					
				ColorData.rgx_search.lastIndex = end + 1//index + head.length;
			}
			
			if (last < str.length) {
				out += createRange(str, last, str.length, ColorData);
			}
			
			return out;
		};
		
		function createRange(str, start, end, ColorData) {
			var txt = str.substring(start, end);
			if (ColorData.decorator) 
				return ColorData.decorator(txt);
			
			return txt;
		}
		function index_End(str, start) {
			var count = 1,
				imax = str.length,
				i = start,
				c;
			for (; i < imax; i++){
				c = str.charCodeAt(i);
				
				if (c === 60 /* < */) 
					count++;
				if (c === 62 /* > */) 
					count--;
				if (count === 0) 
					return i;
			}
			return -1;
		}
		function stack_renew(stack, index, ColorData) {
			var str = '',
				imax = stack.length,
				i = -1;
			while ( ++i < imax ){
				x = stack[i];
				
				if (x.end < index) 
					continue;
				str += ColorData.start(x.key);
			}
			return str;
		}
		function prepairColor(ColorData){
			if (ColorData.rgx_search == null) {
				var str = '(';
				for (var key in ColorData.value) {
					str += str === '(' ? key : '|' + key;
				}
				
				str += ')<';
				ColorData.rgx_search = new RegExp(str, 'g');
			}
			return ColorData;
		}
	}())
}());