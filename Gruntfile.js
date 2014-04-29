module.exports = function(grunt) {
	grunt.initConfig({
		'intro': grunt.file.read('assets/js/requirejs-ractive/wrapper/intro.js'),
		'outro': grunt.file.read('assets/js/requirejs-ractive/wrapper/outro.js'),
		'requirejs': {
			'compile': {
				'options': {
					'mainConfigFile': 'assets/js/src/main.js',
					'baseUrl': 'assets/js/src',
					'name': 'app',
					'out': 'assets/js/build/app.js',
					'stubModules': [ 'rvc', 'amd-loader', 'ractive' ],
					optimize: 'none',
					'onModuleBundleComplete': function (data) {
						var fs			= module.require('fs');
						var amdclean	= module.require('amdclean');
						var outputFile	= data.path;

						fs.writeFileSync(outputFile, amdclean.clean({
							'removeModules': [ 'rvc', 'amd_loader', 'ractive' ],
							'filePath': outputFile
						}));
					}
				}
			}
		},
		'concat': {
			'closure': {
				'files': [{
					'expand': true,
					'src': 'assets/js/build/app.js'
				}],
				'options': {
					'banner': '<%= intro %>',
					'footer': '<%= outro %>'
				}
			}
		},
		'jsbeautifier': {
			'files': 'assets/js/build/app.js',
			'options': {
				'js': {
					'indentWithTabs': true
				}
			}
		},
		'uglify': {
			'target': {
				'options': {
					'sourceMap': true,
					'sourceMapName': 'assets/js/build/app.min.map'
				},
				'files': {
					'assets/js/build/app.min.js': 'assets/js/build/app.js'
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