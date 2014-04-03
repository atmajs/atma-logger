var Color = (function() {

	var _colorize;
	
	// import data/none.js
	// import data/html.js
	// import data/ascii.js
	
	
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