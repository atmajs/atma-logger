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

	return {
		options: {
			curly: false,
			eqeqeq: true,
			forin: false,
			immed: true,
			latedef: true,
			newcap: true,
			noarg: true,
			noempty: true,
			nonew: true,
			expr: true,
			regexp: true,
			undef: true,
			unused: true,
			strict: true,
			trailing: false,

			boss: true,
			eqnull: true,
			es5: true,
			lastsemic: true,
			browser: true,
			node: true,
			onevar: false,
			evil: true,
			sub: true,
			smarttabs: true
		},
		globals: {
			define: true,
			require: true,
			ActiveXObject: true
		}
	};
}
