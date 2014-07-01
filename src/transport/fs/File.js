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
	get newLine () {
		return newLine;
	},
	busy: false,
	errored: false,
	listeners: [],
	write: function(message){
		this.size += message.length + newLine.length;
		this.buffer.push(message);
		
		if (this.buffer.length > BUFFER_SIZE) {
			this[use_SYNC ? 'flush' : 'flushAsync']();
		}
		
		if (this.size >= FILE_MAXSIZE) {
			flow_nextFile();
		}
	},
	flushAsync: function(cb){
		Buffered.flushAsync(this, BUFFER_SIZE, File_writeAsync, cb);
	},
	flush: function(cb){
		Buffered.flush(this, File_write, cb);
	},
	getBuffer_: function(){
		if (this.buffer.length === 0) 
			return '';
		
		var data = this.buffer.join(newLine)+ newLine;
		this.buffer.length = 0;
		return data;
	}
};

function File_writeAsync(self, data, cb){
	file_appendAsync(self.path, data, cb);
}
function File_write(self, data){
	file_append(self.path, data);
}