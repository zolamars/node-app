const fs = require('fs')

// var files = fs.readdirSync('./')   
// console.log(files)

// *** always choose to use async functions instead of sync
fs.readdir('./NodeModuleSystem', function(err, files){
    if(err) console.log('Error', err)
    else console.log('Result', files)
})