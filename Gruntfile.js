module.exports = function(grunt) {
	var reqRactive = [ 'rvc', 'amd-loader', 'ractive' ];

	grunt.initConfig({
		'intro': grunt.file.read('assets/js/requirejs-ractive/wrapper/intro.js'),
		'outro': grunt.file.read('assets/js/requirejs-ractive/wrapper/outro.js'),
		'requirejs': {
			'app': {
				'options': {
					'mainConfigFile': 'assets/js/src/search/main.js',
					'baseUrl': 'assets/js/src',
					'name': 'search/app',
					'out': 'assets/js/build/search/app.js',
					'stubModules': reqRactive,
					'optimize': 'none',
					'onModuleBundleComplete': function (data) {
						var fs			= module.require('fs');
						var amdclean	= module.require('amdclean');
						var outputFile	= data.path;

						fs.writeFileSync(outputFile, amdclean.clean({
							'removeModules': reqRactive,
							'filePath': outputFile,
							'prefixTransform': function(name) {
								return reqRactive.indexOf(name) === -1
									? 'amd_' + name
									: name;
							}
						}));
					}
				}
			},
			'debug': {
				'options': {
					'mainConfigFile': 'assets/js/src/debug/app.js',
					'baseUrl': 'assets/js/src',
					'name': 'debug/app',
					'out': 'assets/js/build/debug/app.js',
					'optimize': 'none',
					'onModuleBundleComplete': function (data) {
						var fs			= module.require('fs');
						var amdclean	= module.require('amdclean');
						var outputFile	= data.path;

						fs.writeFileSync(outputFile, amdclean.clean({
							'filePath': outputFile,
							'prefixTransform': function(name) {
								return reqRactive.indexOf(name) === -1
									? 'amd_' + name
									: name;
							}
						}));
					}
				}
			}
		},
		'concat': {
			'closure': {
				'files': [{
					'expand': true,
					'src': 'assets/js/build/search/app.js'
				}, {
					'expand': true,
					'src': 'assets/js/build/debug/app.js'
				}],
				'options': {
					'banner': '<%= intro %>',
					'footer': '<%= outro %>'
				}
			}
		},
		'jsbeautifier': {
			'files': [ 'assets/js/build/search/app.js', 'assets/js/build/debug/app.js' ],
			'options': {
				'js': {
					'indentWithTabs': true
				}
			}
		},
		'uglify': {
			'target': {
				'options': {
					'sourceMap': true
				},
				'files': {
					'assets/js/build/search/app.min.js': 'assets/js/build/search/app.js',
					'assets/js/build/debug/app.min.js': 'assets/js/build/debug/app.js'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'assets/css/build/bundle.min.css': [ 'assets/css/modern-ui.css', 'assets/css/custom.css' ]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('build', [
		'requirejs',
		'concat:closure',
		'jsbeautifier',
		'uglify',
		'cssmin'
	]);
	grunt.registerTask('default', 'build');
};