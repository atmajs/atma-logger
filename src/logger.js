
var Logger = (function(){
	
	function cfg_set(key, value) {
		switch (key) {
			case 'level':
				_level = value;
				break;
			
			case 'transport':
				Transport.define(value);
				break;
			
			case 'color':
				Color.define(value);
				/* breakthrough */            
			case 'logCaller':
			case 'logDate':
			default:
				_cfg[key] = value;
				break;
		}
	}
	
	
	var LoggerProto = {
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
			Transport.write(message_prepair(arguments))
			return this;
		},
		error: function(){
			Transport.write(message_prepair(arguments).red.bold);
			return this;
		},
		warn: function(){
			Transport.write(message_prepair(arguments).yellow);
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
	
	function Logger(level) {
		
		if (level > _level) 
			return LoggerEmptyProto;
		
		return LoggerProto;
	}
	
	obj_extend(Logger, LoggerProto);
	
	
	
	return Logger;
}());