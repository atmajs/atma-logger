var logger_canWrite;

(function(){
	
	logger_canWrite = function(instance, level){
		logger.log('canWrite', instance, level, _level);
		var logLevel = level,
			globalLevel = _level;
		if (instance == null || instance instanceof Logger === false)
			instance = mockedInstance;
		
		if (instance._level != null) 
			logLevel = instance._level
		
		if (logLevel <= globalLevel) 
			return true;
		
		if (instance._name != null) {
			globalLevel = _levels[instance._name];
			
			if (globalLevel != null && logLevel <= globalLevel) 
				return true;
		}
		
		return false;
	};
	
	
	var mockedInstance = {
		_level: null,
		_name: null
	};
	
}());