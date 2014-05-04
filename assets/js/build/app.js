(function(global) {
	var ractive = global.Ractive;
	var build_links = function(collection, group) {
		var isCss = /\.css$/i;
		var isJs = /\.js$/i;
		var css = [];
		var js = [];
		var others = [];
		var cssCount = 0;
		var jsCount = 0;
		// count CSS and JS files and process other files
		for (var i = collection.length - 1; i >= 0; i--) {
			for (var j = collection[i].selectedFiles.length - 1; j >= 0; j--) {
				if (isCss.test(collection[i].selectedFiles[j])) {
					cssCount++;
					css.unshift(collection[i].name + '/' + collection[i].selectedVersion + '/' + collection[i].selectedFiles[j]);
				} else if (isJs.test(collection[i].selectedFiles[j])) {
					jsCount++;
					js.unshift(collection[i].name + '/' + collection[i].selectedVersion + '/' + collection[i].selectedFiles[j]);
				} else {
					// no further processing needed
					others.unshift(collection[i].name + '/' + collection[i].selectedVersion + '/' + collection[i].selectedFiles[j]);
				}
			}
		}
		if (!group) {
			return {
				'css': css,
				'js': js,
				'others': others
			};
		}

		function buildLink(projects, filter, merge) {
			var chunks = [];
			// each project
			for (var i = 0, c = projects.length; i < c; i++) {
				var projectFiles = [];
				// each file
				for (var j = 0, d = projects[i].selectedFiles.length; j < d; j++) {
					if (filter.test(projects[i].selectedFiles[j])) {
						// there is ony one file of this type
						if (!merge) {
							return [projects[i].name + '/' + projects[i].selectedVersion + '/' + projects[i].selectedFiles[j]];
						}
						projectFiles.push(projects[i].selectedFiles[j]);
					}
				}
				if (projectFiles.length) {
					var temp = projects[i].name + '@' + projects[i].selectedVersion;
					// no need to create a list of files if there is only the mainfile
					if (projectFiles.length !== 1 || projectFiles[0] !== projects[i].mainfile) {
						temp += '(' + projectFiles.join('+') + ')';
					}
					chunks.push(temp);
				}
			}
			return chunks.length ? ['g/' + chunks.join(',')] : [];
		}
		return {
			'css': buildLink(collection, isCss, cssCount > 1),
			'js': buildLink(collection, isJs, jsCount > 1),
			'others': others
		};
	};
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
				$('#' + this.get('id')).modal().on('hidden.bs.modal', function() {
					$(this).remove();
					_this.teardown();
				});
				this.on({
					'cancel': function() {
						if (_this.get('cancel').call(_this) !== false) {
							$('#' + _this.get('id')).modal('hide');
						}
					},
					'submit': function() {
						if (_this.get('submit').call(_this) !== false) {
							$('#' + _this.get('id')).modal('hide');
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
						title: [{
							t: 2,
							r: 'title'
						}],
						size: [{
							t: 2,
							r: 'size'
						}],
						collection: [{
							t: 2,
							r: 'collection'
						}],
						submit: [{
							t: 2,
							r: 'subscribe'
						}],
						email: [{
							t: 2,
							r: 'email'
						}],
						showSwitch: [{
							t: 2,
							r: 'showSwitch'
						}]
					},
					f: [{
						t: 4,
						r: 'links',
						f: [
							' ', {
								t: 4,
								r: 'showSwitch',
								f: [
									' ', {
										t: 7,
										e: 'div',
										a: {
											'class': ['row'],
											style: ['padding: 0 5px']
										},
										f: [{
												t: 7,
												e: 'div',
												a: {
													'class': ['col-xs-2 col-xs-offset-9'],
													style: ['text-align: right']
												},
												f: ['Group links']
											},
											' ', {
												t: 7,
												e: 'div',
												a: {
													'class': ['col-sm-1']
												},
												f: [{
														t: 7,
														e: 'input',
														a: {
															type: ['checkbox'],
															'class': ['switch-inline'],
															id: ['group-links'],
															checked: [{
																t: 2,
																r: 'groupLinks'
															}],
															value: ['1']
														}
													},
													' ', {
														t: 7,
														e: 'label',
														a: {
															'for': ['group-links']
														}
													}
												]
											}
										]
									},
									' '
								]
							},
							' ', {
								t: 7,
								e: 'ul',
								a: {
									id: ['link-list'],
									'class': ['list-style-none']
								},
								f: [{
										t: 4,
										r: 'js.length',
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
												t: 4,
												r: 'js',
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
																		r: 'app.cdnRoot'
																	},
																	'/', {
																		t: 2,
																		r: '.'
																	}
																]
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
										r: 'css.length',
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
												t: 4,
												r: 'css',
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
																		r: 'app.cdnRoot'
																	},
																	'/', {
																		t: 2,
																		r: '.'
																	}
																]
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
																		r: 'app.cdnRoot'
																	},
																	'/', {
																		t: 2,
																		r: '.'
																	}
																]
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
									'class': ['email-updates']
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
		var linkBuilder = build_links;
		var modal = rvc_components_modal;
		component.exports = {
			'el': 'body',
			'append': true,
			'components': {
				'modal': modal
			},
			'computed': {
				'showSwitch': function() {
					var links = linkBuilder(this.get('collection'), false);
					return links.css.length > 1 || links.js.length > 1;
				},
				'links': function() {
					return linkBuilder(this.get('collection'), this.get('groupLinks'));
				},
				'title': function() {
					return 'Your link' + (this.get('links.css').length + this.get('links.js').length + this.get('links.others').length > 1 ? 's' : '');
				}
			},
			'data': {
				'app': {},
				'collection': {},
				'email': '',
				'groupLinks': true,
				'id': 'modal-links',
				'linkBuilder': linkBuilder,
				'size': 'modal-lg',
				'subscribed': false,
				'subscribe': function() {
					if (/^[^@]+@[^@]+\.[a-z]{2,}$/i.test(this.get('email'))) {
						this.set('subscribed', true);
					}
					return false;
				}
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
	}(ractive, build_links, rvc_components_modal);
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
							id: ['file-list'],
							'class': ['list-style-none']
						},
						f: [{
							t: 4,
							i: 'i',
							x: {
								r: [
									'listFiles',
									'project'
								],
								s: '${0}(${1})'
							},
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
		var listFiles = list_files;
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
				'listFiles': listFiles,
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
				}],
				'submit': function() {
					var files = Array.prototype.slice.call($('#' + this.get('id')).find('input:checked')).map(function(element) {
						return element.value;
					});
					if (files.length && typeof this.get('callback') === 'function') {
						this.get('callback')($.extend($.extend(true, {}, this.get('project')), {
							'selectedFiles': files
						}));
					}
				}
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
	}(ractive, list_files, rvc_components_modal);
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
															d: [{
																	t: 2,
																	x: {
																		r: ['i'],
																		s: '"projects."+${0}+".selectedVersion"'
																	}
																},
																',', {
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
						// reselect files if some of them are not available in this version
						for (var x in project.selectedFiles) {
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
											'class': ['row list-item']
										},
										f: [{
											t: 7,
											e: 'div',
											a: {
												'class': ['col-sm-12 collection-item']
											},
											f: [{
													t: 2,
													r: 'name'
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
								'class': ['col-xs-12'],
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
								'collection': _this.get('projects')
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
	}(ractive, rvc_components_links, rvc_components_version_list);
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
						],
						value: [{
							t: 2,
							r: 'query'
						}]
					}
				},
				' ', {
					t: 7,
					e: 'p',
					a: {
						'class': ['show-more']
					},
					f: [{
						t: 7,
						e: 'a',
						a: {
							href: ['#!{"query":"*"}']
						},
						f: ['Browse all projects']
					}]
				},
				' '
			]
		}, component = {};
		component.exports = {
			'data': {
				'count': 1050,
				'query': ''
			},
			'complete': function() {
				var _this = this;
				var app = this.get('app');
				var algolia = new AlgoliaSearch('DBMBXHNL8O', 'ff534b434664d2fb939eace2877ec4dc');
				var index = algolia.initIndex('jsdelivr');
				var propsRegExp = /\s*(?:[a-z]+)\s*:\s*(?:.(?![a-z]*\s*:))*/gi;
				var queryRegExp = /^((?:(?:[^\s:]+(?![a-z]*\s*:))\s*)*)/i;
				// count projects
				if (window.localStorage) {
					var now = Date.now();
					var count = localStorage.getItem('count');
					var expires = localStorage.getItem('expires');
					if (now < expires) {
						this.set('count', count);
					} else {
						index.search('', function(success, response) {
							count = Math.floor(response.nbHits / 50) * 50;
							localStorage.setItem('count', count);
							localStorage.setItem('expires', now + 604800000);
							_this.set('count', count);
						}, {
							'analytics': false
						});
					}
				} else {
					index.search('', function(success, response) {
						_this.set('count', Math.floor(response.nbHits / 50) * 50);
					}, {
						'analytics': false
					});
				}
				// update results on input
				this.observe('query', function(newValue) {
					newValue = newValue.toString();
					var query = newValue.match(queryRegExp)[0].trim();
					var substr = newValue.substr(query.length);
					var props = {};
					var match;
					while ((match = propsRegExp.exec(substr)) !== null) {
						var temp = match[0].split(':');
						props[temp[0].trim()] = temp[1].trim();
					}
					if (!newValue) {
						app.views.searchResults.set('projects', []);
					} else {
						index.search(query, function(success, response) {
							// select the last version of the project by default
							for (var i = 0, c = response.hits.length; i < c; i++) {
								response.hits[i].selectedVersion = response.hits[i].lastversion;
							}
							app.views.searchResults.set('projects', response.hits);
						}, {
							'hitsPerPage': 10
						});
					}
				}, {
					'init': false
				});
				// auto focus on load
				$('#search-input').focus();
				// restore query from hash
				$(window).triggerHandler('searchReady');
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
	var decorators_tooltip = function(node, title, placement, trigger, container) {
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
	var decorators_helpers = {
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
	var decorators_zero_clipboard = function(helpers) {
		return helpers.create(function(node) {
			var $bridge = $('#global-zeroclipboard-html-bridge');
			var $node = $(node);
			var clip = new ZeroClipboard(node);
			var ractive = this;
			clip.on('mouseover', function() {
				$bridge.tooltip('destroy').tooltip({
					'title': 'Copy to clipboard',
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
	}(decorators_helpers);
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
							'class': ['result list-item']
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
															href: [
																'#!{"query":"', {
																	t: 2,
																	r: 'name'
																},
																'"}'
															]
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
															href: [
																'#!{"query":"author: ', {
																	t: 2,
																	r: 'author'
																},
																'"}'
															]
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
												},
												o: {
													n: 'tooltip',
													a: ' Add to collection'
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
												},
												o: {
													n: 'tooltip',
													a: ' Download ZIP'
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
												}],
												o: {
													n: 'tooltip',
													a: ' Homepage'
												}
											},
											' ', {
												t: 7,
												e: 'a',
												a: {
													'class': ['btn btn-link btn-inverse gray'],
													style: [{
														t: 4,
														r: 'github',
														n: true,
														f: ['visibility: hidden']
													}],
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
												}],
												o: {
													n: 'tooltip',
													a: ' GitHub'
												}
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
											'class': ['col-xs-12']
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
														'class': [
															'col-xs-', {
																t: 4,
																r: 'flash',
																f: ['11']
															}, {
																t: 4,
																r: 'flash',
																n: true,
																f: ['12']
															}
														],
														style: ['padding-right: 0']
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
															]
														}
													}]
												},
												' ', {
													t: 4,
													r: 'flash',
													f: [
														' ', {
															t: 7,
															e: 'div',
															a: {
																'class': ['col-xs-1'],
																style: ['padding-right: 0']
															},
															f: [{
																t: 7,
																e: 'button',
																a: {
																	'class': ['btn btn-link btn-inverse gray'],
																	'data-clipboard-text': [{
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
																	]
																},
																f: [{
																	t: 7,
																	e: 'i',
																	a: {
																		'class': ['fa fa-chain']
																	}
																}],
																o: 'zeroClipboard'
															}]
														},
														' '
													]
												},
												' ', {
													t: 4,
													x: {
														r: ['files.length'],
														s: '${0}>1'
													},
													f: [
														' ', {
															t: 4,
															r: 'insert',
															f: [
																' ', {
																	t: 7,
																	e: 'div',
																	a: {
																		'class': ['more-files'],
																		style: [
																			'display: ', {
																				t: 2,
																				x: {
																					r: ['showAll'],
																					s: '${0}?"block":"none"'
																				}
																			}
																		]
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
																							'class': [
																								'col-xs-', {
																									t: 4,
																									r: 'flash',
																									f: ['11']
																								}, {
																									t: 4,
																									r: 'flash',
																									n: true,
																									f: ['12']
																								}
																							],
																							style: ['padding-right: 0']
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
																								]
																							}
																						}]
																					},
																					' ', {
																						t: 4,
																						r: 'flash',
																						f: [
																							' ', {
																								t: 7,
																								e: 'div',
																								a: {
																									'class': ['col-xs-1'],
																									style: ['padding-right: 0']
																								},
																								f: [{
																									t: 7,
																									e: 'button',
																									a: {
																										'class': ['btn btn-link btn-inverse gray'],
																										'data-clipboard-text': [{
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
																										]
																									},
																									f: [{
																										t: 7,
																										e: 'i',
																										a: {
																											'class': ['fa fa-chain']
																										}
																									}],
																									o: 'zeroClipboard'
																								}]
																							},
																							' '
																						]
																					},
																					' '
																				]
																			},
																			' '
																		]
																	}]
																},
																' '
															]
														},
														' ', {
															t: 7,
															e: 'div',
															a: {
																'class': ['col-xs-12']
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
																	click: {
																		n: 'toggle',
																		d: [{
																			t: 2,
																			r: 'i'
																		}]
																	}
																},
																o: {
																	n: 'tooltip',
																	d: [
																		' ', {
																			t: 2,
																			x: {
																				r: ['showAll'],
																				s: '${0}?"Show only main file":"Show all files"'
																			}
																		}
																	]
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
		var tooltipDecorator = decorators_tooltip;
		var versionList = rvc_components_version_list;
		var zeroClipboardDecorator = decorators_zero_clipboard;
		component.exports = {
			'components': {
				'versionList': versionList
			},
			'data': {
				'app': {},
				'flash': true,
				'listFiles': listFiles,
				'projects': []
			},
			'decorators': {
				'tooltip': tooltipDecorator,
				'zeroClipboard': zeroClipboardDecorator
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
					'toggle': function(event, i) {
						this.set('projects.' + i + '.insert', true);
						var $body = $('body');
						var $link = $(event.node);
						var $moreFiles = $link.closest('.file-list').find('.more-files');
						var keypath = 'projects.' + i + '.showAll';
						$moreFiles.slideToggle(200, function() {
							if ($link.offset().top < $body.scrollTop()) {
								$('body').animate({
									'scrollTop': $link.closest('.list-item').offset().top - 10
								});
							}
							_this.set(keypath, !_this.get(keypath));
						});
					}
				});
				this.observe('projects', function(n) {
					if (n.length === 1 && typeof n[0].showAll === 'undefined') {
						_this.set('projects.0.showAll', true);
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
	}(ractive, download, list_files, rvc_components_select_files, decorators_tooltip, rvc_components_version_list, decorators_zero_clipboard);
	var serialize = function(query, collection) {
		var result = {
			'query': query,
			'collection': []
		};
		for (var i = 0, c = collection.length; i < c; i++) {
			result.collection.push({
				'name': collection[i].name,
				'selectedVersion': collection[i].selectedVersion,
				'selectedFiles': collection[i].selectedFiles
			});
		}
		// don't include empty values
		if (result.query || result.collection.length) {
			result.query = result.query || undefined;
			if (!result.collection.length) {
				result.collection = undefined;
			}
			return JSON.stringify(result);
		}
		return '';
	};
	var unserialize = function(string) {
		try {
			return JSON.parse(string);
		} catch (e) {
			return false;
		}
	};
	var app = function(CollectionView, LinksView, Modal, ReportNewVersionView, SearchInputView, SearchResultsView, SelectFilesView, versionList, serialize, unserialize) {
		var $body = $('body');
		var $carousel = $('#carousel');
		var $window = $(window);
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
			}
		});
		app.views.searchResults = new SearchResultsView({
			'el': '#search-results',
			'data': {
				'app': app,
				'projects': []
			},
			'twoway': false
		});
		// restore collection and query from hash
		$window.on('hashchange searchReady', function() {
			// might be encoded on iOS (#11)
			var hash = decodeURIComponent(location.hash).substr(2);
			// redirect from the old format
			if (hash && hash[0] !== '{') {
				hash = JSON.stringify({
					'query': hash
				});
			}
			// only if there is a difference between hash and the current data
			if (hash !== serialize(app.views.searchInput.get('query'), app.views.collection.get('projects'))) {
				var data = unserialize(hash);
				if (data) {
					app.views.searchInput.set('query', data.query || '');
					app.views.collection.set('projects', data.collection || []);
				}
			}
		});
		// update permalink on change
		function observer() {
			var serialized = serialize(app.views.searchInput.get('query'), app.views.collection.get('projects'));
			if (serialized) {
				location.hash = '!' + serialized;
			} else {
				location.hash = '';
				// get rid of the '#' if we don't need it
				if (window.history && window.history.replaceState) {
					history.replaceState({}, document.title, location.pathname + location.search);
				}
			}
		}
		app.views.searchInput.observe('query', observer, {
			'init': false
		});
		app.views.collection.observe('projects', observer, {
			'init': false
		});
		// configure ZeroClipboard
		ZeroClipboard.config({
			'moviePath': '//cdn.jsdelivr.net/zeroclipboard/1.3.3/ZeroClipboard.swf'
		});
		// carousel
		$window.on('resize now.carousel', function() {
			$carousel.removeClass('slide').carousel(0).css({
				'minHeight': false
			}).css({
				'minHeight': $carousel.outerHeight()
			}).addClass('slide');
		}).triggerHandler('now.carousel');
		// auto-select input content
		$body.on('click', '.output', function() {
			this.select();
		});
		// we don't have require.js in production
		window.app = app;
		return app;
	}(rvc_components_collection, rvc_components_links, rvc_components_modal, rvc_components_report_new_version, rvc_components_search_input, rvc_components_search_results, rvc_components_select_files, rvc_components_version_list, serialize, unserialize);
})(window);
