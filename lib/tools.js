const chalk = require('chalk')

module.exports.log = (message, color = 'green', ...args) => console.log(chalk[color](message, args))