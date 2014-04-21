$(function() {
	// search input and results
	var ractive = new Ractive({
		'template'	: '#search-template',
		'el'		: '#search',
		'data'		: {
			'collection'	: [],
			'projects'		: [],
			'getAuthorLink'	: getAuthorLink
		}
	});

	// bind event listeners
	ractive.on({
		'add'			: function(event, project) {
			selectVersion(project, function(version) {
				selectFiles(project, version, function(files) {
					if(files.length) {
						ractive.get('collection').push({
							'project'	: project,
							'version'	: version,
							'files'		: files
						});
					}
				});
			});
		},
		'download'		: function(event, project) {
			selectVersion(project, function(version) {
				download(project, version);
			});
		},
		'remove'		: function(event, index) {
			ractive.get('collection').splice(index, 1);
		},
		'use'			: function(event, project) {
			selectVersion(project, function(version) {
				selectFiles(project, version, function(files) {
					if(files.length) {
						buildLinks([{
							'project'	: project,
							'version'	: version,
							'files'		: files
						}]);
					}
				});
			});
		},
		'useCollection'	: function(event, collection) {
			buildLinks(collection);
		}
	});

	// we'll need these later
	var $body			= $('body');
	var $document		= $(document);
	var $searchInput	= $('#search-input');

	// initialize Bloodhound
	var bloodhound = new Bloodhound({// TODO-LATER implement our own API-like search on client side (localStorage + https://github.com/pieroxy/lz-string/)
		'datumTokenizer'	: function(project) {
			return project.name.split(/[\s.-]+/g);
		},
		'limit'				: 25,
		'prefetch'			: {
			'url'	: '//api.jsdelivr.com/v1/jsdelivr/libraries',
			'ttl'	: 3600000
		},
		'queryTokenizer'	: function(query) {
			return query.split(/[\s.-]+/g);
		}
	});

	bloodhound.initialize();

	// update results on input
	$searchInput.focus().on('input', function() {
		bloodhound.get($searchInput.val(), function(list) {
			ractive.set('projects', list);
		})
	});

	// focus search form on CTRL + F
	$document.keydown(function(e) {
		return e.ctrlKey && e.which === 70
			? !$searchInput.focus()
			: true;
	});

	// auto-select input content
	$body.on('click', '.output', function() {
		this.select();
	});

	// fix issues with scrollbar when using modals
	$body.on('show.bs.modal', '.modal', function() {
		$body.addClass('r-modal-open');
	})
	.on('hide.bs.modal', '.modal', function() {
		if($('.modal').length <= 1) {
			$body.removeClass('r-modal-open');
		}
	});

	/**
	 * Modal component for Ractive
	 */
	var Modal = Ractive.extend({
		'template'	: '#modal-template',
		'el'		: 'body',
		'append'	: true,
		'data'		: {
			'id'		: 'modal',
			'buttons'	: [],
			'size'		: '',
			'cancel'	: function() {},
			'submit'	: function() {}
		},
		'partials'	: {
			'title'		: '',
			'body'		: '',
			'footer'	: ''
		},
		'complete'	: function() {
			var _this = this;

			$('#' + this.data.id)
				.modal()
				.on('hidden.bs.modal', function() {
					$(this).remove();
					_this.teardown();
				});

			this.on({
				'cancel'	: function() {
					if(_this.data.cancel.call(_this) !== false) {
						$('#' + _this.data.id).modal('hide');
					}
				},
				'submit'	: function() {
					if(_this.data.submit.call(_this) !== false) {
						$('#' + _this.data.id).modal('hide');
					}
				}
			});
		}
	});

	/**
	 * buildLinks
	 *
	 * @param {Array} collection
	 */
	function buildLinks(collection) {// TODO complete refactoring
		var cssTemplate = '<link type="text/css" rel="stylesheet" href="//cdn.jsdelivr.net/{{href}}">';
		var jsTemplate	= '<script type="text/javascript" src="//cdn.jsdelivr.net/{{src}}"></script>';
		var css			= [];
		var js			= [];
		var others		= [];
		var isCss		= /\.css$/i;
		var isJs		= /\.js$/i;

		// one file
		if(collection.length === 1 && collection[0].files.length === 1) {
			if(isCss.test(collection[0].files[0])) {
				css		= cssTemplate.replace('{{href}}', collection[0].project.name + '/' + collection[0].version + '/' + collection[0].files[0]);
			} else if(isJs.test(collection[0].files[0])) {
				js		= jsTemplate.replace('{{src}}', collection[0].project.name + '/' + collection[0].version + '/' + collection[0].files[0]);
			} else {
				others.push('//cdn.jsdelivr.net/' + collection[0].files);
			}
		} else {
			// each project in collection
			for(var i = 0, c = collection.length; i < c; i++) {
				var cssFiles	= [];
				var jsFiles		= [];
				var otherFiles	= [];

				// each file in project
				for(var j = 0, d = collection[i].files.length; j < d; j++) {
					if(isCss.test(collection[i].files[j])) {
						cssFiles.push(collection[i].files[j]);
					} else if(isJs.test(collection[i].files[j])) {
						jsFiles.push(collection[i].files[j]);
					} else {
						otherFiles.push('//cdn.jsdelivr.net/' + collection[i].files[j]);
					}
				}

				if(cssFiles.length === 1 && cssFiles[0] === collection[i].project.mainfile) {
					css.push(collection[i].project.name + '@' + collection[i].version);
				} else if(cssFiles.length) {
					css.push(collection[i].project.name + '@' + collection[i].version + '(' + cssFiles.join('+') + ')');
				}

				if(jsFiles.length === 1 && jsFiles[0] === collection[i].project.mainfile) {
					js.push(collection[i].project.name + '@' + collection[i].version);
				} else if(jsFiles.length) {
					js.push(collection[i].project.name + '@' + collection[i].version + '(' + jsFiles.join('+') + ')');
				}

				if(otherFiles.length) {
					others.push.apply(others, otherFiles);
				}
			}

			/*if(css.length === 1) {
				css	= cssTemplate.replace('{{href}}', css[0]);
			} else */if(css.length) {
				css	= cssTemplate.replace('{{href}}', 'g/' + css.join(','));
			}

			/*if(js.length === 1) {
				js	= jsTemplate.replace('{{src}}', js[0]);
			} else */{
				js	= jsTemplate.replace('{{src}}', 'g/' + js.join(','));
			}
		}

		new Modal({
			'data'		: {
				'id'	: 'modal-links',
				'size'	: 'modal-lg',
				'css'	: css,
				'js'	: js,
				'others': others
			},
			'partials'	: {
				'title'	: 'Your link' + ((!!css.length + !!js.length + others.length) > 1 ? 's' : ''),
				'body'	: $('#link-list-template').html()
			}
		});
	}

	/**
	 * Download
	 *
	 * @param {Object} project
	 * @param {String} version
	 */
	function download(project, version) {
		downloadHelper('//cdn.jsdelivr.net/' + project.name + '/' + version + '/' + project.zip);
	}

	/**
	 * Download helper
	 *
	 * @param {String} url
	 */
	function downloadHelper(url) {
		var $iframe = $('#download-helper');

		if(!$iframe.length) {
			$iframe = $('<iframe id="download-helper" style="display: none"></iframe>').appendTo('body');
		}

		$iframe.attr('src', url);
	}

	/**
	 * Get author link
	 *
	 * @param {String} githubUrl
	 *
	 * @returns {String}
	 */
	function getAuthorLink(githubUrl) {
		return githubUrl.match(/(https:\/\/github\.com\/[^/]+\/)/i)[1];
	}

	/**
	 * Select files
	 *
	 * @param {Object} project
	 * @param {String} version
	 * @param {function} callback
	 */
	function selectFiles(project, version, callback) {
		var assets = project.assets.filter(function(asset) {
			return asset.version === version;
		})[0];

		if(assets) {
			new Modal({
				'data'		: {
					'id'		: 'modal-select-files',
					'project'	: project,
					'files'		: assets.files,
					'buttons'	: [
						{
							'label'		: 'cancel',
							'class'		: 'btn-default',
							'handler'	: 'cancel'
						},
						{
							'label'		: 'select',
							'class'		: 'primary',
							'handler'	: 'submit'
						}
					],
					'submit'	: function() {
						if(typeof callback === 'function') {
							callback(Array.prototype.slice.call($('#' + this.data.id)
								.find('input:checked'))
								.map(function(element) {
									return element.value
								})
							);
						}
					}
				},
				'partials'	: {
					'title'	: 'Select files to include',
					'body'	: $('#file-list-template').html()
				}
			});
		}
	}

	/**
	 * Select version
	 *
	 * @param {Object} project
	 * @param {function} callback
	 */
	function selectVersion(project, callback) {
		var modal = new Modal({
			'data'		: {
				'id'		: 'modal-select-version',
				'showInput'	: false,
				'project'	: project,
				'buttons'	: [
					{
						'label'		: 'cancel',
						'class'		: 'btn-default',
						'handler'	: 'cancel'
					},
					{
						'label'		: 'select',
						'class'		: 'primary',
						'handler'	: 'submit'
					}
				],
				'newVersion': function(event) {
					event.original.preventDefault();
					this.set('showInput', true);
					$('#new-version-email').focus();
				},
				'submitNew'	: function(event) {
					event.original.preventDefault();
					this.set('showInput', null);// TODO send report
				},
				'submit'	: function() {
					if(typeof callback === 'function') {
						callback($('#' + this.data.id)
							.find('input:checked')
							.val()
						);
					}
				}
			},
			'partials'	: {
				'title'	: 'Select your version of ' + project.name,
				'body'	: $('#version-list-template').html()
			}
		});

		modal.on({
			'newVersion'	: modal.data.newVersion,
			'submitNew'		: modal.data.submitNew
		});
	}
});