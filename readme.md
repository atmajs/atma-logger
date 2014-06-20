Browser and NodeJS Logger
----
[![Build Status](https://travis-ci.org/atmajs/atma-logger.svg?branch=master)](https://travis-ci.org/atmajs/atma-logger)
[![NPM version](https://badge.fury.io/js/atma-logger.svg)](http://badge.fury.io/js/atma-logger)

Features:
- string colors: ascii and html
- object formatters _handles circular refs_
- object color theme
- different and extendable Transports (`std`, `fs`, `stream`, etc)
- NodeJS: `stdout/stderr` interceptors

----

- [Library](#library)
- [Logger](#logger)
- [Config](#configuration)
    - [Log Levels](#log-levels)
	- [Log Scopes](#log-scopes)
    - [Transports](#transports)
		- NodeJS
			- [Std](#std)
			- [File System](#file-system)
			- [Stream](#stream)
		- Browser
			- [Console](#console)
			- Http/Ajax _in progress_
			- DOMNode output _in progress_
			
- [Color](#colorize-string)

### Library
```bash
$ npm i atma-logger -save
```
```javascript
// CommonJS Module
var logger = require('atma-logger'); /*minified*/
var logger = require('atma-logger/lib/logger-dev'); /*not minified*/

// Exports to `global`
require('atma-logger/lib/global'); /*minified*/
require('atma-logger/lib/global-dev'); /*not minified*/
    ...
    logger.trace(global);
```
```html
<!-- Browser -->
<script src='lib/browser.min.js'></script>
<script>
logger.cfg(ConfigurationObject)
logger.log(...args);
</script>
```

### Logger

```javascript
Logger = Function
	// if level is greater than current global level `EmptyLogger` is returned
	- function(level):Logger | EmptyLogger
	// is for assertion logs
	- function(Boolean):Logger |EmptyLogger
	
Logger __static__ AND __proto__ {
	// Logger functions. They all have different default log levels.
	//   Global default level is level_LOG
	// accept any arguments
	// returns self
	log:   function(...args):Self
	warn:  function(...args):Self
	error: function(...args):Self
	trace: function(...args):Self
	debug: function(...args):Self
	
	// Creates scoped Logger
	// - name: is also printed
	// - level: custom log level for this scope.
	//    Caution: You can overwrite this with configuration
	// returns Log function with Logger in static
	
	create: function(name:String [,? level:Number]):Function<Logger>
	
	cfg : Function
		- function(key:String, value:Any):Self
		- function(CfgObject:Object):Self
		- function(key:String):Any /*value*/
	
	// const
	level_ERROR: 0
	level_WARN:  25
	level_LOG:   50
	level_DEBUG: 75
	level_TRACE: 100
}
```
Usage examples:
```javascript
logger.log('Global object:', global);

var log1 = logger.create('foo');
log1('Hello'); //> foo Hello

var log2 = log1.create('baz');
log2('Hello'); //> foo.baz Hello
log2.warn('Hello'); //> foo.baz Hello
```


### Configuration

```javascript
CfgObject {
	// global log level, default is level_LOG === 50
    level: Number
	
	// override log levels for scoped loggers
    levels: ScopeLevels<Object>
	
	// @default: NodeJS: ascii, Browser: none
    color: 'none|ascii|html'
	
	/** Format message as a string before the output,
	  * otherwise raw arguments are passed to the transport
	  * Features:
	  *   - printf style
	  *   - format Arrays and Objects(circular refs are handled)
	  *   - format Number, Data, RegExp, etc.
	 \*/
	formatMessage: true,
	
	// log the filename and the linenumber
	// @default: true
    logCaller: Boolean
    
	// uncaughtExceptions: flush the error and exit the process
	// @default: false
	handleExceptions: Boolean,
	
    // Date format pattern. e.g: 'dd-MM hh:mm'
	// @default: ''
    logDate: String
    
    transport: TransportConfig
}
```

#### Log Levels

Logger performs prints only, if current level is smaller than loggers level or per instance(scope) level.
Default level is `level_LOG === 50`, so `logger.trace(something)` want return 

```javascript
logger.cfg({
	// override global level
	level: Number,
	
	// extends current scope levels
	levels: ScopeLevels<Object>
})
ScopeLevels {
	// strict scoped level
	'scope': Number,
	
	// all sub scopes
	'scope.*': Number
	
	// or event deeper
	'scope.foo.*'
	
}
```

Example:
```javascript
/*
 * Global levels
\*/

// predefined
logger.debug('foo') //> does nothing
logger.cfg({ level: logger.level_DEBUG /*75*/ })
logger.trace('foo') //> prints foo

// custom
logger(90).log('foo') //> does nothing, as current level is DEBUG
logger.cfg({ level: 90 });
logger(90).log('foo') //> prints foo

logger.cfg({ level: -1 });
// event errors wont be printed
logger.error('foo') //> does nothing

/*
 * Scoped instance
\*/
var userServiceLogger = logger('userService', 25);

// prints nothing, as level_LOG === 50 is required
userServiceLogger('baz') //same as userServiceLogger.log('baz');

// Turn `userService` logging via configuration
logger.cfg({
	levels: {
		// enable logs
		'userService': 50,
		
		// enable traces
		'userService.patch': 100
	}
});
userServiceLogger('baz') // prints baz

var userPatcherLogger = userServiceLogger.create('patch');
userPatcherLogger.trace(user) // prints user object
```



#### Transports

##### Std
Print logs to the console
```javascript
STD_TransportConifg = {
    type: 'std'
};
```

##### File System
Async file-system transport with buffering. 
```javascript 
FS_TransportConfig = {
    type: 'fs',
    
    // defaults
    extension: 'txt', 
    directory: 'logs',
	
	// message COUNT to buffer before write
	// @default, is NO buffering
    bufferSize: 0,
	
	// in Bytes
    fileSize: 500 * 1024,
	
	// After the filesize is reached its maximum, a new file will be created
	// This option limits the log files. Old log files will be deleted
    filesCount: 10,
	
	// all writes are async, but to switch to sync writes set this option to `true`
    sync: false,
    
    // when set to `true` then all std writes, like - console.log,
    // will be also written to the file system.
    interceptStd: false
};
```
##### Stream
Provide any Writable stream, and all logs are piped to that stream
```javascript
Stream_TransportConfig {
	type: 'stream',
	stream: IWritableStream
}
// e.g
logger.cfg({
	transport: {
		type: 'stream',
		stream: FooSocket
	}
});
```

### Colorize string
HTML and ASCII colors are supports (refer to `color` option).
```javascript

    'lorem ipsum'
        .red
		.green
		.yellow
		.blue
		.magenta
		.cyan
		
		.bg_black,
		.bg_red,
		.bg_green,
		.bg_yellow,
		.bg_blue,
		.bg_magenta,
		.bg_cyan,
		.bg_white,
		
		.bold
		.italic
		.underline
		.inverse
        ;

    'green<bold<lorem> ipsum>'.color
```


----
© MIT
  Atma.js Project