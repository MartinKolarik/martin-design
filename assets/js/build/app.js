(function(global) {
	var ractive = global.Ractive;
	var rvc_components_modal = function(Ractive) {
		var __options__ = {
			template: [{
					t: 7,
					e: 'div',
					a: {
						'class': ['modal fade'],
						role: ['dialog'],
						id: [{
							t: 2,
							r: 'id'
						}]
					},
					f: [{
						t: 7,
						e: 'div',
						a: {
							'class': [
								'modal-dialog ', {
									t: 2,
									r: 'size'
								}
							]
						},
						f: [{
							t: 7,
							e: 'div',
							a: {
								'class': ['modal-content']
							},
							f: [{
									t: 7,
									e: 'div',
									a: {
										'class': ['modal-header']
									},
									f: [{
											t: 7,
											e: 'button',
											a: {
												type: ['button'],
												'class': ['close'],
												'data-dismiss': ['modal'],
												'aria-hidden': ['true']
											},
											f: ['\xD7']
										},
										' ', {
											t: 7,
											e: 'h4',
											a: {
												'class': ['modal-title']
											},
											f: [{
												t: 3,
												r: 'title'
											}]
										}
									]
								},
								' ', {
									t: 7,
									e: 'div',
									a: {
										'class': ['modal-body']
									},
									f: [{
										t: 8,
										r: 'content'
									}]
								},
								' ', {
									t: 7,
									e: 'div',
									a: {
										'class': ['modal-footer']
									},
									f: [{
											t: 3,
											r: 'footer'
										},
										' ', {
											t: 4,
											r: 'buttons',
											i: 'i',
											f: [
												' ', {
													t: 7,
													e: 'button',
													a: {
														type: ['button'],
														'class': [
															'btn ', {
																t: 2,
																r: 'class'
															}
														]
													},
													f: [{
														t: 2,
														r: 'label'
													}],
													v: {
														click: {
															n: [{
																t: 2,
																r: 'handler'
															}]
														}
													}
												},
												' '
											]
										}
									]
								}
							]
						}]
					}]
				},
				' '
			]
		}, component = {};
		component.exports = {
			'data': {
				'id': 'modal',
				'title': '',
				'footer': '',
				'buttons': [],
				'size': '',
				'cancel': function() {},
				'submit': function() {}
			},
			'complete': function() {
				var _this = this;
				$('#' + this.data.id).modal().on('hidden.bs.modal', function() {
					$(this).remove();
					_this.teardown();
				});
				this.on({
					'cancel': function() {
						if (_this.data.cancel.call(_this) !== false) {
							$('#' + _this.data.id).modal('hide');
						}
					},
					'submit': function() {
						if (_this.data.submit.call(_this) !== false) {
							$('#' + _this.data.id).modal('hide');
						}
					}
				});
			}
		};
		if (typeof component.exports === 'object') {
			for (__prop__ in component.exports) {
				if (component.exports.hasOwnProperty(__prop__)) {
					__options__[__prop__] = component.exports[__prop__];
				}
			}
		}
		return Ractive.extend(__options__);
	}(ractive);
	var rvc_components_links = function(Ractive) {
		var __options__ = {
			template: [{
					t: 7,
					e: 'modal',
					a: {
						id: [{
							t: 2,
							r: 'id'
						}],
						title: [
							'Your link', {
								t: 4,
								x: {
									r: ['count'],
									s: '${0}>1'
								},
								f: ['s']
							}
						],
						size: [{
							t: 2,
							r: 'size'
						}],
						links: [{
							t: 2,
							r: 'links'
						}],
						submit: [{
							t: 2,
							r: 'subscribe'
						}],
						email: [{
							t: 2,
							r: 'email'
						}]
					},
					f: [{
						t: 4,
						r: 'links',
						f: [
							' ', {
								t: 7,
								e: 'ul',
								a: {
									id: ['link-list']
								},
								f: [{
										t: 4,
										r: 'js',
										f: [
											' ', {
												t: 7,
												e: 'li',
												f: [{
													t: 7,
													e: 'strong',
													f: ['JS']
												}]
											},
											' ', {
												t: 7,
												e: 'li',
												f: [{
													t: 7,
													e: 'input',
													a: {
														type: ['text'],
														'class': ['form-control output'],
														value: [{
															t: 2,
															r: 'js'
														}],
														readonly: null
													}
												}]
											},
											' '
										]
									},
									' ', {
										t: 4,
										r: 'css',
										f: [
											' ', {
												t: 7,
												e: 'li',
												f: [{
													t: 7,
													e: 'strong',
													f: ['CSS']
												}]
											},
											' ', {
												t: 7,
												e: 'li',
												f: [{
													t: 7,
													e: 'input',
													a: {
														type: ['text'],
														'class': ['form-control output'],
														value: [{
															t: 2,
															r: 'css'
														}],
														readonly: null
													}
												}]
											},
											' '
										]
									},
									' ', {
										t: 4,
										r: 'others.length',
										f: [
											' ', {
												t: 7,
												e: 'li',
												f: [{
													t: 7,
													e: 'strong',
													f: ['Others']
												}]
											},
											' ', {
												t: 4,
												r: 'others',
												f: [
													' ', {
														t: 7,
														e: 'li',
														f: [{
															t: 7,
															e: 'input',
															a: {
																type: ['text'],
																'class': ['form-control output'],
																value: [{
																	t: 2,
																	r: '.'
																}],
																readonly: null
															}
														}]
													},
													' '
												]
											},
											' '
										]
									}
								]
							},
							' ', {
								t: 7,
								e: 'div',
								a: {
									style: ['margin-top: 20px']
								},
								f: [{
										t: 4,
										r: 'subscribed',
										n: true,
										f: [
											' ', {
												t: 7,
												e: 'strong',
												f: ['E-mail updates']
											},
											' ', {
												t: 7,
												e: 'input',
												a: {
													type: ['text'],
													'class': ['form-control'],
													value: [{
														t: 2,
														r: 'email'
													}],
													placeholder: ['Enter your e-mail address if you want to receive updates']
												}
											},
											' ', {
												t: 7,
												e: 'div',
												a: {
													style: ['text-align: center; margin-top: 30px']
												},
												f: [{
													t: 7,
													e: 'button',
													a: {
														'class': ['btn primary btn-inverse']
													},
													f: ['Keep me updated'],
													v: {
														click: 'submit'
													}
												}]
											},
											' '
										]
									},
									' ', {
										t: 4,
										r: 'subscribed',
										f: [
											' ', {
												t: 7,
												e: 'p',
												a: {
													style: ['text-align: center; margin-bottom: 0']
												},
												f: [
													'We\'ll send you an e-mail to ', {
														t: 7,
														e: 'a',
														a: {
															href: [
																'mailto:', {
																	t: 2,
																	r: 'email'
																}
															]
														},
														f: [{
															t: 2,
															r: 'email'
														}]
													},
													' when there is a new version available.'
												]
											},
											' '
										]
									}
								]
							},
							' '
						]
					}]
				},
				' '
			]
		}, component = {};
		var modal = rvc_components_modal;
		component.exports = {
			'el': 'body',
			'append': true,
			'components': {
				'modal': modal
			},
			'computed': {
				'count': function() {
					return !!this.get('links.css').length + !! this.get('links.js').length + this.get('links.others').length;
				}
			},
			'data': {
				'app': {},
				'email': '',
				'id': 'modal-links',
				'links': {},
				'size': 'modal-lg',
				'subscribed': false
			},
			'init': function() {
				var _this = this;
				this.set('subscribe', function() {
					if (/^[^@]+@[^@]+\.[a-z]{2,}$/i.test(_this.get('email'))) {
						_this.set('subscribed', true);
					}
					return false;
				});
			}
		};
		if (typeof component.exports === 'object') {
			for (__prop__ in component.exports) {
				if (component.exports.hasOwnProperty(__prop__)) {
					__options__[__prop__] = component.exports[__prop__];
				}
			}
		}
		return Ractive.extend(__options__);
	}(ractive, rvc_components_modal);
	var build_links = function(collection) {
		// TODO complete refactoring
		var cssTemplate = '<link type="text/css" rel="stylesheet" href="//cdn.jsdelivr.net/{{href}}">';
		var jsTemplate = '<script type="text/javascript" src="//cdn.jsdelivr.net/{{src}}"></script>';
		var css = [];
		var js = [];
		var others = [];
		var isCss = /\.css$/i;
		var isJs = /\.js$/i;
		// one file
		if (collection.length === 1 && collection[0].selectedFiles.length === 1) {
			if (isCss.test(collection[0].selectedFiles[0])) {
				css = cssTemplate.replace('{{href}}', collection[0].name + '/' + collection[0].selectedVersion + '/' + collection[0].selectedFiles[0]);
			} else if (isJs.test(collection[0].selectedFiles[0])) {
				js = jsTemplate.replace('{{src}}', collection[0].name + '/' + collection[0].selectedVersion + '/' + collection[0].selectedFiles[0]);
			} else {
				others.push('//cdn.jsdelivr.net/' + collection[0].selectedFiles);
			}
		} else {
			// each project in collection
			for (var i = 0, c = collection.length; i < c; i++) {
				var cssFiles = [];
				var jsFiles = [];
				var otherFiles = [];
				// each file in project
				for (var j = 0, d = collection[i].selectedFiles.length; j < d; j++) {
					if (isCss.test(collection[i].selectedFiles[j])) {
						cssFiles.push(collection[i].selectedFiles[j]);
					} else if (isJs.test(collection[i].selectedFiles[j])) {
						jsFiles.push(collection[i].selectedFiles[j]);
					} else {
						otherFiles.push('//cdn.jsdelivr.net/' + collection[i].selectedFiles[j]);
					}
				}
				if (cssFiles.length === 1 && cssFiles[0] === collection[i].mainfile) {
					css.push(collection[i].name + '@' + collection[i].selectedVersion);
				} else if (cssFiles.length) {
					css.push(collection[i].name + '@' + collection[i].selectedVersion + '(' + cssFiles.join('+') + ')');
				}
				if (jsFiles.length === 1 && jsFiles[0] === collection[i].mainfile) {
					js.push(collection[i].name + '@' + collection[i].selectedVersion);
				} else if (jsFiles.length) {
					js.push(collection[i].name + '@' + collection[i].selectedVersion + '(' + jsFiles.join('+') + ')');
				}
				if (otherFiles.length) {
					others.push.apply(others, otherFiles);
				}
			}
			/*if(css.length === 1) {
        		css	= cssTemplate.replace('{{href}}', css[0]);
        	} else */
			/*if(css.length) {
        				css	= cssTemplate.replace('{{href}}', 'g/' + css.join(','));
        			}
        
        			/*if(js.length === 1) {
        				js	= jsTemplate.replace('{{src}}', js[0]);
        			} else */
			{
				js = jsTemplate.replace('{{src}}', 'g/' + js.join(','));
			}
		}
		return {
			'css': css,
			'js': js,
			'others': others
		};
	};
	var rvc_components_report_new_version = function(Ractive) {
		var __options__ = {
			template: [{
					t: 7,
					e: 'modal',
					a: {
						id: [{
							t: 2,
							r: 'id'
						}],
						title: [{
							t: 2,
							r: 'title'
						}, {
							t: 2,
							r: 'project.name'
						}],
						buttons: [{
							t: 2,
							r: 'buttons'
						}],
						submit: [{
							t: 2,
							r: 'submit'
						}]
					},
					f: [{
						t: 7,
						e: 'input',
						a: {
							type: ['text'],
							'class': ['form-control'],
							id: ['new-version-email'],
							placeholder: ['Please enter your e-mail address']
						}
					}]
				},
				' '
			]
		}, component = {};
		component.exports = {
			'el': 'body',
			'append': true,
			'components': {
				'modal': rvc_components_modal
			},
			'data': {
				'id': 'modal-report-new-version',
				'title': 'Report a new version of ',
				'project': {},
				'buttons': [{
					'label': 'cancel',
					'class': 'btn-default',
					'handler': 'cancel'
				}, {
					'label': 'select',
					'class': 'primary',
					'handler': 'submit'
				}],
				'submit': function() {}
			}
		};
		if (typeof component.exports === 'object') {
			for (__prop__ in component.exports) {
				if (component.exports.hasOwnProperty(__prop__)) {
					__options__[__prop__] = component.exports[__prop__];
				}
			}
		}
		return Ractive.extend(__options__);
	}(ractive, rvc_components_modal);
	var rvc_components_select_files = function(Ractive) {
		var __options__ = {
			template: [{
					t: 7,
					e: 'modal',
					a: {
						id: [{
							t: 2,
							r: 'id'
						}],
						title: [{
							t: 2,
							r: 'title'
						}],
						project: [{
							t: 2,
							r: 'project'
						}],
						buttons: [{
							t: 2,
							r: 'buttons'
						}],
						submit: [{
							t: 2,
							r: 'submit'
						}]
					},
					f: [{
						t: 7,
						e: 'ol',
						a: {
							id: ['file-list']
						},
						f: [{
							t: 4,
							r: 'files',
							i: 'i',
							f: [
								' ', {
									t: 7,
									e: 'li',
									f: [{
											t: 7,
											e: 'input',
											a: {
												type: ['checkbox'],
												'class': ['checkbox primary'],
												id: [
													'file', {
														t: 2,
														r: 'i'
													}
												],
												value: [{
													t: 2,
													r: '.'
												}],
												checked: [{
													t: 2,
													x: {
														r: [
															'.',
															'project.mainfile'
														],
														s: '${0}===${1}'
													}
												}]
											}
										},
										' ', {
											t: 7,
											e: 'label',
											a: {
												'for': [
													'file', {
														t: 2,
														r: 'i'
													}
												]
											},
											f: [{
												t: 2,
												r: '.'
											}]
										}
									]
								},
								' '
							]
						}]
					}]
				},
				' '
			]
		}, component = {};
		var modal = rvc_components_modal;
		component.exports = {
			'el': 'body',
			'append': true,
			'components': {
				'modal': modal
			},
			'data': {
				'callback': null,
				'id': 'modal-select-files',
				'title': 'Select files to include',
				'project': {},
				'buttons': [{
					'label': 'cancel',
					'class': 'btn-default',
					'handler': 'cancel'
				}, {
					'label': 'select',
					'class': 'primary',
					'handler': 'submit'
				}]
			},
			'init': function() {
				var _this = this;
				var selectedVersion = this.get('project').selectedVersion;
				this.set('files', this.get('project').assets.filter(function(asset) {
					return asset.version === selectedVersion;
				})[0].files);
				this.set('submit', function() {
					var files = Array.prototype.slice.call($('#' + _this.get('id')).find('input:checked')).map(function(element) {
						return element.value;
					});
					if (files.length && typeof this.get('callback') === 'function') {
						this.get('callback')($.extend($.extend(true, {}, _this.get('project')), {
							'selectedFiles': files
						}));
					}
				});
			}
		};
		if (typeof component.exports === 'object') {
			for (__prop__ in component.exports) {
				if (component.exports.hasOwnProperty(__prop__)) {
					__options__[__prop__] = component.exports[__prop__];
				}
			}
		}
		return Ractive.extend(__options__);
	}(ractive, rvc_components_modal);
	var rvc_components_version_list = function(Ractive) {
		var __options__ = {
			template: [{
				t: 4,
				r: 'project',
				f: [
					' ', {
						t: 7,
						e: 'ul',
						a: {
							'class': [
								'dropdown-menu ', {
									t: 2,
									r: 'class'
								}
							],
							role: ['menu']
						},
						f: [{
								t: 4,
								r: 'versions',
								i: 'j',
								f: [
									' ', {
										t: 4,
										x: {
											r: [
												'.',
												'selectedVersion'
											],
											s: '${0}!==${1}'
										},
										f: [
											' ', {
												t: 7,
												e: 'li',
												f: [{
													t: 7,
													e: 'a',
													a: {
														'class': ['link']
													},
													f: [{
														t: 2,
														r: '.'
													}],
													v: {
														click: {
															n: 'set',
															d: [
																'\'', {
																	t: 4,
																	r: 'i',
																	f: [
																		'projects.', {
																			t: 2,
																			r: 'i'
																		},
																		'.selectedVersion'
																	]
																}, {
																	t: 4,
																	r: 'i',
																	n: true,
																	f: 'projects.0.selectedVersion'
																},
																'\',', {
																	t: 2,
																	r: '.'
																}
															]
														}
													}
												}]
											},
											' '
										]
									},
									' '
								]
							},
							' ', {
								t: 4,
								x: {
									r: ['versions.length'],
									s: '${0}>1'
								},
								f: [{
									t: 7,
									e: 'li',
									a: {
										'class': ['divider']
									}
								}]
							},
							' ', {
								t: 7,
								e: 'li',
								f: [{
									t: 7,
									e: 'a',
									a: {
										'class': ['link']
									},
									f: ['Found newer version?'],
									v: {
										click: {
											n: 'reportNew',
											d: [{
												t: 2,
												kx: {
													r: 'projects',
													m: [{
														t: 30,
														n: 'i'
													}]
												}
											}]
										}
									}
								}]
							}
						]
					},
					' '
				]
			}]
		}, component = {};
		var ReportNewVersionView = rvc_components_report_new_version;
		var SelectFilesView = rvc_components_select_files;
		component.exports = {
			'data': {
				'class': '',
				'index': null,
				'project': {}
			},
			'init': function() {
				var _this = this;
				this.on({
					'reportNew': function(event, project) {
						new ReportNewVersionView({
							'data': {
								'project': project
							}
						});
					},
					'set': function(event, keypath, value) {
						_this.set(keypath, value);
						var project = this.get('project');
						var assets = project.assets.filter(function(assets) {
							return assets.version === project.selectedVersion;
						})[0];
						var x;
						// reselect files if some of them are not available in this version
						for (x in project.selectedFiles) {
							if (project.selectedFiles.hasOwnProperty(x)) {
								if (assets.files.indexOf(project.selectedFiles[x]) === -1) {
									_this.get('app').views.collection.get('projects').splice(_this.get('index'), 1);
									new SelectFilesView({
										'data': {
											'app': this.get('app'),
											'project': project,
											'callback': function(project) {
												_this.get('app').views.collection.get('projects').push(project);
											}
										}
									});
									break;
								}
							}
						}
					}
				});
			}
		};
		if (typeof component.exports === 'object') {
			for (__prop__ in component.exports) {
				if (component.exports.hasOwnProperty(__prop__)) {
					__options__[__prop__] = component.exports[__prop__];
				}
			}
		}
		return Ractive.extend(__options__);
	}(ractive, rvc_components_report_new_version, rvc_components_select_files);
	var rvc_components_collection = function(Ractive) {
		var __options__ = {
			template: [{
				t: 4,
				r: 'projects.length',
				f: [
					' ', {
						t: 7,
						e: 'header',
						f: [{
							t: 7,
							e: 'h2',
							f: ['My collection']
						}]
					},
					' ', {
						t: 7,
						e: 'div',
						a: {
							'class': ['row']
						},
						f: [{
							t: 7,
							e: 'div',
							a: {
								'class': ['col-md-6 col-md-offset-3']
							},
							f: [{
								t: 4,
								r: 'projects',
								i: 'i',
								f: [
									' ', {
										t: 7,
										e: 'div',
										a: {
											'class': ['row item']
										},
										f: [{
											t: 7,
											e: 'div',
											a: {
												'class': ['col-sm-12'],
												style: ['line-height: 34px']
											},
											f: [{
													t: 7,
													e: 'a',
													a: {
														href: [{
															t: 2,
															r: 'homepage'
														}]
													},
													f: [{
														t: 2,
														r: 'name'
													}]
												},
												' ', {
													t: 7,
													e: 'small',
													a: {
														'class': ['btn-group']
													},
													f: [
														'(', {
															t: 7,
															e: 'a',
															a: {
																'class': ['link'],
																'data-toggle': ['dropdown']
															},
															f: [{
																t: 2,
																r: 'selectedVersion'
															}]
														},
														') ', {
															t: 7,
															e: 'versionList',
															a: {
																project: [{
																	t: 2,
																	r: '.'
																}],
																index: [{
																	t: 2,
																	r: 'i'
																}],
																'class': ['pull-right']
															}
														}
													]
												},
												' ', {
													t: 7,
													e: 'a',
													a: {
														'class': ['btn pull-right primary btn-link btn-inverse']
													},
													f: ['Remove'],
													v: {
														click: {
															n: 'remove',
															d: [{
																t: 2,
																r: 'i'
															}]
														}
													}
												}
											]
										}]
									},
									' '
								]
							}]
						}]
					},
					' ', {
						t: 7,
						e: 'div',
						a: {
							'class': ['row']
						},
						f: [{
							t: 7,
							e: 'div',
							a: {
								'class': ['col-md-12'],
								style: ['text-align: center']
							},
							f: [{
								t: 7,
								e: 'button',
								a: {
									'class': ['btn primary btn-inverse']
								},
								f: ['Use my collection'],
								v: {
									click: 'use'
								}
							}]
						}]
					},
					' '
				]
			}]
		}, component = {};
		var LinksView = rvc_components_links;
		var linkBuilder = build_links;
		var versionList = rvc_components_version_list;
		component.exports = {
			'components': {
				'versionList': versionList
			},
			'data': {
				'app': {},
				'projects': []
			},
			'init': function() {
				var _this = this;
				this.on({
					'remove': function(event, index) {
						_this.get('projects').splice(index, 1);
					},
					'use': function() {
						new LinksView({
							'data': {
								'app': _this.get('app'),
								'links': linkBuilder(_this.get('projects'))
							}
						});
					}
				});
			}
		};
		if (typeof component.exports === 'object') {
			for (__prop__ in component.exports) {
				if (component.exports.hasOwnProperty(__prop__)) {
					__options__[__prop__] = component.exports[__prop__];
				}
			}
		}
		return Ractive.extend(__options__);
	}(ractive, rvc_components_links, build_links, rvc_components_version_list);
	var rvc_components_search_input = function(Ractive) {
		var __options__ = {
			template: [{
					t: 7,
					e: 'input',
					a: {
						type: ['text'],
						id: ['search-input'],
						'class': ['form-control input-lg'],
						placeholder: [
							'Search in more than ', {
								t: 2,
								r: 'count'
							},
							' open source projects'
						]
					}
				},
				' ', {
					t: 7,
					e: 'p',
					a: {
						style: ['text-align: center']
					},
					f: [{
						t: 7,
						e: 'a',
						a: {
							'class': ['link']
						},
						f: ['Browse all projects']
					}]
				},
				' '
			]
		}, component = {};
		component.exports = {
			'computed': {
				'count': function() {
					// TODO-LATER
					return Math.floor(JSON.parse(window.localStorage.getItem('__//api.jsdelivr.com/v1/jsdelivr/libraries__data')).datums.length / 50) * 50;
				}
			},
			'complete': function() {
				var app = this.get('app');
				var $searchInput = $('#search-input');
				var bloodhound = new Bloodhound({
					'datumTokenizer': function(project) {
						return project.name.split(/[\s.-]+/g);
					},
					'limit': 10,
					'prefetch': {
						'url': '//api.jsdelivr.com/v1/jsdelivr/libraries',
						'ttl': 3600000
					},
					'queryTokenizer': function(query) {
						return query.split(/[\s.-]+/g);
					}
				});
				bloodhound.initialize();
				// update results on input
				$searchInput.focus().on('input', function() {
					bloodhound.get($searchInput.val(), function(list) {
						// select the last version of the project by default
						app.views.searchResults.set('projects', list.map(function(project) {
							project.selectedVersion = project.lastversion;
							return project;
						}));
					});
				});
			}
		};
		if (typeof component.exports === 'object') {
			for (__prop__ in component.exports) {
				if (component.exports.hasOwnProperty(__prop__)) {
					__options__[__prop__] = component.exports[__prop__];
				}
			}
		}
		return Ractive.extend(__options__);
	}(ractive);
	var download = function(url) {
		var $iframe = $('#download-helper');
		if (!$iframe.length) {
			$iframe = $('<iframe id="download-helper" style="display: none"></iframe>').appendTo('body');
		}
		$iframe.attr('src', url);
	};
	var list_files = function(project) {
		var files = project.assets.filter(function(assets) {
			return assets.version === project.selectedVersion;
		})[0].files;
		// main file, min.* files, everything else
		return files.sort(function(a, b) {
			if (a === project.mainfile) {
				return -1;
			}
			if (b === project.mainfile) {
				return 1;
			}
			if (/[._-]min./i.test(a)) {
				if (/[._-]min./i.test(b)) {
					return a > b || -1;
				}
				return -1;
			}
			if (/[._-]min./i.test(b)) {
				return 1;
			}
			return a > b || -1;
		});
	};
	var rvc_components_search_results = function(Ractive) {
		var __options__ = {
			template: [{
				t: 4,
				r: 'projects',
				i: 'i',
				f: [
					' ', {
						t: 7,
						e: 'div',
						a: {
							'class': ['result item']
						},
						f: [{
								t: 7,
								e: 'div',
								a: {
									'class': ['row']
								},
								f: [{
										t: 7,
										e: 'div',
										a: {
											'class': ['col-md-6']
										},
										f: [{
												t: 7,
												e: 'h4',
												f: [{
														t: 7,
														e: 'a',
														a: {
															href: [{
																t: 2,
																r: 'homepage'
															}],
															target: ['_blank']
														},
														f: [{
															t: 2,
															r: 'name'
														}]
													},
													' ', {
														t: 7,
														e: 'small',
														a: {
															'class': ['btn-group']
														},
														f: [
															'(', {
																t: 7,
																e: 'a',
																a: {
																	'class': ['link'],
																	'data-toggle': ['dropdown']
																},
																f: [{
																	t: 2,
																	r: 'selectedVersion'
																}]
															},
															') ', {
																t: 7,
																e: 'versionList',
																a: {
																	project: [{
																		t: 2,
																		r: '.'
																	}]
																}
															}
														]
													}
												]
											},
											' ', {
												t: 7,
												e: 'small',
												f: [
													'by ', {
														t: 7,
														e: 'a',
														a: {
															href: []
														},
														f: [{
															t: 2,
															r: 'author'
														}]
													}
												]
											}
										]
									},
									' ', {
										t: 7,
										e: 'div',
										a: {
											'class': ['col-md-6 buttons']
										},
										f: [{
												t: 7,
												e: 'button',
												a: {
													'class': ['btn btn-link btn-inverse gray']
												},
												f: [{
													t: 7,
													e: 'i',
													a: {
														'class': ['fa fa-check fa-2x']
													}
												}],
												v: {
													click: {
														n: 'add',
														d: [{
															t: 2,
															r: '.'
														}]
													}
												}
											},
											' ', {
												t: 7,
												e: 'button',
												a: {
													'class': ['btn btn-link btn-inverse gray']
												},
												f: [{
													t: 7,
													e: 'i',
													a: {
														'class': ['fa fa-download fa-2x']
													}
												}],
												v: {
													click: {
														n: 'download',
														d: [{
															t: 2,
															r: '.'
														}]
													}
												}
											},
											' ', {
												t: 7,
												e: 'a',
												a: {
													'class': ['btn btn-link btn-inverse gray'],
													href: [{
														t: 2,
														r: 'homepage'
													}],
													target: ['_blank']
												},
												f: [{
													t: 7,
													e: 'i',
													a: {
														'class': ['fa fa-home fa-2x']
													}
												}]
											},
											' ', {
												t: 4,
												r: 'github',
												f: [{
													t: 7,
													e: 'a',
													a: {
														'class': ['btn btn-link btn-inverse gray'],
														href: [{
															t: 2,
															r: 'github'
														}],
														target: ['_blank']
													},
													f: [{
														t: 7,
														e: 'i',
														a: {
															'class': ['fa fa-github fa-2x']
														}
													}]
												}]
											}
										]
									}
								]
							},
							' ', {
								t: 7,
								e: 'div',
								a: {
									'class': ['row']
								},
								f: [{
										t: 7,
										e: 'div',
										a: {
											'class': ['col-md-12']
										},
										f: [{
											t: 7,
											e: 'p',
											f: [{
												t: 2,
												r: 'description'
											}]
										}]
									},
									' ', {
										t: 7,
										e: 'div',
										a: {
											'class': ['file-list']
										},
										f: [{
											t: 4,
											x: {
												r: [
													'listFiles',
													'.'
												],
												s: '{files:${0}(${1})}'
											},
											f: [
												' ', {
													t: 7,
													e: 'div',
													a: {
														'class': ['col-md-12']
													},
													f: [{
														t: 7,
														e: 'input',
														a: {
															type: ['text'],
															'class': ['form-control output'],
															value: [{
																	t: 2,
																	r: 'app.cdnRoot'
																},
																'/', {
																	t: 2,
																	r: 'name'
																},
																'/', {
																	t: 2,
																	r: 'selectedVersion'
																},
																'/', {
																	t: 2,
																	r: 'files.0'
																}
															],
															readonly: null
														}
													}]
												},
												' ', {
													t: 4,
													x: {
														r: ['files.length'],
														s: '${0}>1'
													},
													f: [
														' ', {
															t: 7,
															e: 'div',
															a: {
																'class': ['show-more-files'],
																'data-project-id': [{
																	t: 2,
																	r: 'i'
																}]
															},
															f: [{
																t: 4,
																r: 'files',
																i: 'j',
																f: [
																	' ', {
																		t: 4,
																		x: {
																			r: ['j'],
																			s: '${0}>0'
																		},
																		f: [
																			' ', {
																				t: 7,
																				e: 'div',
																				a: {
																					'class': ['col-md-12']
																				},
																				f: [{
																					t: 7,
																					e: 'input',
																					a: {
																						type: ['text'],
																						'class': ['form-control output'],
																						value: [{
																								t: 2,
																								r: 'app.cdnRoot'
																							},
																							'/', {
																								t: 2,
																								r: 'name'
																							},
																							'/', {
																								t: 2,
																								r: 'selectedVersion'
																							},
																							'/', {
																								t: 2,
																								r: '.'
																							}
																						],
																						readonly: null
																					}
																				}]
																			},
																			' '
																		]
																	},
																	' '
																]
															}]
														},
														' ', {
															t: 7,
															e: 'div',
															a: {
																'class': ['col-md-12']
															},
															f: [{
																t: 7,
																e: 'button',
																a: {
																	'class': ['btn btn-link btn-inverse gray']
																},
																f: [{
																	t: 7,
																	e: 'i',
																	a: {
																		'class': [
																			'fa ', {
																				t: 2,
																				x: {
																					r: ['showAll'],
																					s: '${0}?"fa-angle-double-up":"fa-angle-double-down"'
																				}
																			}
																		]
																	}
																}],
																v: {
																	click: 'toggle'
																}
															}]
														},
														' '
													]
												},
												' '
											]
										}]
									}
								]
							}
						]
					},
					' '
				]
			}]
		}, component = {};
		var downloadHelper = download;
		var listFiles = list_files;
		var SelectFilesView = rvc_components_select_files;
		var versionList = rvc_components_version_list;
		component.exports = {
			'components': {
				'versionList': versionList
			},
			'data': {
				'app': {},
				'listFiles': listFiles,
				'projects': []
			},
			'init': function() {
				var _this = this;
				this.on({
					'add': function(event, project) {
						new SelectFilesView({
							'data': {
								'app': this.get('app'),
								'project': project,
								'callback': function(project) {
									_this.get('app').views.collection.get('projects').push(project);
								}
							}
						});
					},
					'download': function(event, project) {
						downloadHelper('//cdn.jsdelivr.net/' + project.name + '/' + project.selectedVersion + '/' + project.zip);
					},
					'toggle': function(event) {
						var $body = $('body');
						var $link = $(event.node);
						var $moreFiles = $link.closest('.file-list').find('.show-more-files');
						var keypath = 'projects.' + $moreFiles.attr('data-project-id') + '.showAll';
						$moreFiles.slideToggle(200, function() {
							if ($link.offset().top < $body.scrollTop()) {
								$('body').animate({
									'scrollTop': $link.closest('.item').offset().top - 10
								});
							}
							_this.set(keypath, !_this.get(keypath));
						});
					}
				});
			}
		};
		if (typeof component.exports === 'object') {
			for (__prop__ in component.exports) {
				if (component.exports.hasOwnProperty(__prop__)) {
					__options__[__prop__] = component.exports[__prop__];
				}
			}
		}
		return Ractive.extend(__options__);
	}(ractive, download, list_files, rvc_components_select_files, rvc_components_version_list);
	var app = function(CollectionView, LinksView, Modal, ReportNewVersionView, SearchInputView, SearchResultsView, SelectFilesView, versionList) {
		// we'll need these later
		var $body = $('body');
		var $document = $(document);
		var $searchInput = $('#search-input');
		var app = {
			'cdnRoot': '//cdn.jsdelivr.net',
			'components': {
				'CollectionView': CollectionView,
				'LinksView': LinksView,
				'Modal': Modal,
				'ReportNewVersionView': ReportNewVersionView,
				'SearchInputView': SearchInputView,
				'SearchResultsView': SearchResultsView,
				'SelectFilesView': SelectFilesView,
				'versionList': versionList
			},
			'views': {}
		};
		app.views.collection = new CollectionView({
			'el': '#my-collection',
			'data': {
				'app': app,
				'projects': []
			},
			'twoway': false
		});
		app.views.searchInput = new SearchInputView({
			'el': '#search',
			'data': {
				'app': app
			},
			'twoway': false
		});
		app.views.searchResults = new SearchResultsView({
			'el': '#search-results',
			'data': {
				'app': app,
				'projects': []
			},
			'twoway': false
		});
		// focus search form on CTRL + F
		$document.keydown(function(e) {
			return e.ctrlKey && e.which === 70 ? !$searchInput.focus() : true;
		});
		// auto-select input content
		$body.on('click', '.output', function() {
			this.select();
		});
		// we don't have require.js in production
		window.app = app;
		return app;
	}(rvc_components_collection, rvc_components_links, rvc_components_modal, rvc_components_report_new_version, rvc_components_search_input, rvc_components_search_results, rvc_components_select_files, rvc_components_version_list);
})(window);
