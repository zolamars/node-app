const EventEmitter = require('events')

// var url= 'http://mylogger.io/log'

console.log(__filename)
console.log(__dirname)

class Logger extends EventEmitter{
    log(message){
        console.log(message)
        
        // A method used to raise an event
        this.emit('messageLogged', {id: 1, url: "http://"})
    
    }
}


module.exports = Logger
// exports.log = log