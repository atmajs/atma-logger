	
var ColorAscii = {
	type: 'ascii',
	START : '\u001b[',
	END : '\u001b[0m',
	
	value: {
		red: '31m',
		green: '32m',
		yellow: '33m',
		blue: '34m',
		magenta: '35m',
		cyan: '36m',
		white: '37m',
		black: '30m',

		bg_black: '40m',
		bg_red: '41m',
		bg_green: '42m',
		bg_yellow: '43m',
		bg_blue: '44m',
		bg_magenta: '45m',
		bg_cyan: '46m',
		bg_white: '47m',
		
		bold: '1m',
		italic: '3m',
		underline: '4m',
		inverse: '7m'
	},
	
	start: function(key){
		return this.START + this.value[key];
	}
};