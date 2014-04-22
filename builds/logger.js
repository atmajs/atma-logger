(function(root, factory){
	"use strict";

	var __global = typeof window === 'undefined'
		? global
		: window
		;
	
	var Logger = factory(__global);
	
	// if CommonJS
	module.exports = Logger;
	// endif
	
	// if Global
	__global.logger = Logger;
	// endif
	
}(this, function(global){
	"use strict";
	
	// import ../src/vars.js
	// import ../src/utils/obj.js
	// import ../src/utils/function.js
	// import ../src/utils/stack.js
	// import ../src/utils/date.js
	// import ../src/utils/message.js
	// import ../src/utils/process.js
	// import ../src/utils/cfg.js
	// import ../src/utils/logger.js
	// import ../src/color/color.js
	
	// import ../src/transport/Transport.js
	// import ../src/logger.js
	// import ../src/configurate.js
	
	
	return Logger;
}));