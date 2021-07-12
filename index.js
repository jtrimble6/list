#!/usr/bin/env node

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const path = require('path')

// Method #3
const { lstat } = fs.promises

const targetDir = process.argv[2] || process.cwd()

// Method #2
// const lstat = util.promisify(fs.lstat)

fs.readdir(targetDir, async (err, filenames) => {
    // EITHER
    // err === an error object, which means something went wrong
    // OR
    // err === null, which means everything is OK

    if (err) {
        // error handling code here
        throw new Error(err)
    }

    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename))
    })

    const allStats = await Promise.all(statPromises)

    for (let stats of allStats) {
        const index = allStats.indexOf(stats)

        if (stats.isFile()) {
            console.log(filenames[index])
        } else {
            console.log(chalk.bold(filenames[index]))
        }
        
    }

})

// Method #1
// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if (err) {
//                 reject(err)
//             }

//             resolve(stats)
//         })
//     })
// }