var stack_formatCaller;

(function(){
    
    
    stack_formatCaller = function(format, entryIndex){
        
        var stack = new Error()
            .stack
            .split('\n')
            ;
        
        var entry = stack[entryIndex || 2];
        if (entry == null) 
            return '';
        
        entry = entry.substr(
            entry.indexOf('(') + 1,
            entry.lastIndexOf(')') - 1
        );
        
        var match = /^(.+):(\d+):(\d)/.exec(entry);
        if (match == null) 
            return '';
        
        var path = match[1],
            file = path.substring(path.search(/[\/\\][^\/\\]+$/) + 1),
            line = match[2]
            ;
        
        return format
            .replace('P', path)
            .replace('F', file)
            .replace('L', line)
            ;
    };
    
}());