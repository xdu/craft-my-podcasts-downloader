import request from 'request'
import parser from 'node-podcast-parser'

import podcastXML from './request'
import {getNewEpisodes} from './episode'

podcastXML('https://www.rtl.lu/podcast/feed/radio_carteblanche_fb.xml')
	.then((data) => {
		parser(data, (err, content) => {
			if (err) {
				console.error('Parsing error', err)
				return
			}

			var episodes = getNewEpisodes(content, {})
			console.log(episodes)
		})
	})
