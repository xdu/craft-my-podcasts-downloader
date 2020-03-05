import parser from 'node-podcast-parser'
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
        this.config = new FeedConfig()
    }

    save() {
        this.config.save()
    }

    async download() {

        await this.config.init(this.folder)
        
        podcastXML( this.url )
            .then( (data) => {
                parser(data, (err, content) => {

                    if (err) {
                        console.error('Parsing error', err)
                        return
                    }
        
                    console.log(content)
                    this.getNewEpisodes(content, this.config)
        
                })
            })
    }

    async getNewEpisodes(podcast, config) {
    
        for (var i = 0; i < podcast.episodes.length; i++) {
            var current = podcast.episodes[i]

            if (config.isDownloaded(current.guid)) {
                continue
            }

            await this.downloadEpisode(current)
        }

    }

    downloadEpisode(episode) {

        let filename = this.buildFilename(episode)
        console.log(filename)

        this.downloadAudio(episode.guid)
            .then((data) => this.saveFile(data, filename))
            .then((filename) => this.config.add({ ...episode, filename }))

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

        return new Promise((resolve, reject) => {
    
            fs.writeFile(fpath, data, (err) => {
                err ? reject(err) : resolve(filename)
            })
        })
    }

}