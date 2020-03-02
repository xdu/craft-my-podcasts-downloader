import request from 'request'

export default function podcastXML(url) {

	return new Promise((resolve, reject) => {

		request(url, (err, res, data) => {
			if (err) {
				reject("Network error");
			}

			resolve(data)
		})
	})

}
