var cfg_set;

(function(){
	
	cfg_set = function(key, value) {
		switch (key) {
			case 'level':
				_level = value;
				break;
			case 'levels':
				obj_extend(_levels, value);
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
	
}());