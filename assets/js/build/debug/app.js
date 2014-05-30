(function(global) {
	var ractive = global.Ractive;
	var amd_debug_test_string = '/* Copyright 2012 Cedexis Inc. */\n\n(function() {\n    var s = new Date();\n    if (\'object\' === typeof window.radar) {\n        window.radar.stoppedAt = s;\n    }\n})();\n';
	var amd_decorators_tooltip = function(node, title, placement, trigger, container) {
		var $node = $(node).tooltip({
			'title': title,
			'placement': placement || 'top',
			'trigger': trigger || 'hover',
			'container': container || 'body'
		});
		return {
			'teardown': function() {
				$node.tooltip('destroy');
			}
		};
	};
	var amd_decorators_helpers = {
		'create': function(fn) {
			return function(node) {
				var ractive = this;
				fn.apply(ractive, arguments);
				return {
					teardown: function() {},
					update: function() {
						fn.apply(ractive, [node].concat(Array.prototype.slice.call(arguments, 0, arguments.length)));
					}
				};
			};
		},
		'combine': function(wrapped) {
			return function(node, toCall) {
				var decorators = [];
				var ractive = this;
				wrapped.forEach(function(d) {
					var name = Object.keys(d)[0];
					if (typeof toCall[name] !== 'undefined') {
						var fn = d[name];
						var callArgs = toCall[name];
						var args = callArgs ? [node].concat(callArgs) : [node];
						var result = fn.apply(ractive, args);
						result._name = name;
						decorators.push(result);
					}
				});
				return {
					teardown: function() {
						decorators.forEach(function(d) {
							d.teardown();
						});
					},
					update: function(toUpdate) {
						decorators.forEach(function(d) {
							var values = toUpdate[d._name];
							if (!Array.isArray(values)) {
								values = [values];
							}
							d.update.apply(ractive, values);
						});
					}
				};
			};
		}
	};
	var amd_decorators_zero_clipboard = function(helpers) {
		return helpers.create(function(node) {
			var clip = new ZeroClipboard(node);
			var $bridge = $('#global-zeroclipboard-html-bridge');
			var $node = $(node);
			var ractive = this;
			clip.on('mouseover', function() {
				$bridge.tooltip('destroy').tooltip({
					'title': 'Copy to Clipboard',
					'placement': 'top'
				}).tooltip('show');
			});
			clip.on('mouseout', function() {
				$bridge.tooltip('destroy');
				$node.removeClass('zeroclipboard-is-hover');
			});
			clip.on('complete', function() {
				$bridge.tooltip('destroy').tooltip({
					'title': 'Copied!',
					'placement': 'top'
				}).tooltip('show');
			});
			clip.on('noflash', function() {
				ractive.set('flash', false);
			});
		});
	}(amd_decorators_helpers);
	var amd_debug_app = function(testString, tooltipDecorator, zeroClipboardDecorator) {
		var hash = decodeURIComponent(location.hash).substr(2);
		var ractive = new Ractive({
			el: '#el',
			template: '#template',
			decorators: {
				tooltip: tooltipDecorator,
				zeroClipboard: zeroClipboardDecorator
			},
			computed: {
				progress: function() {
					return ( !! this.get('results.server') + this.get('results.list').filter(function(i) {
						return i;
					}).length + !! this.get('results.cedexis')) / this.get('total') * 100;
				},
				total: function() {
					return this.get('tests.list').length + 2;
				}
			},
			data: {
				capitalize: function(string) {
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
		ractive.observe('progress', function(value) {
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
				success: function(response) {
					ractive.set('results.cedexis', response);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					ractive.set('results.cedexis', {
						error: errorThrown || textStatus
					});
				}
			});
			// server
			$.ajax(ractive.get('tests.server'), {
				cache: false,
				success: function(response, textStatus, jqXHR) {
					ractive.set('results.server', jqXHR.getResponseHeader('Server') || jqXHR.getResponseHeader('POP') || 'Failed to identify the server.');
				},
				error: function(jqXHR, textStatus, errorThrown) {
					ractive.set('results.server', errorThrown || textStatus);
				}
			});
			// list
			$.each(ractive.get('tests.list'), function(index, entry) {
				$.ajax(entry, {
					cache: false,
					success: function(response) {
						ractive.set('results.list.' + index, response === testString ? 'Ok' : 'Failed');
					},
					error: function(jqXHR, textStatus, errorThrown) {
						ractive.set('results.list.' + index, errorThrown || textStatus);
					}
				});
			});
		}
	}(amd_debug_test_string, amd_decorators_tooltip, amd_decorators_zero_clipboard);
})(window);
