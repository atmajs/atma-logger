var Buffered;

(function(){
	
	Buffered = {
		flushAsync: function(writer, maxSize, write, cb){
			if (writer.busy) {
				if (cb != null) 
					writer.listeners.push(cb);
				
				return;
			}
			
			var data = joinBuffer(writer);
			if (data === '') {
				if (cb)
					cb();
				return;
			}
			
			writer.busy = true;
			
			write(writer, data, function(error){
				writer.busy = false;
				callAll(cb, writer.listeners);
				if (writer.buffer.length > maxSize) 
					writer.flushAsync();
			});
		},
		flush: function(writer, write, cb){
			if (writer.busy) {
				// performing Sync flush on Async writer: ensure transport is free
				writer.listeners.push(function(){
					flushBuffer(writer, write, cb);
				});
				return;
			}
			flushBuffer(writer, write);
			if (cb) 
				cb();
		}
	};
	
	function flushBuffer(writer, write){
		var data = joinBuffer(writer);
		if (data === '')
			return;
		
		write(writer, data);
	}
	function joinBuffer(writer) {
		var buf = writer.buffer;
		if (buf.length === 0) 
			return '';
		
		var newLine = writer.newLine,
			data = buf.join(newLine)+ newLine;
			
		buf.length = 0;
		return data;
	}
	function callAll(fn, fns, error) {
		if (fn) 
			fn(error);
			
		var imax = fns.length,
			i = -1;
		if (imax === 0) 
			return;
		
		while ( ++i < imax )
			fns[i](error);
			
		fns.length = 0;
	}
}());