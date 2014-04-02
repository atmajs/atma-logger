var file_append,
    file_appendAsync,
    file_readSize,
    file_removeAsync,
    file_remove
    ;

(function(){
    
    var Fs = require('fs'),
        Path = require('path')
        ;
    
    file_readSize = function(path){
        try {
            var x = Fs.statSync(path);
            return x && x.size;
        }
        catch(error) {
            return 0;
        }
    };
    
    file_removeAsync = function(path, callback){
        Fs.unlink(path, function(error){
            if (error) 
                exception_(error);
            
            callback(error);
        });
    };
    
    file_remove = function(path){
        try {
            Fs.unlink(path);
        }catch(error) {}
    }
    
    file_appendAsync = function(path, str, callback){
        
        
        Fs.open(path, 'a', function(error, fd){
            if (error != null) {
                exception_(error);
                callback(error);
                return;
            }
            
            
            var buffer = new Buffer(str, 'utf8');
            Fs.write(fd, buffer, 0, buffer.length, 0, function(error){
                if (error) {
                    exception_(error);
                    callback(error);
                    return;
                }
                
                Fs.close(fd, callback);
            });
        });
    };
    
    file_append = function(path, str){
        console.log('>>append file', path, str.length);
        try {
            var fd = Fs.openSync(path, 'a');
        
            Fs.writeSync(fd, str);
            Fs.closeSync(fd);
            
        } catch(error){
            console.error('>> error', error);
        }
    }
}());