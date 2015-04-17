_transports.stream = (function(){
	
	var _stream;
	
	return {
		write: function(message){
			_stream.write(message);
		},
		put: function(message){
			_stream.write(message);
		},
		
		cfg: function(config){
			var stream = config.stream;
			if (stream == null) 
				throw Error('Transport Configuration: No `stream` property');
			
			if (stream.write == null) 
				throw Error('Transport Configuration: Invalid stream object');
			
			_stream = stream;
		}
	};
}());