	
var ColorHtml = {
	END : '</span>',
	
	value: {
		red: 'color:red',
		green: 'color:green',
		yellow: 'color:yellow',
		blue: 'color:blue',
		magenta: 'color:magenta',
		cyan: 'color:cyan',
		

		bold: 'font-weight:bold',
		italic: 'font-style:italic',
		underline: 'text-decoration:underline',
		inverse: 'color:black;background:white'
	},
	
	
	start: function(key){
		var str = '<span style="'
			+ this.value[key]
			+ '">';
		
		return str;
	}
};