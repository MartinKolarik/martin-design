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
	var $body				= $('body');
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
		// might be encoded on iOS (#11)
		var hash = decodeURIComponent(location.hash).substr(2);

		// redirect from the old format
		if(hash[0] !== '{') {
			hash = JSON.stringify({ 'query': hash });
		}

		// only if there is a difference between hash and the current data
		if(hash !== serialize(app.views.searchInput.get('query'), app.views.collection.get('projects'))) {
			var data = unserialize(hash);

			if(data) {
				app.views.searchInput.set('query', data.query || '');
				app.views.collection.set('projects', data.collection || []);// TODO fetch the file list from API
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

	// configure ZeroClipboard
	ZeroClipboard.config({
		'moviePath'	: '//cdn.jsdelivr.net/zeroclipboard/1.3.3/ZeroClipboard.swf'
	});

	// auto-select input content
	$body.on('click', '.output', function() {
		this.select();
	});

	// we don't have require.js in production
	window.app = app;

	return app;
});