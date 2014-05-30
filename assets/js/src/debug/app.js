define([
	'debug/test-string',
	'decorators/tooltip',
	'decorators/zero-clipboard'
], function (
	testString,
	tooltipDecorator,
	zeroClipboardDecorator
) {
	var hash = decodeURIComponent(location.hash).substr(2);
	var ractive = new Ractive({
		el: '#el',
		template: '#template',
		decorators: {
			tooltip: tooltipDecorator,
			zeroClipboard: zeroClipboardDecorator
		},
		computed: {
			progress: function () {
				return (!!this.get('results.server') + this.get('results.list').filter(function (i) { return i; }).length + !!this.get('results.cedexis')) / this.get('total') * 100;
			},
			total: function () {
				return this.get('tests.list').length + 2;
			}
		},
		data: {
			capitalize: function (string) {
				return string.substr(0, 1).toUpperCase() + string.substr(1);
			},
			flash: true,
			location: location.pathname,
			results: {
				cedexis: null,
				server: null,
				list: []
			},
			tests: {
				cedexis: 'http://jsdelivr-data.wildlemur.com',
				server: 'http://cdn.jsdelivr.net/information.txt',
				list: [
					'https://cdn.jsdelivr.net/r15lgc.js',
					'http://cdn.jsdelivr.net/r15lgc.js',
					'https://www.cdn.jsdelivr.net/r15lgc.js',
					'http://www.cdn.jsdelivr.net/r15lgc.js',
					'http://jsdelivr3.dak.netdna-cdn.com/r15lgc.js',
					'http://exvm-sg.jsdelivr.net/r15lgc.js',
					'http://leap-pt.jsdelivr.net/r15lgc.js',
					'http://leap-ua.jsdelivr.net/r15lgc.js',
					'http://prome-it.jsdelivr.net/r15lgc.js'
				]
			}
		}
	});
	var results;

	ractive.observe('progress', function (value) {
		if (value === 100) {
			location.hash = '!' + JSON.stringify(ractive.get('results'));
			ractive.set('link', location.href);
		}
	});

	// configure ZeroClipboard
	ZeroClipboard.config({
		'moviePath': '//cdn.jsdelivr.net/zeroclipboard/1.3.3/ZeroClipboard.swf'
	});

	try {
		results = JSON.parse(hash);
	} catch (e) {}

	if (results) {
		ractive.set('results', results);
	} else {
		// Cedexis
		$.ajax(ractive.get('tests.cedexis'), {
			cache: false,
			success: function (response) {
				ractive.set('results.cedexis', response);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				ractive.set('results.cedexis', { error: errorThrown || textStatus });
			}
		});

		// server
		$.ajax(ractive.get('tests.server'), {
			cache: false,
			success: function (response, textStatus, jqXHR) {
				ractive.set('results.server', jqXHR.getResponseHeader('Server') || jqXHR.getResponseHeader('POP') || 'Failed to identify the server.');
			},
			error: function (jqXHR, textStatus, errorThrown) {
				ractive.set('results.server', errorThrown || textStatus);
			}
		});

		// list
		$.each(ractive.get('tests.list'), function (index, entry) {
			$.ajax(entry, {
				cache: false,
				success: function (response) {
					ractive.set('results.list.' + index, response === testString ? 'Ok' : 'Failed');
				},
				error: function (jqXHR, textStatus, errorThrown) {
					ractive.set('results.list.' + index, errorThrown || textStatus);
				}
			});
		});
	}
});