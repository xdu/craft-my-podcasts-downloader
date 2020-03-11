import fs from 'fs'
import path from 'path'

const CONFIG = 'content.json'

class FeedConfig {

	constructor(folder) {

		this.path = folder
		this._downloaded = []
 		this.filename = path.join(this.path, CONFIG)

		if (fs.existsSync(this.filename)) {
			let data = fs.readFileSync(this.filename)
			this._downloaded = JSON.parse(data)
		}
	}

	isDownloaded(id) {

		for (let i = 0; i < this._downloaded.length; i++) {

			if (this._downloaded[i].guid === id) {
				return true
			}
		}
		return false
	}

	add(record) {
		this._downloaded.push(record)
	}

	save() {
		//console.log("save " + JSON.stringify(this._downloaded))
		fs.writeFileSync(this.filename, JSON.stringify(this._downloaded))
	}
}

//const instance = new FeedHitory()
//Object.freeze(instance)

export default FeedConfig
