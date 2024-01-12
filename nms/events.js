const Logger = require('./logger')
const logger = new Logger

// Register a listener
logger.on('messageLogged', (arg) =>  {
    console.log('listener called', arg)
})

logger.log('message')

// emitter.on('logging', (arg) =>  {
//     console.log('logging listener called', arg)
// })
// emitter.emit('logging', {data: "message"})