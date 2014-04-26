define(function() {
	return function(query, collection) {
		var result = {
			'query'		: query,
			'collection': []
		};

		for(var i = 0, c = collection.length; i < c; i++) {
			result.collection.push({
				'name'				: collection[i].name,
				'selectedVersion'	: collection[i].selectedVersion,
				'selectedFiles'		: collection[i].selectedFiles
			});
		}

		// don't include empty values
		if(result.query || result.collection.length) {
			result.query = result.query || undefined;

			if(!result.collection.length) {
				result.collection = undefined;
			}

			return JSON.stringify(result);
		}

		return '';
	}
});