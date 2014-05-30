require.config({
	paths: {
		'amd-loader': '../requirejs-ractive/amd-loader',
		'rvc': '../requirejs-ractive/rvc',
		'ractive': '../requirejs-ractive/ractive'
	}
});

require([ 'app' ]);