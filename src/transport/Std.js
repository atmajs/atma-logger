_transports.std = (function(){
	
	
	return {
		write: function(message){
			this.put('\n' + message);
		},
		put: function(data) {
			process.stdout.write(data);
		},
		cfg: function(){},
        std: true
	};
}());