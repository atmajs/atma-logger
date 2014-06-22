_transports.http = function(){
	
	var BUFFER_SIZE = 0,
		_url,
		_method,
		_headers,
		_type;
	
	// import ./http_send.js
	// import ./HttpHandler.js
	
	return {
		write: function(message){
			HttpHandler.write(message);
		},
		flushAsync: function(cb){
			HttpHandler.flushAsync(cb);
		},
		
		/* { bufferSize, url, method, headers } */
		cfg: function(cfg){
			if (cfg.bufferSize != null) 
				BUFFER_SIZE = cfg.bufferSize;
			
			_url = cfg.url || _url;
			_method = cfg.method || _method;
			_headers = cfg.headers || _headers;
			
			// if Browser
			_type = /(\.gif|\.jpg|\.png|\.jpeg)/.test(_url)
				? 'img'
				: 'xhr';
			// endif
		}
	};
}