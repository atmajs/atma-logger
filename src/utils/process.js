var process_handleExceptions;

(function(){
	
	process_handleExceptions = function(state){
		// if NodeJS
			process
				.removeListener('uncaughtException', onException);
				
			if (state !== false) 
				process.on('uncaughtException', onException);
		// endif
		
		// if Browser
			window.onerror = onException;
		// endif
	};
	
	
	// private
	function onException(error) {
		var Transport = Logger
			.error(error)
			.getTransport()
			;
		
		if (Transport != null) {
			
			if (Transport.flush) {
				Transport.flush(exit);
				return;
			}
			if (Transport.flushAsync) {
				Transport.flushAsync(exit);
				return;
			}
		}
		exit();
	}
	function exit() {
		// if NodeJS
			process.exit(1);
		// endif
	}
}());