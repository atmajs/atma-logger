var std_intercept;

(function() {

	var orig = {};
	
	saveOriginals(process.stdout, 'stdout')
	saveOriginals(process.stderr, 'stderr')
	
	std_intercept = function(state){
		var fn = state !== false
			? intercept
			: deintercept
			;
		
		fn(process.stdout, 'stdout');
		fn(process.stderr, 'stderr');
	};


	function saveOriginals(stream, type) {
		orig[type] = {
			write: stream.write,
			end: stream.end
		};
	}
	
	function deintercept(stream, type) {
		stream.write = orig[type].write;
		stream.end = orig[type].end;
	}
	
	function intercept(stream, type) {

		stream.write = stream.end = function(data, encoding) {
			if (data == null) 
				return;
			
			if (typeof data !== 'string') 
				data = data.toString();
			
			if (type === 'stderr') 
				data = data.red;
			
			FsTransport.write(data);
		};
	};
	
}());