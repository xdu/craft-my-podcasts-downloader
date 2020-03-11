import os from 'os'
import path from 'path'
import fs from 'fs'

const filename = "feeds.json"

export default function getConfig() {

    console.log("__dirname : " + __dirname)
    console.log("os.homedir() : " + os.homedir())

    let fpath = getConfigFile()
    if (! fpath) {
        console.error("Configuration file " + filename + " is not found.")
        process.exit()
    }

    let file = fs.readFileSync(fpath)
    let config = JSON.parse(file)

    return config.feeds

}   

function getConfigFile() {
    let fpath = path.join(__dirname, filename)
    if (fs.existsSync(fpath)) {
        return fpath
    }

    fpath = path.join(os.homedir(), filename)
    if (fs.existsSync(fpath)) {
        return fpath
    } 
    
    return null
}