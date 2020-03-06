import request from 'request'
import sanitize from 'sanitize-filename'
import path from 'path'
import fs from 'fs'
import moment from 'moment'
import FeedConfig from './FeedConfig'
import podcastXML from './request'

export default class Feed {

    constructor( url, folder ) {
        this.url = url
        this.folder = folder
    }

    async download() {

		let config = new FeedConfig(this.folder)

        let podcast = await podcastXML(this.url)

		for (var i = 0; i < podcast.episodes.length; i++) {

			var current = podcast.episodes[i]

			if (config.isDownloaded(current.guid)) {
				console.log("skip " + current.guid)
				continue
			}

			let media = await this.downloadAudio(current.guid)

			let filename = this.buildFilename(current)
			this.saveFile(media, filename)
			console.log("save " + filename)

			config.add({ ...current, filename })
		}

		config.save()
    }

    buildFilename(episode) {

        let dt = moment(episode.published.getTime()).format('YYYY-MM-DD')
        return dt + ' ' + sanitize(episode.title) + '.mp3'
    }

    downloadAudio(url) {

        return new Promise((resolve, reject) => {
            request({
                url,
                encoding: null
            }, (err, res, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    }

    saveFile(data, filename) {

        let fpath = path.join(this.folder, filename)
		fs.writeFileSync(fpath, data, (err) => {
            console.error(err)
        })
    }

}
