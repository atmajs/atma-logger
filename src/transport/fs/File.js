var File = function(name, shouldReadStats){
	
	this.buffer = [];
	this.path = Path.resolve(_directory, name)
		+ '.'
		+ _extension
		;
	
	this.size = shouldReadStats !== true
		? 0
		: file_readSize(this.path)
		;
};

File.prototype = {
	busy: false,
	errored: false,
	
	write: function(message){
		this.size += message.length + newLine.length;
		this.buffer.push(message);
		
		if (this.buffer.length > BUFFER_SIZE) {
			this[use_SYNC ? 'flushSync' : 'flush']();
		}
		
		if (this.size >= FILE_MAXSIZE) {
			flow_nextFile();
		}
	},
	
	flush: function(){
		var file = this,
			data;
		
		if (file.busy)
			return;
		
		file.busy = true;
		
		data = this.getBuffer_();
		if (data === '') 
			return;
		
		file_appendAsync(file.path, data, function(error){
			file.busy = false;
			if (file.buffer.length > BUFFER_SIZE) 
				file.flush();
		});
	},
	
	flushSync: function(){
		var data = this.getBuffer_();
		if (data === '')
			return;
		
		file_append(this.path, data);
	},
	
	getBuffer_: function(){
		if (this.buffer.length === 0) 
			return '';
		
		var data = this.buffer.join(newLine)+ newLine;
		this.buffer.length = 0;
		return data;
	}
};
