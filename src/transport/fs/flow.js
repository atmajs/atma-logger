var flow_initialize,
	flow_nextFile
	;
	
(function(){
	
	flow_initialize = function(){
		
		newLine = _cfg.color === 'html'
			? '<br/>'
			: os_EndOfLine
			;
		
		dir_ensure(_directory);
		
		var files = dir_read(_directory).sort(),
			filename,
			imax = files.length,
			i = -1,
			
			rgx = /^\d+_/g
			;
		
		
		while ( ++i < imax ) {
			filename = files[i];
			if (rgx.test(filename)) {
				break;
			}
		}
		
		_file = i < imax
			? new File(filename.replace(/\.\w+$/, ''), true)
			: flow_nextFile()
			;
			
		if (files.length > FILE_MAXCOUNT) {
			files
				.slice(FILE_MAXCOUNT)
				.forEach(function(filename){
					file_remove(Path.resolve(_directory, filename));
				});
		}
	};
	
	
	flow_nextFile = function(){
		if (_file != null)
			_file.flush();
		
		var d = new Date();
		_file = new File(d.getTime() + '_' + _format(d, 'dd-MM_hh'));
		
		return _file;
	};
	
}());