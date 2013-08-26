var Transport = (function(){
    var _transport;
    
    var transports = {};
        
    
    // import Std.js
    
    
    _transport = transports.std;
    return {
        
        define: function(transport){
            
            var type = transport.type;
            
            _transport = transports[type];
            _transport.cfg(transport);
            
            return this;
        },
        
        write: function(message){
            
            _transport.write('\n' + message);
        }
    };
    
}());