const chalk = require('chalk');

const logger = (title, message, type) => {
  let colorTitle = chalk`{bold ${title}:}`;
  if (type === 'error') {
    colorTitle = chalk`{bold {red ${title}:}}`;
  } else if (type === 'warning') {
    colorTitle = chalk`{bold {yellow ${title}:}}`;
  } else if (type === 'debug') {
    colorTitle = chalk`{bold {gray ${title}:}}`;
  }
  console.log(`${colorTitle} ${message}`);
};
logger.err = (title, message) => {
  logger(title, message, 'error');
};
logger.warn = (title, message) => {
  logger(title, message, 'warning');
};
logger.debug = message => {
  logger('Debug', message, 'debug');
};

module.exports = { logger };
