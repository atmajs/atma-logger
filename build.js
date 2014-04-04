/**
 *	IncludeJSBuild
 *
 *	``` $ includejs build.js ```
 **/


module.exports = {
	
	//'build project': {
		'commonjs': {
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
				Global: false
			}
		},
		
		'global': {
			settings: {
				io: {
					extensions: {
						js: ['condcomments:read']
					}
				}
			},
			action: 'import',
			files: 'builds/logger.js',
			output: 'lib/global-dev.js',
			defines: {
				CommonJS: false,
				Global: true
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
			'lib/global-dev.js'
		],
		output: [
			'lib/logger.js',
			'lib/global.js'
		]
	},

	'watch': {
		files: 'src/**',
		actions: ['commonjs', 'global']
	},
	
	'publish': {
		action: 'custom',
		script: 'tools/publish'
	},

	'defaults': ['commonjs', 'global', 'jshint', 'uglify']
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
