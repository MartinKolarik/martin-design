define(function () {
	return function(name) {
		var tags	= [];
		name		= name.toLowerCase();

		if(name.substr(0, 2) === 'wp') {
			tags.push({ 'text': 'WordPress', 'color': 'blue', 'keyword': 'wp' });
		}

		if (name.indexOf('jquery') !== -1) {
			tags.push({ 'text': 'jQuery', 'color': 'dark-blue', 'keyword': 'jQuery' });
		}

		if (name.indexOf('bootstrap') !== -1) {
			tags.push({ 'text': 'Bootstrap', 'color': 'purple', 'keyword': 'Bootstrap' });
		}

		if (name.indexOf('font') !== -1) {
			tags.push({ 'text': 'Font', 'color': 'emerald', 'keyword': 'Font' });
		}

		return tags;
	}
});