import fs from 'fs'
import path from 'path'

const CONFIG = 'feed.json'

class FeedConfig {

	constructor() {
		this._downloaded = []
	}

	// this init() should be async
	//
	init(folder) {

		this.path = folder
		let fp = path.join(this.path, CONFIG)

		return new Promise( (resolve, reject) => {

			fs.readFile(fp, (err, data) => {
				if (! err) {
					this._downloaded = JSON.parse(data)

				} else {
					console.error(err)
				}
				resolve()
			})
		})
	}

	isDownloaded(id) {

		for (let i = 0; i < this._downloaded.length; i++) {

			if (this._downloaded[i].guid === id) {
				return true
			}
		}
		return false
	}
}

//const instance = new FeedHitory()
//Object.freeze(instance)

export default FeedConfig
