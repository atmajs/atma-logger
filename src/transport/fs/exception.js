function exception_(error) {
	
    try {
		Fs.appendFileSync(
			Path.resolve(_directory, 'logger-exceptions.txt'),
			message_format([error]) + os_EndOfLine
		);
	} catch(error_) {
		if (error_.code === 'ENOENT') {
			dir_ensure(_directory);
			exception_(error);
		}
	}
}