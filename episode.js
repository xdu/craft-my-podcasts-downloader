import request from 'request'
import sanitize from 'sanitize-filename'
import path from 'path'
import fs from 'fs'
import moment from 'moment'

export function getNewEpisodes(podcastXML, index) {

	var rv = []

	for (var i = 0; i < podcastXML.episodes.length; i++) {
		var epis = podcastXML.episodes[i]
		if (!(epis.guid in index)) {
			rv.push({ ...epis })
		}
	}

	return rv
}

export function buildPath(episode, folder) {

	let dt = moment(episode.published.getTime()).format('YYYY-MM-DD')
	return dt + ' ' + sanitize(episode.title) + '.mp3'
}

export function downloadEpisode(url) {

	return new Promise((resolve, reject) => {
		request({
			url,
			encoding: null
		}, (err, res, data) => {
			err ? reject(err) : resolve(data)
		})
	})
}

export function saveFile(data, path) {

	return new Promise((resolve, reject) => {

		fs.writeFile(path, data, (err) => {
			err ? reject(err) : resolve(path)
		})
	})
}

export function updateConfig(config, episode, filename) {

	let obj = { ...episode, filename }
	config[episode.guid] = obj

	console.log(config)
}