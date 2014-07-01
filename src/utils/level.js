var level_scope_Set,
	level_scope_Get;

(function(){
	
	level_scope_Set = function(scope, level){
		insert(scope, level);
	};
	
	level_scope_Get = function(scope){
		var level = _levels[scope];
		if (level === _default) 
			return null;
		
		if (level == null) 
			level = _levels[scope] = getParent(scope);
		
		
		return level.level;
	};
	
	// private
	var _levels = {},
		_default = {
			level: null
		};
		
	function getParent(scope){
		var i = scope.lastIndexOf('.');
		if (i === -1) 
			return _default;
		
		scope = scope.substring(0, i);
		if (_levels.hasOwnProperty(scope) && _levels[scope].strict !== true) {
			return _levels[scope];
		}
		
		return getParent(scope);
	}
	function insert(scope, level) {
		var any = /\.\*$/.test(scope);
		if (any) 
			scope = scope.slice(0, -2);
		
		_levels[scope] = {
			level: level,
			strict: any === false
		};
		
		if (any) 
			updateChildren(scope, level, any);
	}
	function updateChildren(scope, level) {
		var length = scope.length,
			key;
		for(key in _levels){
			if (key.length <= length + 1) 
				continue;
			
			if (key.indexOf(scope + '.') !== 0 ) 
				continue;
			
			_levels[key] = {
				level: level
			};
		}
	}
}());