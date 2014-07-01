var HttpHandler;
(function(){
	
	HttpHandler = {
		newLine: '\n',
		busy: false,
		listeners: [],
		buffer: [],
		write: function(message){
			message = message.replace(/\n/g, '\\n');
			this.buffer.push(message);
			
			if (this.buffer.length > BUFFER_SIZE) 
				this.flushAsync();
		},
		
		flushAsync: function(cb){
			Buffered.flushAsync(this, BUFFER_SIZE, Http_writeAsync, cb);
		},
	};
	
	
	
	function Http_writeAsync(handler, data, cb){
		http_send(data, cb);
	}
}());