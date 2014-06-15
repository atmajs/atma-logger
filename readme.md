NodeJS Logger
----
[![Build Status](https://travis-ci.org/atmajs/atma-logger.svg?branch=master)](https://travis-ci.org/atmajs/atma-logger)
[![NPM version](https://badge.fury.io/js/atma-logger.svg)](http://badge.fury.io/js/atma-logger)

Features:

- string colors: ascii and html
- object formatters _handles circular refs_
- object color theme
- `std` and `fs` transports
- `fs` with `stdout/stderr` interceptors

----

- [Library](#library)
- [Logger](#logger)
- [Config](#config)
    - [Log Levels](#log-levels)
    - [Transports](#transports)
        - [Std](#std)
        - [File System](#file-system)
- [Color](#color)

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

### Logger

```javascript
// chainable

/*
 * Logger scope functions
\*/
logger
    .log('lorem "%s"', 'ipsum');
    .trace(...)
    .debug(...)
    .warn(...)
    .error(...)
    ;

/*
 * Instance scope functions
 * <Number> - log level (redefines log level) (@see functions log level)
 * <String> - scope name (@see `levels` in configuration)
\*/
logger(String|Number, String|Number) 
    .log(...)
    .warn(...)
    .error(...)
    .trace(...)
    .debug(...)
    ;
```


### Config

```javascript
logger.cfg(key, value);
logger.cfg(CfgObject); // {key: value, ...}

CfgObject = {
    level: Number,
    levels: Object,
    color: 'none|ascii|html', // @def: ascii
	
	// log the filename and the linenumber
    logCaller: Boolean, // @def: true
    
	// uncaughtExceptions: flush the error and exit the process
	// @default: false
	handleExceptions: Boolean,
	
    // Date format pattern. e.g: 'dd-MM hh:mm'
	// @default: ''
    logDate: String,
    
    transport: TransportObject
}
```

#### Log Levels

Logger performs prints only, if current level is smaller than loggers level or per instance level. Default level is `50`. 

```javascript
/*
 * Define the log levels
\*/
logger.cfg({
    // logger level
    level: 64
    // named scope levels
    levels: {
        'userService': 100
    }
})

/*
 * Functions required log level
\*/
.trace(...) -> level_TRACE = 100
.debug(...) -> level_DEBUG = 75
.log  (...) -> level_LOG = 50
.warn (...) -> level_WARN = 25
.error(...) -> level_ERROR = 0

/*
 * Instance loglevel redefines the functions one
\*/
logger(30).log().error() ...
// log level minimum `30` is required


/*
 * Named scope instance
\*/
var log = logger('userService');

// prints
log('baz') //same as log.log('baz');
log.debug('baz');
```



#### Transports

##### Std
Print logs to the console
```javascript
STD_TransportObject = {
    type: 'std'
};
```

##### File System
Async file-system transport with buffering. 
```javascript 
FS_TransportObject = {
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


### Color
```javascript

    'lorem ipsum'
        .red
		.green
		.yellow
		.blue
		.magenta
		.cyan
		
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