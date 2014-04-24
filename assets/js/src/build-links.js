define(function () {
	return function(collection) {// TODO complete refactoring
		var cssTemplate = '<link type="text/css" rel="stylesheet" href="//cdn.jsdelivr.net/{{href}}">';
		var jsTemplate	= '<script type="text/javascript" src="//cdn.jsdelivr.net/{{src}}"></script>';
		var css			= [];
		var js			= [];
		var others		= [];
		var isCss		= /\.css$/i;
		var isJs		= /\.js$/i;

		// one file
		if(collection.length === 1 && collection[0].selectedFiles.length === 1) {
			if(isCss.test(collection[0].selectedFiles[0])) {
				css		= cssTemplate.replace('{{href}}', collection[0].name + '/' + collection[0].selectedVersion + '/' + collection[0].selectedFiles[0]);
			} else if(isJs.test(collection[0].selectedFiles[0])) {
				js		= jsTemplate.replace('{{src}}', collection[0].name + '/' + collection[0].selectedVersion + '/' + collection[0].selectedFiles[0]);
			} else {
				others.push('//cdn.jsdelivr.net/' + collection[0].selectedFiles);
			}
		} else {
			// each project in collection
			for(var i = 0, c = collection.length; i < c; i++) {
				var cssFiles	= [];
				var jsFiles		= [];
				var otherFiles	= [];

				// each file in project
				for(var j = 0, d = collection[i].selectedFiles.length; j < d; j++) {
					if(isCss.test(collection[i].selectedFiles[j])) {
						cssFiles.push(collection[i].selectedFiles[j]);
					} else if(isJs.test(collection[i].selectedFiles[j])) {
						jsFiles.push(collection[i].selectedFiles[j]);
					} else {
						otherFiles.push('//cdn.jsdelivr.net/' + collection[i].selectedFiles[j]);
					}
				}

				if(cssFiles.length === 1 && cssFiles[0] === collection[i].mainfile) {
					css.push(collection[i].name + '@' + collection[i].selectedVersion);
				} else if(cssFiles.length) {
					css.push(collection[i].name + '@' + collection[i].selectedVersion + '(' + cssFiles.join('+') + ')');
				}

				if(jsFiles.length === 1 && jsFiles[0] === collection[i].mainfile) {
					js.push(collection[i].name + '@' + collection[i].selectedVersion);
				} else if(jsFiles.length) {
					js.push(collection[i].name + '@' + collection[i].selectedVersion + '(' + jsFiles.join('+') + ')');
				}

				if(otherFiles.length) {
					others.push.apply(others, otherFiles);
				}
			}

			/*if(css.length === 1) {
				css	= cssTemplate.replace('{{href}}', css[0]);
			} else *//*if(css.length) {
				css	= cssTemplate.replace('{{href}}', 'g/' + css.join(','));
			}

			/*if(js.length === 1) {
				js	= jsTemplate.replace('{{src}}', js[0]);
			} else */{
				js	= jsTemplate.replace('{{src}}', 'g/' + js.join(','));
			}
		}

		return {
			'css'	: css,
			'js'	: js,
			'others': others
		}
	}
});