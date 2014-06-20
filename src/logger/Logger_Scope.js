var Logger_Scope;
(function() {
	Logger_Scope = function(parent, name, level){
		this._parent = parent;
		this._name = name;
		this._level = level;
		
		if (parent != null && parent._name) 
			this._name = parent._name + '.' + name;
		
		this._scope = this._name;
		
		var self = this;
		function log(){
			return self.log.apply(self, arguments);
		}
		log.__proto__ = self;
		return log;
	};
	
	Logger_Scope.prototype = LoggerProto;
	obj_extend(Logger_Scope, LoggerProto);
}());