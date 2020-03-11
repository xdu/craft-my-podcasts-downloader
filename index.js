
import Feed from './Feed'
import getConfig from './config'

function main() {
	
	let feeds = getConfig()
	for (let i = 0; i < feeds.length; i ++) {

		const{ url, directory } = feeds[i]
		//console.log(url, directory)

		const feed = new Feed(url, directory)
		feed.download()
	}
}

main()
