var path_DIR = 'logs',
	path_Ext = 'txt',
	os_EndOfLine = require('os').EOL,
	
	// Bytes
	FILE_MAXSIZE = 500 * 1024,
	FILE_MAXCOUNT = 10,
	
	// Message Count
	BUFFER_SIZE = 0,
	
	use_SYNC = false,
	
	// EOL or <br/>
	newLine
	;
