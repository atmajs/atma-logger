
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

