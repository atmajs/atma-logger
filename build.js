/**
 *	IncludeJSBuild
 *
 *	``` $ includejs build.js ```
 **/


module.exports = {
	
	//'build project': {
		'node commonjs': {
			settings: {
				io: {
					extensions: {
						js: ['condcomments:read']
					}
				}
			},
			action: 'import',
			files: 'builds/logger.js',
			output: 'lib/logger-dev.js',
			defines: {
				CommonJS: true,
				Global: false,
				NodeJS: true,
				Browser: false
			}
		},
		
		'node global': {
			settings: {
				io: {
					extensions: {
						js: [ 'condcomments:read' ]
					}
				}
			},
			action: 'import',
			files: 'builds/logger.js',
			output: 'lib/global-dev.js',
			defines: {
				CommonJS: false,
				Global: true,
				NodeJS: true,
				Browser: false
			}
		},
		
		'browser global': {
			settings: {
				io: {
					extensions: {
						js: [ 'condcomments:read' ]
					}
				}
			},
			action: 'import',
			files: 'builds/logger.js',
			output: 'lib/browser.js',
			defines: {
				CommonJS: false,
				Global: true,
				NodeJS: false,
				Browser: true
				
			}
		},
	//},
	
	'jshint': {
		files: ['lib/logger-dev.js'],
		jshint: JSHint()
	},
	'uglify': {
		files: [
			'lib/logger-dev.js',
			'lib/global-dev.js',
			'lib/browser.js'
		],
		output: [
			'lib/logger.js',
			'lib/global.js',
			'lib/browser.min.js'
		]
	},

	'watch': {
		files: 'src/**',
		actions: ['node commonjs', 'node global', 'browser global']
	},
	
	'publish': {
		action: 'custom',
		script: 'tools/publish'
	},

	'defaults': [
		'node commonjs',
		'node global',
		'browser global',
		'jshint',
		'uglify'
	]
};



function JSHint() {
	
	var options = {
			"bitwise": false,
			"camelcase": false,
			"curly": false,
			"eqeqeq": true,
			"es3": false,
			"forin": false,
			"freeze": false,
			"immed": true,
			"indent": 2,
			"latedef": "nofunc",
			"newcap": false,
			"noarg": true,
			"noempty": true,
			"nonbsp": true,
			"nonew": false,
			"plusplus": false,
			"quotmark": false,
			"undef": true,
			"unused": false,
			"strict": false,
			"trailing": false,
			"maxparams": false,
			"maxdepth": false,
			"maxstatements": false,
			"maxcomplexity": false,
			"maxlen": false,
			"asi": false,
			"boss": true,
			"debug": true,
			"eqnull": true,
			"esnext": true,
			"evil": true,
			"expr": false,
			"funcscope": false,
			"gcl": false,
			"globalstrict": true,
			"iterator": false,
			"lastsemic": true,
			"laxbreak": true,
			"laxcomma": true,
			"loopfunc": false,
			"maxerr": false,
			"moz": false,
			"multistr": true,
			"notypeof": false,
			"proto": true,
			"scripturl": false,
			"smarttabs": true,
			"shadow": true,
			"sub": true,
			"supernew": true,
			"validthis": true,
			"noyield": false,
			"browser": true,
			"couch": false,
			"devel": false,
			"dojo": false,
			"jquery": true,
			"mootools": false,
			"node": true,
			"nonstandard": false,
			"phantom": false,
			"prototypejs": false,
			"rhino": false,
			"worker": false,
			"wsh": false,
			"yui": false,
			"nomen": false,
			"onevar": false,
			"passfail": false,
			"white": false,
			"predef": ["global", "define", "atma", "io", "net", "mask", "include", "ruta", "ruqq", "Class", "logger", "app", "UTest", "assert", "eq_", "notEq_", "deepEq_", "notDeepEq_", "has_", "hasNot_"]
		}
	return {
		options: options,
		globals: options.predef
	};
}
