define(function() {
	return function(string) {
		try {
			return JSON.parse(string);
		} catch (e) {
			return false;
		}
	}
});