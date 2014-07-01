var message_format,
	message_prepair;

(function() {

	message_prepair = function(args, instance) {
		if (_cfg.formatMessage === false) {
			if (_cfg.logMeta)
				args.unshift(_cfg.logMeta(args));
			
			return args;
		}
		
		var message = message_format(args);
		
		if (instance._name != null) {
			message = instance._name.color + ' ' + message;
		}
		
		if (_cfg.logCaller !== false) 
			message += stack_formatCaller(' (F:L)', 5);
		
		if (typeof _cfg.logMeta === 'function') 
			message = _cfg.logMeta(args) + ' ' + message;
		
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

			if (x instanceof String) 
				x = String(x);
			
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
	};

}());