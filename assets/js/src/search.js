define([
	'algolia'
], function(
	algolia
) {
	var attrsRegExp	= /\s*(?:[a-z]+)\s*:\s*(?:.(?![a-z]*\s*:))*/gi;
	var queryRegExp	= /^((?:(?:[^\s:]+(?![a-z]*\s*:))\s*)*)/i;

	return function(queryString, page, callback) {
		if(!queryString) {
			callback(false);
		} else  {
			var query	= queryString.match(queryRegExp)[0].trim();
			var substr	= queryString.substr(query.length);
			var attrs	= {};
			var match;

			// parse attributes
			while((match = attrsRegExp.exec(substr)) !== null) {
				var temp				= match[0].split(':');
				attrs[temp[0].trim()]	= temp[1].trim();
			}

			algolia.search(query, function(success, response) {
				// select the last version of the project by default
				for(var i = 0, c = response.hits.length; i < c; i++) {
					response.hits[i].selectedVersion = response.hits[i].lastversion;
				}

				callback(response);
			}, { 'hitsPerPage': 10, 'page': page });
		}
	};
});