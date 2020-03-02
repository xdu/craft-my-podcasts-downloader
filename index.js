import request from 'request'
import parser from 'node-podcast-parser'
import sanitize from 'sanitize-filename'

import podcastXML from './request'
import {getNewEpisodes} from './episode'

podcastXML('https://www.rtl.lu/podcast/feed/radio_carteblanche_fb.xml')
	.then((data) => {
		parser(data, (err, content) => {
			if (err) {
				console.error('Parsing error', err)
				return
			}

			var episodes = getNewEpisodes(content, {
				"http://perma.rtl.lu/podcastaudio/1351581.mp3": {},
				"http://perma.rtl.lu/podcastaudio/1352487.mp3": {},
				"http://perma.rtl.lu/podcastaudio/1355023.mp3": {},
				"http://perma.rtl.lu/podcastaudio/1353669.mp3": {}
			})

			var path = sanitize(content.title)

			for (var i = 0; i < episodes.length; i++) {
				
			}
		})
	})
