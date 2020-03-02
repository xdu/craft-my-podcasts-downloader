export function getNewEpisodes(podcastXML, index) {

	var rv = []

	for (var i = 0; i < podcastXML.episodes.length; i++) {
		var epis = podcastXML.episodes[i]
		if (! (epis.guid in index)) {
			rv.push({...epis})
		}
	}

	return rv
}
