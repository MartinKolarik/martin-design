define([
	'decorators/helpers',
	'decorators/tooltip',
	'decorators/zero-clipboard'
], function (
	helpers,
	tooltip,
	zeroClipboard
) {
	return helpers.combine([
		{ 'tooltip': tooltip },
		{ 'zeroClipboard': zeroClipboard }
	]);
});