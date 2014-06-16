var ColorHtml;
(function(){
	
	ColorHtml = {
		END : '</span>',
		
		value: {
			red: 'color:red',
			green: 'color:green',
			yellow: 'color:yellow',
			blue: 'color:blue',
			magenta: 'color:magenta',
			cyan: 'color:cyan',
			
			bg_black: 'background-color:black',
			bg_red: 'background-color:red',
			bg_green: 'background-color:green',
			bg_yellow: 'background-color:yellow',
			bg_blue: 'background-color:blue',
			bg_magenta: 'background-color:magenta',
			bg_cyan: 'background-color:cyan',
			bg_white: 'background-color:white',
	
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
	
	var str_htmlEncode = (function() {
		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#x27;',
			'/': '&#x2F;'
		};
		function replaceEntity(chr) {
			return map[chr];
		}
		function str_htmlEncode(html) {
			return html.replace(/[&"'\<\>\/]/g, replaceEntity);
		}
		
		return str_htmlEncode;
	}());
}());
