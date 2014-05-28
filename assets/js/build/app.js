(function(global) {
	var ractive = global.Ractive;
	var amd_build_links = function(collection, group) {
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
	var amd_rvc_components_modal = function(Ractive) {
		var __options__ = {
			template: [{
					t: 7,
					e: 'div',
					a: {
						'class': 'modal fade',
						role: 'dialog',
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
								'class': 'modal-content'
							},
							f: [{
									t: 7,
									e: 'div',
									a: {
										'class': 'modal-header'
									},
									f: [{
											t: 7,
											e: 'button',
											a: {
												type: 'button',
												'class': 'close',
												'data-dismiss': 'modal',
												'aria-hidden': 'true'
											},
											f: ['\xD7']
										},
										' ', {
											t: 7,
											e: 'h4',
											a: {
												'class': 'modal-title'
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
										'class': 'modal-body'
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
										'class': 'modal-footer'
									},
									f: [{
											t: 3,
											r: 'footer'
										},
										' ', {
											t: 4,
											r: 'buttons',
											i: 'i',
											f: [{
												t: 7,
												e: 'button',
												a: {
													type: 'button',
													'class': [
														'btn ', {
															t: 2,
															r: 'class'
														}
													]
												},
												v: {
													click: {
														n: [{
															t: 2,
															r: 'handler'
														}],
														d: []
													}
												},
												f: [{
													t: 2,
													r: 'label'
												}]
											}]
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
	var amd_rvc_components_links = function(Ractive) {
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
						f: [{
								t: 4,
								r: 'showSwitch',
								f: [{
									t: 7,
									e: 'div',
									a: {
										'class': 'row',
										style: 'padding: 0 5px'
									},
									f: [{
											t: 7,
											e: 'div',
											a: {
												'class': 'col-xs-2 col-xs-offset-9',
												style: 'text-align: right'
											},
											f: ['Group links']
										},
										' ', {
											t: 7,
											e: 'div',
											a: {
												'class': 'col-sm-1'
											},
											f: [{
													t: 7,
													e: 'input',
													a: {
														type: 'checkbox',
														'class': 'switch-inline',
														id: 'group-links',
														checked: [{
															t: 2,
															r: 'groupLinks'
														}],
														value: '1'
													}
												},
												' ', {
													t: 7,
													e: 'label',
													a: {
														'for': 'group-links'
													}
												}
											]
										}
									]
								}]
							},
							' ', {
								t: 7,
								e: 'ul',
								a: {
									id: 'link-list',
									'class': 'list-style-none'
								},
								f: [{
										t: 4,
										r: 'js.length',
										f: [{
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
												f: [{
													t: 7,
													e: 'li',
													f: [{
														t: 7,
														e: 'input',
														a: {
															type: 'text',
															'class': 'form-control output',
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
												}]
											}
										]
									},
									' ', {
										t: 4,
										r: 'css.length',
										f: [{
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
												f: [{
													t: 7,
													e: 'li',
													f: [{
														t: 7,
														e: 'input',
														a: {
															type: 'text',
															'class': 'form-control output',
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
												}]
											}
										]
									},
									' ', {
										t: 4,
										r: 'others.length',
										f: [{
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
												f: [{
													t: 7,
													e: 'li',
													f: [{
														t: 7,
														e: 'input',
														a: {
															type: 'text',
															'class': 'form-control output',
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
									'class': 'email-updates'
								},
								f: [{
										t: 4,
										n: 51,
										r: 'subscribed',
										f: [{
												t: 7,
												e: 'strong',
												f: ['E-mail updates']
											},
											' ', {
												t: 7,
												e: 'input',
												a: {
													type: 'text',
													'class': 'form-control',
													value: [{
														t: 2,
														r: 'email'
													}],
													placeholder: 'Enter your e-mail address if you want to receive updates'
												}
											},
											' ', {
												t: 7,
												e: 'div',
												f: [{
													t: 7,
													e: 'button',
													a: {
														'class': 'btn primary btn-inverse'
													},
													v: {
														click: 'submit'
													},
													f: ['Keep Me Updated']
												}]
											}
										]
									},
									' ', {
										t: 4,
										r: 'subscribed',
										f: [{
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
										}]
									}
								]
							}
						]
					}]
				},
				' '
			]
		}, component = {};
		var linkBuilder = amd_build_links;
		var modal = amd_rvc_components_modal;
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
	}(ractive, amd_build_links, amd_rvc_components_modal);
	var amd_rvc_components_report_new_version = function(Ractive) {
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
							type: 'text',
							'class': 'form-control',
							id: 'new-version-email',
							placeholder: 'Please enter your e-mail address'
						}
					}]
				},
				' '
			]
		}, component = {};
		component.exports = {
			'el': 'body',
			'append': true,
			'complete': function() {
				setTimeout(function() {
					$('#new-version-email').focus();
				}, 500);
			},
			'components': {
				'modal': amd_rvc_components_modal
			},
			'data': {
				'id': 'modal-report-new-version',
				'title': 'Report a new version of ',
				'project': {},
				'buttons': [{
					'label': 'Cancel',
					'class': 'btn-default',
					'handler': 'cancel'
				}, {
					'label': 'Report',
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
	}(ractive, amd_rvc_components_modal);
	var amd_list_files = function(project) {
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
	var amd_rvc_components_select_files = function(Ractive) {
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
							id: 'file-list',
							'class': 'list-style-none'
						},
						f: [{
							t: 4,
							x: {
								r: [
									'listFiles',
									'project'
								],
								s: '${0}(${1})'
							},
							i: 'i',
							f: [{
								t: 7,
								e: 'li',
								f: [{
										t: 7,
										e: 'input',
										a: {
											type: 'checkbox',
											'class': 'checkbox primary',
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
							}]
						}]
					}]
				},
				' '
			]
		}, component = {};
		var listFiles = amd_list_files;
		var modal = amd_rvc_components_modal;
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
					'label': 'Cancel',
					'class': 'btn-default',
					'handler': 'cancel'
				}, {
					'label': 'Select',
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
	}(ractive, amd_list_files, amd_rvc_components_modal);
	var amd_rvc_components_version_list = function(Ractive) {
		var __options__ = {
			template: [{
				t: 4,
				r: 'project',
				f: [{
					t: 7,
					e: 'ul',
					a: {
						'class': [
							'dropdown-menu ', {
								t: 2,
								r: 'class'
							}
						],
						role: 'menu'
					},
					f: [{
							t: 4,
							r: 'versions',
							i: 'j',
							f: [{
								t: 4,
								x: {
									r: [
										'.',
										'selectedVersion'
									],
									s: '${0}!==${1}'
								},
								f: [{
									t: 7,
									e: 'li',
									f: [{
										t: 7,
										e: 'a',
										a: {
											'class': 'link'
										},
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
										},
										f: [{
											t: 2,
											r: '.'
										}]
									}]
								}]
							}]
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
									'class': 'divider'
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
									'class': 'link'
								},
								v: {
									click: {
										n: 'reportNew',
										d: [{
											t: 2,
											rx: {
												r: 'projects',
												m: [{
													t: 30,
													n: 'i'
												}]
											}
										}]
									}
								},
								f: ['Found newer version?']
							}]
						}
					]
				}]
			}]
		}, component = {};
		var ReportNewVersionView = amd_rvc_components_report_new_version;
		var SelectFilesView = amd_rvc_components_select_files;
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
	}(ractive, amd_rvc_components_report_new_version, amd_rvc_components_select_files);
	var amd_rvc_components_collection = function(Ractive) {
		var __options__ = {
			template: [{
				t: 4,
				r: 'projects.length',
				f: [{
						t: 7,
						e: 'header',
						f: [{
							t: 7,
							e: 'h2',
							f: ['My Collection']
						}]
					},
					' ', {
						t: 7,
						e: 'div',
						a: {
							'class': 'row'
						},
						f: [{
							t: 7,
							e: 'div',
							a: {
								'class': 'col-md-6 col-md-offset-3'
							},
							f: [{
								t: 4,
								r: 'projects',
								i: 'i',
								f: [{
									t: 7,
									e: 'div',
									a: {
										'class': 'row list-item'
									},
									f: [{
										t: 7,
										e: 'div',
										a: {
											'class': 'col-sm-12 collection-item'
										},
										f: [{
												t: 2,
												r: 'name'
											},
											' ', {
												t: 7,
												e: 'small',
												a: {
													'class': 'btn-group'
												},
												f: [
													'(', {
														t: 7,
														e: 'a',
														a: {
															'class': 'link',
															'data-toggle': 'dropdown'
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
															'class': 'pull-right'
														}
													}
												]
											},
											' ', {
												t: 7,
												e: 'a',
												a: {
													'class': 'btn pull-right primary btn-link btn-inverse'
												},
												v: {
													click: {
														n: 'remove',
														d: [{
															t: 2,
															r: 'i'
														}]
													}
												},
												f: ['Remove']
											}
										]
									}]
								}]
							}]
						}]
					},
					' ', {
						t: 7,
						e: 'div',
						a: {
							'class': 'row'
						},
						f: [{
							t: 7,
							e: 'div',
							a: {
								'class': 'col-xs-12',
								style: 'text-align: center'
							},
							f: [{
								t: 7,
								e: 'button',
								a: {
									'class': 'btn primary btn-inverse'
								},
								v: {
									click: 'use'
								},
								f: ['Use My Collection']
							}]
						}]
					}
				]
			}]
		}, component = {};
		var LinksView = amd_rvc_components_links;
		var versionList = amd_rvc_components_version_list;
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
	}(ractive, amd_rvc_components_links, amd_rvc_components_version_list);
	var amd_algolia = new AlgoliaSearch('DBMBXHNL8O', 'ff534b434664d2fb939eace2877ec4dc').initIndex('jsdelivr');
	var amd_search = function(algolia) {
		var attrsRegExp = /\s*(?:[a-z]+)\s*:\s*(?:.(?![a-z]*\s*:))*/gi;
		var queryRegExp = /^((?:(?:[^\s:]+(?![a-z]*\s*:))\s*)*)/i;
		return function(queryString, page, callback) {
			if (!queryString) {
				callback(false, '');
			} else {
				var query = queryString.match(queryRegExp)[0].trim();
				var substr = queryString.substr(query.length);
				var attrs = {};
				var match;
				// parse attributes
				while ((match = attrsRegExp.exec(substr)) !== null) {
					var temp = match[0].split(':');
					attrs[temp[0].trim()] = temp[1].trim();
				}
				algolia.search(query, function(success, response) {
					// select the last version of the project by default
					for (var i = 0, c = response.hits.length; i < c; i++) {
						response.hits[i].selectedVersion = response.hits[i].lastversion;
					}
					callback(response, queryString);
				}, {
					'hitsPerPage': 10,
					'page': page
				});
			}
		};
	}(amd_algolia);
	var amd_rvc_components_search_input = function(Ractive) {
		var __options__ = {
			template: [{
					t: 7,
					e: 'input',
					a: {
						type: 'text',
						id: 'search-input',
						'class': 'form-control input-lg',
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
						'class': 'show-more'
					},
					f: [{
						t: 7,
						e: 'a',
						a: {
							'class': 'link'
						},
						v: {
							click: {
								n: 'search',
								a: '*'
							}
						},
						f: ['Browse All Projects']
					}]
				},
				' '
			]
		}, component = {};
		var algolia = amd_algolia;
		var search = amd_search;
		component.exports = {
			'data': {
				'count': 1050,
				'loaded': false,
				'page': 0,
				'query': ''
			},
			'complete': function() {
				var _this = this;
				var app = this.get('app');
				// count projects
				if (window.localStorage) {
					var now = Date.now();
					var count = localStorage.getItem('count');
					var expires = localStorage.getItem('expires');
					if (now < expires) {
						this.set('count', count);
					} else {
						algolia.search('', function(success, response) {
							count = Math.floor(response.nbHits / 50) * 50;
							localStorage.setItem('count', count);
							localStorage.setItem('expires', now + 604800000);
							_this.set('count', count);
						}, {
							'analytics': false
						});
					}
				} else {
					algolia.search('', function(success, response) {
						_this.set('count', Math.floor(response.nbHits / 50) * 50);
					}, {
						'analytics': false
					});
				}
				// update results on input
				this.observe('page query loaded', function(newValue, oldValue, keypath) {
					if (this.get('loaded')) {
						if (keypath === 'query' && this.get('page')) {
							this.set('page', 0);
						} else {
							search(this.get('query').toString(), this.get('page'), function(response, query) {
								// the query might have changed since we sent the request
								if (query === _this.get('query')) {
									app.views.searchResults.set('projects', $.extend(true, [], response.hits));
									app.views.searchResults.set('nbPages', response.nbPages || 0);
									app.views.searchResults.set('page', response.page || 0);
								}
							});
						}
					}
				}, {
					'init': false
				});
				// auto focus on load
				$('#search-input').focus();
				this.on('search', function(event, query) {
					this.set('query', query);
				});
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
	}(ractive, amd_algolia, amd_search);
	var amd_download = function(url) {
		var $iframe = $('#download-helper');
		if (!$iframe.length) {
			$iframe = $('<iframe id="download-helper" style="display: none"></iframe>').appendTo('body');
		}
		$iframe.attr('src', url);
	};
	var amd_get_labels = function(name) {
		var tags = [];
		name = name.toLowerCase();
		if (name.substr(0, 2) === 'wp') {
			tags.push({
				'text': 'WordPress',
				'color': 'blue',
				'keyword': 'wp'
			});
		}
		if (name.indexOf('jquery') !== -1) {
			tags.push({
				'text': 'jQuery',
				'color': 'dark-blue',
				'keyword': 'jQuery'
			});
		}
		if (name.indexOf('bootstrap') !== -1) {
			tags.push({
				'text': 'Bootstrap',
				'color': 'purple',
				'keyword': 'Bootstrap'
			});
		}
		if (name.indexOf('font') !== -1) {
			tags.push({
				'text': 'Font',
				'color': 'emerald',
				'keyword': 'Font'
			});
		}
		return tags;
	};
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
	var amd_rvc_components_search_results = function(Ractive) {
		var __options__ = {
			template: [{
				t: 4,
				r: 'projects',
				i: 'i',
				f: [{
					t: 7,
					e: 'div',
					a: {
						'class': 'result list-item'
					},
					f: [{
							t: 7,
							e: 'div',
							a: {
								'class': 'row'
							},
							f: [{
									t: 7,
									e: 'div',
									a: {
										'class': 'col-md-6'
									},
									f: [{
											t: 7,
											e: 'h4',
											f: [{
													t: 7,
													e: 'a',
													a: {
														'class': 'link'
													},
													v: {
														click: {
															n: 'search',
															d: [
																'author: ', {
																	t: 2,
																	r: 'author'
																}
															]
														}
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
														'class': 'btn-group'
													},
													f: [
														'(', {
															t: 7,
															e: 'a',
															a: {
																'class': 'link',
																'data-toggle': 'dropdown'
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
										},
										' ', {
											t: 7,
											e: 'div',
											a: {
												'class': 'labels'
											},
											f: [{
												t: 4,
												x: {
													r: [
														'getLabels',
														'name'
													],
													s: '${0}(${1})'
												},
												f: [{
													t: 7,
													e: 'span',
													a: {
														'class': [
															'link label ', {
																t: 2,
																r: 'color'
															}
														]
													},
													v: {
														click: {
															n: 'search',
															d: [{
																t: 2,
																r: 'keyword'
															}]
														}
													},
													f: [{
														t: 2,
														r: 'text'
													}]
												}]
											}]
										}
									]
								},
								' ', {
									t: 7,
									e: 'div',
									a: {
										'class': 'col-md-6 buttons'
									},
									f: [{
											t: 7,
											e: 'button',
											a: {
												'class': 'btn btn-link btn-inverse gray'
											},
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
												a: ' Add to Collection'
											},
											f: [{
												t: 7,
												e: 'i',
												a: {
													'class': 'fa fa-check fa-2x'
												}
											}]
										},
										' ', {
											t: 7,
											e: 'button',
											a: {
												'class': 'btn btn-link btn-inverse gray'
											},
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
											},
											f: [{
												t: 7,
												e: 'i',
												a: {
													'class': 'fa fa-download fa-2x'
												}
											}]
										},
										' ', {
											t: 7,
											e: 'a',
											a: {
												'class': 'btn btn-link btn-inverse gray',
												href: [{
													t: 2,
													r: 'homepage'
												}],
												target: '_blank'
											},
											o: {
												n: 'tooltip',
												a: ' Homepage'
											},
											f: [{
												t: 7,
												e: 'i',
												a: {
													'class': 'fa fa-home fa-2x'
												}
											}]
										},
										' ', {
											t: 7,
											e: 'a',
											a: {
												'class': 'btn btn-link btn-inverse gray',
												style: [{
													t: 4,
													n: 51,
													r: 'github',
													f: ['visibility: hidden']
												}],
												href: [{
													t: 2,
													r: 'github'
												}],
												target: '_blank'
											},
											o: {
												n: 'tooltip',
												a: ' GitHub'
											},
											f: [{
												t: 7,
												e: 'i',
												a: {
													'class': 'fa fa-github fa-2x'
												}
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
								'class': 'row'
							},
							f: [{
									t: 7,
									e: 'div',
									a: {
										'class': 'col-xs-12'
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
										'class': 'file-list'
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
										f: [{
												t: 7,
												e: 'div',
												a: {
													'class': [
														'col-xs-', {
															t: 2,
															x: {
																r: ['flash'],
																s: '${0}?11:12'
															}
														}
													],
													style: 'padding-right: 0'
												},
												f: [{
													t: 7,
													e: 'input',
													a: {
														type: 'text',
														'class': 'form-control output',
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
												f: [{
													t: 7,
													e: 'div',
													a: {
														'class': 'col-xs-1',
														style: 'padding-right: 0'
													},
													f: [{
														t: 7,
														e: 'button',
														a: {
															'class': 'btn btn-link btn-inverse gray',
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
														o: 'zeroClipboard',
														f: [{
															t: 7,
															e: 'i',
															a: {
																'class': 'fa fa-chain'
															}
														}]
													}]
												}]
											},
											' ', {
												t: 4,
												x: {
													r: ['files.length'],
													s: '${0}>1'
												},
												f: [{
														t: 4,
														r: 'insert',
														f: [{
															t: 7,
															e: 'div',
															a: {
																'class': 'more-files',
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
																f: [{
																	t: 4,
																	x: {
																		r: ['j'],
																		s: '${0}>0'
																	},
																	f: [{
																			t: 7,
																			e: 'div',
																			a: {
																				'class': [
																					'col-xs-', {
																						t: 2,
																						x: {
																							r: ['flash'],
																							s: '${0}?11:12'
																						}
																					}
																				],
																				style: 'padding-right: 0'
																			},
																			f: [{
																				t: 7,
																				e: 'input',
																				a: {
																					type: 'text',
																					'class': 'form-control output',
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
																			f: [{
																				t: 7,
																				e: 'div',
																				a: {
																					'class': 'col-xs-1',
																					style: 'padding-right: 0'
																				},
																				f: [{
																					t: 7,
																					e: 'button',
																					a: {
																						'class': 'btn btn-link btn-inverse gray',
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
																					o: 'zeroClipboard',
																					f: [{
																						t: 7,
																						e: 'i',
																						a: {
																							'class': 'fa fa-chain'
																						}
																					}]
																				}]
																			}]
																		}
																	]
																}]
															}]
														}]
													},
													' ', {
														t: 7,
														e: 'div',
														a: {
															'class': 'col-xs-12'
														},
														f: [{
															t: 7,
															e: 'button',
															a: {
																'class': 'btn btn-link btn-inverse gray'
															},
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
																			s: '${0}?"Show Only Main File":"Show All Files"'
																		}
																	}
																]
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
															}]
														}]
													}
												]
											}
										]
									}]
								}
							]
						}
					]
				}]
			}, {
				t: 4,
				x: {
					r: ['nbPages'],
					s: '${0}>1'
				},
				f: [{
					t: 7,
					e: 'ul',
					a: {
						'class': 'pagination pull-right'
					},
					f: [{
							t: 7,
							e: 'li',
							a: {
								'class': [
									'previous ', {
										t: 4,
										n: 51,
										r: 'page',
										f: ['disabled']
									}
								]
							},
							f: [{
								t: 7,
								e: 'a',
								a: {
									'class': 'link'
								},
								v: {
									click: {
										n: 'loadPage',
										d: [{
											t: 2,
											x: {
												r: ['page'],
												s: '${0}-1'
											}
										}]
									}
								},
								f: [{
										t: 7,
										e: 'i',
										a: {
											'class': 'fa fa-angle-left'
										}
									},
									' Previous'
								]
							}]
						},
						' ', {
							t: 4,
							x: {
								r: ['pagination.0'],
								s: '${0}>=1'
							},
							f: [{
									t: 7,
									e: 'li',
									f: [{
										t: 7,
										e: 'a',
										a: {
											'class': 'link'
										},
										v: {
											click: {
												n: 'loadPage',
												a: [0]
											}
										},
										f: ['1']
									}]
								},
								' ', {
									t: 4,
									x: {
										r: ['pagination.0'],
										s: '${0}===2'
									},
									f: [{
										t: 7,
										e: 'li',
										f: [{
											t: 7,
											e: 'a',
											a: {
												'class': 'link'
											},
											v: {
												click: {
													n: 'loadPage',
													a: [1]
												}
											},
											f: ['2']
										}]
									}]
								},
								' ', {
									t: 4,
									x: {
										r: ['pagination.0'],
										s: '${0}>2'
									},
									f: [{
										t: 7,
										e: 'li',
										a: {
											'class': 'disabled'
										},
										f: [{
											t: 7,
											e: 'a',
											f: ['...']
										}]
									}]
								}
							]
						},
						' ', {
							t: 4,
							r: 'pagination',
							f: [{
								t: 7,
								e: 'li',
								a: {
									'class': [{
										t: 2,
										x: {
											r: [
												'.',
												'page'
											],
											s: '${0}===${1}?"active":""'
										}
									}]
								},
								f: [{
									t: 7,
									e: 'a',
									a: {
										'class': 'link'
									},
									v: {
										click: {
											n: 'loadPage',
											d: [{
												t: 2,
												r: '.'
											}]
										}
									},
									f: [{
										t: 2,
										x: {
											r: ['.'],
											s: '${0}+1'
										}
									}]
								}]
							}]
						},
						' ', {
							t: 4,
							x: {
								r: [
									'pagination.length',
									'pagination',
									'nbPages'
								],
								s: '${1}[${0}-1]<=${2}-2'
							},
							f: [{
									t: 4,
									x: {
										r: [
											'pagination.length',
											'pagination',
											'nbPages'
										],
										s: '${1}[${0}-1]===${2}-3'
									},
									f: [{
										t: 7,
										e: 'li',
										f: [{
											t: 7,
											e: 'a',
											a: {
												'class': 'link'
											},
											v: {
												click: {
													n: 'loadPage',
													d: [{
														t: 2,
														x: {
															r: ['nbPages'],
															s: '${0}-2'
														}
													}]
												}
											},
											f: [{
												t: 2,
												x: {
													r: ['nbPages'],
													s: '${0}-1'
												}
											}]
										}]
									}]
								},
								' ', {
									t: 4,
									x: {
										r: [
											'pagination.length',
											'pagination',
											'nbPages'
										],
										s: '${1}[${0}-1]<${2}-3'
									},
									f: [{
										t: 7,
										e: 'li',
										a: {
											'class': 'disabled'
										},
										f: [{
											t: 7,
											e: 'a',
											f: ['...']
										}]
									}]
								},
								' ', {
									t: 7,
									e: 'li',
									a: {
										'class': [{
											t: 2,
											x: {
												r: [
													'.',
													'page'
												],
												s: '${0}===${1}?"active":""'
											}
										}]
									},
									f: [{
										t: 7,
										e: 'a',
										a: {
											'class': 'link'
										},
										v: {
											click: {
												n: 'loadPage',
												d: [{
													t: 2,
													x: {
														r: ['nbPages'],
														s: '${0}-1'
													}
												}]
											}
										},
										f: [{
											t: 2,
											r: 'nbPages'
										}]
									}]
								}
							]
						},
						' ', {
							t: 7,
							e: 'li',
							a: {
								'class': [
									'next ', {
										t: 4,
										n: 51,
										x: {
											r: [
												'page',
												'nbPages'
											],
											s: '${0}<${1}-1'
										},
										f: ['disabled']
									}
								]
							},
							f: [{
								t: 7,
								e: 'a',
								a: {
									'class': 'link'
								},
								v: {
									click: {
										n: 'loadPage',
										d: [{
											t: 2,
											x: {
												r: ['page'],
												s: '${0}+1'
											}
										}]
									}
								},
								f: [
									'Next ', {
										t: 7,
										e: 'i',
										a: {
											'class': 'fa fa-angle-right'
										}
									}
								]
							}]
						}
					]
				}]
			}]
		}, component = {};
		var downloadHelper = amd_download;
		var getLabels = amd_get_labels;
		var listFiles = amd_list_files;
		var SelectFilesView = amd_rvc_components_select_files;
		var tooltipDecorator = amd_decorators_tooltip;
		var versionList = amd_rvc_components_version_list;
		var zeroClipboardDecorator = amd_decorators_zero_clipboard;
		component.exports = {
			'components': {
				'versionList': versionList
			},
			'computed': {
				'pagination': function() {
					var current = this.get('page');
					var total = this.get('nbPages');
					var length = 5;
					var half = Math.floor(length / 2);
					var result = [];
					var start, end;
					if (total < length) {
						start = 0;
						end = total - 1;
					} else if (current <= half) {
						start = 0;
						end = length - 1;
					} else if (current >= total - half) {
						start = total - length;
						end = total - 1;
					} else {
						start = current - half;
						end = start + length - 1;
					}
					for (var i = start; i <= end; i++) {
						result.push(i);
					}
					return result;
				}
			},
			'data': {
				'app': {},
				'getLabels': getLabels,
				'nbPages': 0,
				'flash': true,
				'listFiles': listFiles,
				'page': 0,
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
					'loadPage': function(event, i) {
						if (i >= 0 && i < this.get('nbPages') && i !== this.get('page')) {
							app.views.searchInput.set('page', i);
							$('body, html').scrollTop(0);
						}
					},
					'search': function(event, query) {
						app.views.searchInput.set('query', query);
					},
					'toggle': function(event, i) {
						this.set('projects.' + i + '.insert', true);
						var $body = $('body');
						var $link = $(event.node);
						var $moreFiles = $link.closest('.file-list').find('.more-files');
						var keypath = 'projects.' + i + '.showAll';
						$moreFiles.slideToggle(200, function() {
							if ($link.offset().top < $body.scrollTop()) {
								$('body, html').animate({
									'scrollTop': $link.closest('.list-item').offset().top - 10
								});
							}
							_this.set(keypath, !_this.get(keypath));
						});
					}
				});
				this.observe('projects.length', function(n) {
					if (n === 1) {
						_this.set('projects.0.insert', true);
						_this.set('projects.0.showAll', true);
					}
				}, {
					'defer': true
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
	}(ractive, amd_download, amd_get_labels, amd_list_files, amd_rvc_components_select_files, amd_decorators_tooltip, amd_rvc_components_version_list, amd_decorators_zero_clipboard);
	var amd_serialize = function(query, page, collection) {
		var result = {
			'query': query,
			'page': page,
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
			result.page = result.page || undefined;
			if (!result.collection.length) {
				result.collection = undefined;
			}
			return JSON.stringify(result);
		}
		return '';
	};
	var amd_unserialize = function(string) {
		try {
			return JSON.parse(string);
		} catch (e) {
			return false;
		}
	};
	var amd_app = function(CollectionView, LinksView, Modal, ReportNewVersionView, SearchInputView, SearchResultsView, SelectFilesView, versionList, serialize, unserialize) {
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
			if (hash !== serialize(app.views.searchInput.get('query'), app.views.searchInput.get('page'), app.views.collection.get('projects'))) {
				var data = unserialize(hash);
				if (data) {
					app.views.searchInput.set('query', data.query || '');
					app.views.searchInput.set('page', data.page || 0);
					app.views.collection.set('projects', data.collection || []);
				}
			}
			app.views.searchInput.set('loaded', true);
		});
		// update permalink on change
		function observer() {
			var serialized = serialize(app.views.searchInput.get('query'), app.views.searchInput.get('page'), app.views.collection.get('projects'));
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
		app.views.searchInput.observe('page query', observer, {
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
	}(amd_rvc_components_collection, amd_rvc_components_links, amd_rvc_components_modal, amd_rvc_components_report_new_version, amd_rvc_components_search_input, amd_rvc_components_search_results, amd_rvc_components_select_files, amd_rvc_components_version_list, amd_serialize, amd_unserialize);
})(window);
