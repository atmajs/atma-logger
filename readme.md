NodeJS Logger
----
[![Build Status](https://travis-ci.org/atmajs/atma-logger.svg?branch=master)](https://travis-ci.org/atmajs/atma-logger)


Features:

- string colors: ascii and html
- object formatters
- object color theme
- `std` and `fs` transports
- `fs` with `stdout/stderr` interceptors


### Logger

```javascript

    logger
        .log('lorem "%s"', 'ipsum');
        .warn
        .error
        ;
        
    logger(5) // LOG level
        .log
        .warn
        .error
        ;

```


### Config

```javascript

logger.cfg(key, value);
logger.cfg(CfgObject); // {key: value, ...}

CfgObject = {
    color: 'none|ascii|html', // @default: ascii
    logCaller: false, // @default: true
    logDate: 'dd-MM hh:mm', //date format pattern, @default: null
    transport: TransportObject
}

STD_TransportObject = {
    type: 'std'
};

FS_TransportObject = {
    type: 'fs',
    
    // defaults
    extension: 'txt', 
    directory: 'logs', 
    bufferSize: 64,
    fileSize: 500 * 1024 * 1024,
    filesCount: 10,
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