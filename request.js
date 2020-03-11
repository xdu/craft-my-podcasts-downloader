import request from 'request'
import parser from 'node-podcast-parser'

export default function podcastXML(url) {

	return new Promise((resolve, reject) => {

		request(url, (err, res, data) => {
			if (err) {
				reject("Network error");
			}

			parser(data, (err, podcast) => {
				if (err) {
					reject('Parsing error')
				}

				//console.log(podcast)
				resolve(podcast)
			})
		})
	})

}
