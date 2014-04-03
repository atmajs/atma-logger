(new io
	.Directory('test/'))
	.readFiles()
	.files
	.forEach(function(file){
		
		var str = file.read({
			encoding: 'utf8',
			skipHooks: true
		});
		
		str = str.replace(/^ +/gm, function(spaces){
			
			return repeat('\t', spaces.length / 4)
		});
		
		file.write(str, {skipHooks: true, encoding: 'utf8'});
	});
	
	
function repeat(char_, count) {
	var str = '';
	while (--count > -1)
		str += char_;
	return str;
}