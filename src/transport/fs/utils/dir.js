var dir_read,
	dir_ensure;

(function() {

	dir_read = function(path) {

		try {
			return Fs
				.readdirSync(path);
		} catch (error) {
			exception_(error);
			return [];
		}
	};


	dir_ensure = function(path) {
		if (Fs.existsSync(path))
			return;

		dir_ensure(Path.dirname(path));

		try {
			Fs.mkdirSync(path);
		} catch (error) {

			exception_(error);
		}
	};

}());