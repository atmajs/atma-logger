Logger
----

Features:

- string colors
- object formatters
- object color theme

@TODO
- implement File and Database Transport, as for now only stdout is used


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
logger.cfg(cfgObject); // {key: value, ...}

/** KEYS
 * color: 'none'|'ascii'|'html'
 * level: 5 (current min log levels to output)
 */

```

