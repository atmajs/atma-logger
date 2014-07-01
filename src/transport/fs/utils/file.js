var file_append,
	file_appendAsync,
	file_readSize,
	file_removeAsync,
	file_remove;

(function() {

	var Fs = require('fs'),
		Path = require('path');

	file_readSize = function(path) {
		try {
			return Fs.lstatSync(path).size;
		} catch (error) {
			return 0;
		}
	};

	file_removeAsync = function(path, callback) {
		Fs.unlink(path, function(error) {
			if (error)
				exception_(error);
	
			callback(error);
		});
	};

	file_remove = function(path) {
		try {
			
			Fs.unlinkSync(path);
		} catch (error) {
			exception_(error);
		}
	};

	file_appendAsync = function(path, str, callback) {
		if (!str) {
			callback();
			return;
		}
	
		Fs.open(path, 'a', function(error, fd) {
			if (error != null) {
				exception_(error);
				callback(error);
				return;
			}
	
			var buffer = new Buffer(str, 'utf8');
			Fs.write(fd, buffer, 0, buffer.length, 0, function(error) {
				if (error) 
					exception_(error);
				
				Fs.close(fd, callback);
			});
		});
	};

	file_append = function(path, str) {
		if (!str) 
			return;
		
		try {
			var fd = Fs.openSync(path, 'a');

			Fs.writeSync(fd, str);
			Fs.closeSync(fd);
			
		} catch (error) {
			exception_(error);
		}
	};
}());