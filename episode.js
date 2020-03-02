import request from 'request'

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

export function downloadEpisode(url) {
	
	return new Promise((resolve, reject) => {
		request(url, (err, res, data) => {
			if (err) {
				reject(err)
			}

			resolve(data)
		})
	})
}
