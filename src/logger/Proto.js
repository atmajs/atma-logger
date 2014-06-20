var LoggerProto,
	LoggerEmptyProto;
(function(){
		
	LoggerProto = {
		_parent: null,
		_level: null,
		_name: null,
		
		cfg: function(mix){
			if (arguments.length === 0) 
				return _cfg;
			
			if (typeof mix === 'string'){
				if (arguments.length === 1) 
					return _cfg[mix];
				
				cfg_set(mix, arguments[1]);
				return this;
			}
			for (var key in mix) {
				cfg_set(key, mix[key]);
			}
			return this;
		},
		
		color: Color,
		formatMessage: function(){
			return message_format(arguments);
		},
		
		log: logger_fn(level_LOG),
		warn: logger_fn(level_WARN, function(msg){return msg.yellow.bold;}),
		debug: logger_fn(level_DEBUG),
		trace: logger_fn(level_TRACE),
		error: logger_fn(level_ERROR, function(msg){return msg.red.bold;}),
		
		getTransport: function() {
			return Transport.get();
		},
		
		create: function(name, level){
			return new Logger_Scope(
				this instanceof Logger && this || null
				, name
				, level
			);
		},
		
		level_LOG: level_LOG,
		level_WARN: level_WARN,
		level_TRACE: level_TRACE,
		level_DEBUG: level_DEBUG,
		level_ERROR: level_ERROR,
		level_EXCEPTION : level_EXCEPTION
	};
	
	LoggerEmptyProto = obj_extend({}, LoggerProto);
	
	LoggerEmptyProto.log =
	LoggerEmptyProto.warn =
	LoggerEmptyProto.debug =
	LoggerEmptyProto.trace =
	LoggerEmptyProto.error = fn_doNothing;
	
}());