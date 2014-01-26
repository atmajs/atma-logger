/**
 *	IncludeJSBuild
 *
 *	``` $ includejs build.js ```
 **/


module.exports = {
	'settings': {
		io: {
			extensions: {
				js: ['condcomments:read', 'importer:read']
			}
		}
	},
	'import': {
		files: 'builds/**',
		output: 'lib/'
	},
	'jshint': {
		files: ['lib/logger.js'],
		jshint: JSHint()
	},
	'uglify': {
		files: 'lib/logger.js'
	},

	'watch': {
		files: 'src/**',
		config: '#[import]'
	},
	
	'publish': {
		action: 'custom',
		script: 'tools/publish'
	},

	'defaults': ['import', 'jshint', 'uglify']
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
