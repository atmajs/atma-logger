_transports.console = (function(){
	
	function write(args){
		console.log.apply(console, args);
	}
	
	return {
		write: function(mix){
			if (typeof mix === 'string') 
				return write([ mix ]);
			
			write(mix);
		},
		cfg: function(config){}
	}
}());