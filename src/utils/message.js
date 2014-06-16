var message_format,
	message_prepair;

(function() {

	message_prepair = function(args) {
		if (_cfg.formatMessage === false) 
			return args;
		
		var message = message_format(args);
		
		if (_cfg.logCaller !== false) 
			message += stack_formatCaller(' (F:L)', 5);
		
		if (_cfg.logDate !== false) {
			message = date_formatForMessage(_cfg.logDate)
				+ ' '
				+ message;
		}
		
		return message;
	};

	message_format = function(args) {
		var str = '',
			rgx_format = /%s|%d/,
			item;

		var format = args.length > 1
			&& typeof args[0] === 'string'
			&& rgx_format.test(args[0])
			;


		for (var i = 0, x, imax = args.length; i < imax; i++) {
			x = args[i];

			item = typeof x === 'string'
				? x
				: Color.formatJSON(x)
				;

			if (i > 0 && format && rgx_format.test(str)) {
				str = str.replace(rgx_format, item);
				continue;
			}

			if (str !== '')
				str += ' ';

			str += item;
		}
		return str;
	}

}());