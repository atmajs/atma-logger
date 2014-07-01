var http_send;
(function(){
	
	http_send = function(data, cb){
		// if NodeJS
		send_node(_url, _method || 'POST', _headers, data, cb);
		// endif
		
		// if Browser
		_type === 'img'
			? send_browserImg(_url, data, cb)
			: send_browserXhr(_url, method || 'POST', headers, data, cb)
			;
		// endif
	};
	
	// if Browser
	function send_browserXhr(url, method, headers, data, cb){
		method = method.toUpperCase();
		var req = new XMLHttpRequest();
		if (headers) {
			for(var key in headers){
				req.setRequestHeader(key, headers[key]);
			}
			
		}
		req.onreadystatechange = function(){
			if (req.readyState !== 4) 
				return;
			
			cb(req.responseText, req.status);
		}
		if (method === 'GET') {
			data = encode(data);
			if (data == null) {
				cb && cb('Encode failed');
				return;
			}
			url += data;
			data = void 0;
		}
		
		req.open(method, url, true);
		req.send(data);
	}
	function send_browserImg(url, data, cb){
		var str = encode(data);
		if (str == null) 
			return;
		
		var img = new Image();
		img.onload = complete;
		img.onerror = complete;
		img.src = url + str;
		function complete(){
			cb && cb();
			cb = null;
		}
	}
	// endif
	
	// if NodeJS
	var Https = require('https'),
		Http = require('http'),
		Url = require('url');
	function send_node(url, method, headers, data, cb){
		method = method.toUpperCase();
		headers = headers || {};
		
		if (!headers['Content-Type']) 
			headers['Content-Type'] = 'text/plain';
			
		headers['Content-Length'] = Buffer.byteLength(data);
		
		if (method === 'GET') {
			data = encode(data);
			if (data == null) {
				if (cb) cb('Encode failed');
				return;
			}
			
			url += data;
			data = void 0;
		}
		
		var options = Url.parse(url);
		options.headers = headers;
		options.method = method;
		
		var T = options.protocol === 'https:'
			? Https
			: Http;
		
		var msg = '';
		var req = T.request(options, function(res){
			res.setEncoding('utf-8');
			res
				.on('data', function(chunk){
					msg += String(chunk);
				})
				.on('end', function(){
					if (cb) cb(msg, res);
				});
		});
		if (data != null) {
			req.write(data);
		}
		
		req.end();
	}
	// endif
	
	function encode(str) {
		try {
			return encodeURIComponent(str);
		} catch(error){
			Logger.error('Logger encode error', error);
			return null;
		}
	}
}());