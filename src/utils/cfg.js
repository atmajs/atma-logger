var cfg_set;

(function(){
	
	cfg_set = function(key, value) {
		switch (key) {
			case 'level':
				_level = value;
				break;
			case 'levels':
				for (var scope in value){
					level_scope_Set(scope, value[scope]);
				}
				break;
			case 'transport':
				Transport.define(value);
				break;
			
			case 'handleExceptions':
				process_handleExceptions(value);
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
	
}());