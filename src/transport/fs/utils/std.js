var std_intercept;

(function() {




	var intercept = function(stream, type) {

		var currentLog;
		var currentSize;
		var currentLogCreated;

		var rolloverLog = function() {
			var now = new Date().getTime();
			var filename = process.env.COMPUTERNAME + '-' + process.pid + '-' + type + '-' + now + '.txt';
			currentLog = path.resolve(logDir, filename);
			currentSize = 0;
			currentLogCreated = false;
			purgeOldLogs();
		};

		rolloverLog(); // create a new log file

		var ensureBuffer = function(data, encoding) {
			if (Buffer.isBuffer(data)) {
				return data;
			} else {
				data = data.toString().replace(/\n/g, '\r\n');
				return new Buffer(data, typeof encoding === 'string' ? encoding : 'utf8');
			}
		};

		stream.write = stream.end = function(data, encoding) {
			var buffer = ensureBuffer(data, encoding);
			if (currentSize > maxLogSize) {
				rolloverLog();
			}

			if (!currentLogCreated) {
				fs.writeFileSync(currentLog, '', 'utf8');
				updateIndexHtml();
				currentLogCreated = true;
			}

			var f = fs.openSync(currentLog, 'a');
			currentSize += fs.writeSync(f, buffer, 0, buffer.length, currentSize);
			fs.closeSync(f);
		};
	};
}());