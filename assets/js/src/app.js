define([
	'rvc!components/collection',
	'rvc!components/links',
	'rvc!components/modal',
	'rvc!components/report-new-version',
	'rvc!components/search-input',
	'rvc!components/search-results',
	'rvc!components/select-files',
	'rvc!components/version-list',
	'serialize',
	'unserialize'
], function(
	CollectionView,
	LinksView,
	Modal,
	ReportNewVersionView,
	SearchInputView,
	SearchResultsView,
	SelectFilesView,
	versionList,
	serialize,
	unserialize
) {
	var app					= {
		'cdnRoot'		: '//cdn.jsdelivr.net',
		'components'	: {
			'CollectionView'		: CollectionView,
			'LinksView'				: LinksView,
			'Modal'					: Modal,
			'ReportNewVersionView'	: ReportNewVersionView,
			'SearchInputView'		: SearchInputView,
			'SearchResultsView'		: SearchResultsView,
			'SelectFilesView'		: SelectFilesView,
			'versionList'			: versionList
		},
		'views'			: {}
	};

	app.views.collection	= new CollectionView({
		'el'	: '#my-collection',
		'data'	: {
			'app'		: app,
			'projects'	: []
		},
		'twoway': false
	});
	app.views.searchInput	= new SearchInputView({
		'el'	: '#search',
		'data'	: {
			'app'	: app
		}
	});
	app.views.searchResults	= new SearchResultsView({
		'el'	: '#search-results',
		'data'	: {
			'app'		: app,
			'projects'	: []
		},
		'twoway': false
	});

	// restore collection and query from hash
	$(window).on('hashchange searchReady', function() {
		// only if there is a difference between hash and the current data
		if(location.hash.substr(2) !== serialize(app.views.searchInput.get('query'), app.views.collection.get('projects'))) {
			var data = unserialize(location.hash.substr(2));

			if(data) {
				app.views.searchInput.set('query', data.query || '');
				app.views.collection.set('projects', data.collection || []);// TODO fetch the current file list
			}
		}
	});

	// update permalink on change
	function observer() {
		var serialized = serialize(app.views.searchInput.get('query'), app.views.collection.get('projects'));

		if(serialized) {
			location.hash = '!' + serialized;
		} else {
			location.hash = '';
		}
	}

	app.views.searchInput.observe('query', observer, { 'init': false });
	app.views.collection.observe('projects', observer, { 'init': false });

	// auto-select input content
	$('body').on('click', '.output', function() {
		this.select();
	});

	// we don't have require.js in production
	window.app = app;

	return app;
});