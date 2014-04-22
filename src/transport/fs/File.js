var File = function(name, shouldReadStats){
	
	this.buffer = [];
	this.path = Path.resolve(_directory, name)
		+ '.'
		+ _extension
		;
	
	this.size = shouldReadStats !== true
		? 0
		: file_readSize(this.path);
	
};

File.prototype = {
	busy: false,
	errored: false,
	
	write: function(message){
		this.size += message.length;
		this.buffer.push(message);
		
		if (this.buffer.length > BUFFER_SIZE) {
			this[use_SYNC ? 'flushSync' : 'flush']();
		}
		
		if (this.size > FILE_MAXSIZE) 
			flow_nextFile();
		
	},
	
	flush: function(){
		var file = this,
			data;
		
		if (file.busy)
			return;
		
		file.busy = true;
		
		data = this.getBuffer_();
		file_appendAsync(file.path, data, function(error){
			file.busy = false;
			if (file.buffer.length > BUFFER_SIZE) 
				file.flush();
		});
	},
	
	flushSync: function(){
		file_append(this.path, this.getBuffer_());
	},
	
	getBuffer_: function(){
		if (this.buffer.length === 0) 
			return '';
		
		var data = this.buffer.join(newLine)+ newLine;
		
        this.buffer.length = 0;
		return data;
	}
};
