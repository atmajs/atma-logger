
var Logger = (function(){
	
	
	var LoggerProto = {
        _name: null,
        _level: null,
        
		cfg: function(mix){
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
	
	obj_extend(Logger, LoggerProto);
	
	
	
	return Logger;
}());