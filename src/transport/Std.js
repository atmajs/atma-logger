_transports.std = (function(){
	
	
	return {
		write: function(message){
			process
				.stdout
				.write('\n' + message)
				;
		},
		
		cfg: function(){},
        std: true
	};
}());