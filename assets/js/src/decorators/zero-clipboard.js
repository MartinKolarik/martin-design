define([
	'decorators/helpers'
], function(
	helpers
) {
	return helpers.create(function(node) {
		var $bridge	= $('#global-zeroclipboard-html-bridge');
		var $node	= $(node);
		var clip	= new ZeroClipboard(node);
		var ractive	= this;

		clip.on('mouseover', function() {
			$bridge
				.tooltip('destroy')
				.tooltip({
					'title'		: 'Copy to clipboard',
					'placement'	: 'top'
				})
				.tooltip('show');
		});

		clip.on('mouseout', function() {
			$bridge.tooltip('destroy');
			$node.removeClass('zeroclipboard-is-hover');
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

		clip.on('noflash', function() {
			ractive.set('flash', false);
		});
	});
});