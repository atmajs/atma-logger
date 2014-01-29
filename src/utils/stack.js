var stack_formatCaller;

(function() {


	var stackEntry = {
		path: null,
		file: null,
		line: null
	};

	var currentFile;

	function parseStackEntry(line) {

		if (line[line.length - 1] === ')')
			line = line.substr(
				line.indexOf('(') + 1,
				line.lastIndexOf(')') - 1);

		var match = /^(.+):(\d+):(\d)/.exec(line);
		if (match == null)
			return null;

		var path = stackEntry.path = match[1];
		stackEntry.file = path.substring(path.search(/[\/\\][^\/\\]+$/) + 1);
		stackEntry.line = match[2];

		if (currentFile == null)
			currentFile = stackEntry.file;

		return stackEntry;
	}

	stack_formatCaller = function(format, entryIndex) {

		var stack = new Error()
			.stack
			.split('\n')
			.splice(1);

		var imax = stack.length,
			i = -1,
			entry;


		while (++i < imax) {
			entry = parseStackEntry(stack[i]);
			if (entry == null || currentFile == null)
				continue;

			if (entry.file !== currentFile)
				break;
		}

		if (entry == null || i === imax)
			return '';

		return format
			.replace('P', entry.path)
			.replace('F', entry.file)
			.replace('L', entry.line);
	};

}());