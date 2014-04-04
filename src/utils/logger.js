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