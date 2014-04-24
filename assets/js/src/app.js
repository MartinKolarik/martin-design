define([
	'rvc!components/collection',
	'rvc!components/links',
	'rvc!components/modal',
	'rvc!components/report-new-version',
	'rvc!components/search-input',
	'rvc!components/search-results',
	'rvc!components/select-files',
	'rvc!components/version-list'
], function(
	CollectionView,
	LinksView,
	Modal,
	ReportNewVersionView,
	SearchInputView,
	SearchResultsView,
	SelectFilesView,
	versionList
) {
	// we'll need these later
	var $body				= $('body');
	var $document			= $(document);
	var $searchInput		= $('#search-input');
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
		},
		'twoway': false
	});
	app.views.searchResults	= new SearchResultsView({
		'el'	: '#search-results',
		'data'	: {
			'app'		: app,
			'projects'	: []
		},
		'twoway': false
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

	// we don't have require.js in production
	window.app = app;

	return app;
});