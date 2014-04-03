var path_DIR = 'logs',
	path_Ext = 'txt',
	os_EndOfLine = require('os').EOL,
	
	FILE_MAXSIZE = 500 * 1024 * 1024,
	FILE_MAXCOUNT = 10,
	BUFFER_SIZE = 64,
	
	use_SYNC = false,
	
	// EOL or <br/>
	newLine
	;
