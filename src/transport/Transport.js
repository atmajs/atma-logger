var Transport = (function(){
	var _transports = {},
		_transport;
		
	
	// if NodeJS
		// import Std.js
		// import Stream.js
		// import fs/transport.js
		_transport = _transports.std;
	// endif
	
	// if Browser
		// import Console.js
		_transport = _transports.console;
	// endif
	
	return {
		
		define: function(transportCfg){
			
			var type = transportCfg.type;
			
			_transport = _transports[type];
			
			if (typeof _transport === 'function') {
				// initialize
				_transport = _transport();
			}
			
			_transport.cfg(transportCfg);
			
			return this;
		},
		
		write: function(message){
			
			_transport.write(message);
		},
		
		get: function(){
			return _transport;
		}
	};
	
}());