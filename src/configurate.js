(function(){
	if (typeof process === 'undefined')
		return;
	
	var args = process.argv.slice(2),
		imax = args.length,
		i = -1,
		x;
	
	while ( ++i < imax ) {
		x = args[i].replace(/^\-+/,'');
			
		switch (x) {
			case 'no-color':
				Logger.cfg('color', 'none');
				break;
			case 'level':
				var level = getLevel('level');
				if (level == null) 
					break;
				
				Logger.cfg('level', level);
				break;
			default:
				if (x.indexOf('level.') === 0) {
					
					var level = getLevel('level.SCOPE_NAME');
					if (level == null) 
						break;
					
					x = x.replace('level.', '');
					var obj = {};
					obj[x] = level;
					
					Logger.cfg('levels', obj);
				}
				break;
		}
	}

	function getLevel(key){
		var level = parseInt(args[++i]);
		if (isNaN(level)) {
			Logger.error('<atma-logger> invalid cli command --' + key + ' NUMBER');
			return null;
		}
		return level;
	}
}());

	