_transports.fs = function(){
	
	var Path = require('path'),
		Fs = require('fs')
		;
	
	// import vars.js
	// import utils/file.js
	// import utils/dir.js
    // import utils/std.js
	// import File.js
	// import flow.js
	// import exception.js
	
	
	var _directory = path_DIR,
		_extension = path_Ext,
		_file
		;
	
	var FsTransport = {
		write: function(message, level){
			if (_file == null) 
				flow_initialize();
				
			_file.write(message);
		},
		
		flush: function(cb){
			_file.flush(cb);
		},
		flushAsync: function(){
			_file.flushAsync(cb);
		},
		
		/*
			* { extension, directory, filesCount, fileSize, bufferSize }
			*/
		cfg: function(cfg){
			_extension = cfg.extension || path_Ext;
            
			_directory = Path.resolve(
				//process.mainModule.filename,
				Path.dirname(module.parent.filename),
				cfg.directory || path_DIR
			);
			
			if (cfg.bufferSize != null) 
				BUFFER_SIZE = cfg.bufferSize;
			
			if (cfg.filesCount) 
				FILE_MAXCOUNT = cfg.filesCount;
			
			if (cfg.fileSize) 
				FILE_MAXSIZE = cfg.fileSize;
				
			if (cfg.sync != null) 
				use_SYNC = cfg.sync;
				
			if (cfg.interceptStd) 
				std_intercept();
		},
        
        interceptStd: function(state){
            std_intercept(state);
        },
		
		exception: exception_
	};
	
	return FsTransport;
};