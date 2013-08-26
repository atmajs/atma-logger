
var Logger = (function(){
    
    var _cfg = {},
        _transport,
        _level = 50;
   
    
    function message_format(args) {
        var str = '',
            rgx_format = /%s|%d/,
            item;
        
        var format = args.length > 1
            && typeof args[0] === 'string'
            && rgx_format.test(args[0]);
            
        
        for (var i = 0, x, imax = args.length; i < imax; i++){
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
                str += '  ';
            
            str += item;
        }
        return str;
    }
    
    function message_write(message) {
        Transport.write(message);
    }
    
    function cfg_set(key, value) {
        switch (key) {
            case 'color':
                Color.define(value);
                break;
        }
    }
    
    
    var LoggerProto = {
          cfg: function(mix){
            if (typeof mix === 'string'){
                if (arguments.length === 1) 
                    return _cfg[mix];
                
                cfg_set(mix, arguments[1]);
            }
            
            for (var key in mix) {
                cfg_set(key, mix[key]);
            } 
        },
        
        color: Color,
        formatMessage: function(){
            return message_format(arguments);
        },
        
        log: function(){
            message_write(message_format(arguments));
            return this;
        },
        error: function(){
            message_write(message_format(arguments).red.bold);
            return this;
        },
        warn: function(){
            message_write(message_format(arguments).yellow);
            return this;
        },
        
        setLevel: function(level){
            _level = level;
            return this;
        }
    };
    
    var LoggerEmptyProto = {
        cfg: LoggerProto.cfg,
        color: LoggerProto.color,
        
        log: fn_doNothing,
        error: fn_doNothing,
        warn: fn_doNothing
    };
    
    function Logger(level) {
        
        if (level > _level) 
            return LoggerEmptyProto;
        
        return LoggerProto;
    }
    
    obj_extend(Logger, LoggerProto);
    
    
    
    return Logger;
}());