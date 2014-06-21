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
			i = files.length,
			
			rgx = /^\d+_/g
			;
		
		
		while ( --i > -1 ) {
			filename = files[i];
			if (rgx.test(filename)) {
				break;
			}
		}
		
		_file = i > -1
			? new File(filename.replace(/\.\w+$/, ''), true)
			: flow_nextFile()
			;
		
		if (_file.size >= FILE_MAXSIZE) 
			flow_nextFile();
			
		if (files.length >= FILE_MAXCOUNT) {
			files
				.slice(0, files.length - FILE_MAXCOUNT + 1)
				.forEach(function(filename){
                 
					file_remove(Path.resolve(_directory, filename));
				});
		}
	};
	
	
	flow_nextFile = function(){
		if (_file != null)
			_file.flush();
		
		var d = new Date();
		_file = new File(d.getTime()
				+ '_'
				+ (switch_++)
				+ '_'
				+ _format(d, 'dd-MM_hh'));
		
		return _file;
	};
	
	var switch_ = 0;
}());