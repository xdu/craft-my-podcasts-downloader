
import Feed from './Feed'

function main() {
	let feed = new Feed("https://www.rtl.lu/podcast/feed/radio_carteblanche_fb.xml", "rtl")
	feed.download()
}

main()
