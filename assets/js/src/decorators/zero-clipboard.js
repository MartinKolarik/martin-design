define([
	'decorators/helpers'
], function(
	helpers
) {
	return helpers.create(function(node) {
		var $bridge	= $('#global-zeroclipboard-html-bridge');
		var clip	= new ZeroClipboard(node);

		clip.on('mouseover', function() {
			$bridge
				.tooltip('destroy')
				.tooltip({
					'title'		: 'Copy to clipboard',
					'placement'	: 'top'
				})
				.tooltip('show');
		});

		clip.on('complete', function() {
			$bridge
				.tooltip('destroy')
				.tooltip({
					'title'		: 'Copied!',
					'placement'	: 'top'
				})
				.tooltip('show');
		});
	});
});