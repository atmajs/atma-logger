var logger_canWrite,
	logger_fn;

(function(){
	
	logger_canWrite = function(instance, level){
		var logLevel = level,
			globalLevel = _level;
		if (instance == null || instance instanceof Logger === false)
			instance = mockedInstance;
		
		var scope = instance._scope;
		if (scope != null) {
			var scoped = level_scope_Get(scope);
			if (scoped != null)
				return scoped + (level - level_LOG) /* diff */ <= globalLevel;
		}
		
		if (instance._level != null) 
			logLevel = instance._level
		
		if (logLevel <= globalLevel) 
			return true;
		
		
		return false;
	};
	logger_fn = function(expectLevel, decorator){
		return function(){
			if (logger_canWrite(this, expectLevel) === false)
				return this;
			
			var msg = message_prepair(arguments, this);
			if (decorator && typeof msg === 'string') 
				msg = decorator(msg);
			
            Transport.write(msg);
			return this;
		};
	};
	
	var mockedInstance = {
		_parent: null,
		_level: null,
		_name: null,
		_scope: null
	};
	
	function getLevel(name) {
		
	}
}());