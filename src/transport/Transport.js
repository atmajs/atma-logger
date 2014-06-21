var Transport = (function(){
	var _transports = {},
		_transport;
		
	// import ./helper/Buffered.js
	
	// if NodeJS
		// import ./Std.js
		// import ./Stream.js
		// import ./fs/transport.js
		_transport = _transports.std;
	// endif
	
	// if Browser
		// import ./Console.js
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
		
		get: function(type){
			if (type == null) 
				return _transport;
			
			var t = _transport[type];
			if (t == null) throw Error('No transport: ' + type);
			
			return typeof t === 'function'
				? t()
				: t
				;
		}
	};
	
}());