var process_handleExceptions;

(function(){
	
	process_handleExceptions = function(state){
		process
			.removeListener('uncaughtException', onException);
			
		if (state !== false) 
			process.on('uncaughtException', onException);
			
	};
	
	
	// private
	function onException(error) {
		var Transport = Logger
			.error(error)
			.getTransport()
			;
		
		if (Transport && Transport.flush) 
			Transport.flush();
		
		process.exit(1);
	}
}());