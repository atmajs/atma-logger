(function(root, factory){
	"use strict";

	var _global, _exports;
	
	if (typeof exports !== 'undefined' && (root === exports || root == null)){
		// raw nodejs module
    	_global = _exports = global;
    }
	
	if (_global == null) {
		_global = typeof window === 'undefined' ? global : window;
	}
	if (_exports == null) {
		_exports = root || _global;
	}
	
	
	factory(_global, _exports);
	
}(this, function(global, exports){
	"use strict";
	
	
	// import ../src/utils/obj.js
	// import ../src/utils/function.js
	// import ../src/utils/stack.js
	// import ../src/color/color.js
	
	// import ../src/transport/Transport.js
	// import ../src/logger.js
	// import ../src/configurate.js
	
	exports.logger = Logger;
	
}));