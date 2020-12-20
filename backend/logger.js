const { appendFileSync } = require('fs')

exports.log = text => {
  appendFileSync('log.txt', `\n${text}`)
}
