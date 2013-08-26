transports.std = (function(){
    
    
    return {
        write: function(message){
            process.stdout.write(message);   
        }
    }
}());