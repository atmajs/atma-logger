var date_formatForMessage
    ;

(function(){
    
    date_formatForMessage = function(format){
        if (typeof format !== 'string') 
            format = 'dd-MM hh:mm:ss';
        
        return _format(new Date, format);
    };
}());