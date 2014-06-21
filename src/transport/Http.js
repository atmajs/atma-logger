_transports.http = function(){
	
	var BUFFER_SIZE = 0,
		endpoint_;
	
	return {
		write: function(message){
			_stream.write(message);
		},
		
		cfg: function(config){
			if (cfg.bufferSize != null) 
				BUFFER_SIZE = cfg.bufferSize;
			
			if (cfg.endpoint != null) 
				endpoint_ = cfg.endpoint;
		}
	};
}