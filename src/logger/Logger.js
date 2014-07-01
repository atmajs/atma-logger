var Logger;
(function(){
	
	// import utils.js
	// import Proto.js
	// import Logger_Empty.js
	// import Logger_Scope.js
	
	Logger =  function(mix1, mix2) {
		if (typeof mix1 === 'string') {
			return new Logger_Scope(
				this instanceof Logger && this || null
				, mix1
				, mix2
			);
		}
		
		if (typeof mix1 === 'number') {
			return logger_canWrite(null, mix1)
				? LoggerProto
				: LoggerEmptyProto;
		}
		if (typeof mix1 === 'boolean') {
			return mix1 === true
				? LoggerProto
				: LoggerEmptyProto;
		}
		
		return LoggerEmptyProto;
	};
	Logger.prototype = LoggerProto;
	
    obj_extend(Logger, LoggerProto);
}());