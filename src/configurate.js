if (typeof process !== 'udefined') {
	
	var args = process.argv.slice(2);
	
	for (var i = 0, x, imax = args.length; i < imax; i++){
		x = args[i].replace(/^\-+/,'')
		
			
		switch (x) {
			case 'no-color':
				Logger.cfg('color', 'none');
				break;
			case 'level':
				var level = args[++i] << 0;
				if (level === 0) {
					Logger.warn('<logger> invalid cli command --level X');
					break;
				}
				Logger.cfg('level', level);
				break;
		}
	}
}