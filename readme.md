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

    'lorem impsum'
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

    'green<bold<lorem> ipusm>'.color

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

