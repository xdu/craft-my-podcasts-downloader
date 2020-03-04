import parser from 'node-podcast-parser'

import podcastXML from './request'
import FeedConfig from './feedConfig'
import { getNewEpisodes, buildPath, downloadEpisode, updateConfig, saveFile } from './episode'

var config = {
	"http://perma.rtl.lu/podcastaudio/1351581.mp3": {},
	"http://perma.rtl.lu/podcastaudio/1352487.mp3": {},
	"http://perma.rtl.lu/podcastaudio/1355023.mp3": {},
	"http://perma.rtl.lu/podcastaudio/1353669.mp3": {}
}

async function main() {
	let feed = new FeedConfig()
	await feed.init(".")

	let isDownloaded = feed.isDownloaded("http://perma.rtl.lu/podcastaudio/1354985.mp3")
	console.log(isDownloaded)
}

main()
/*
podcastXML('https://www.rtl.lu/podcast/feed/radio_carteblanche_fb.xml')
	.then((data) => {
		parser(data, (err, content) => {
			if (err) {
				console.error('Parsing error', err)
				return
			}

			var episodes = getNewEpisodes(content, config)

			for (var i = 0; i < episodes.length; i++) {

				var current = episodes[i]
				console.log(current)

				var path = buildPath(current, content.title)
				console.log(path)

 				downloadEpisode(current.guid)
					.then((data) => saveFile(data, path))
					.then((filename) => updateConfig(config, current, filename))
			}
		})
	})
*/
