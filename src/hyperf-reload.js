const path = require('path');
const childProcess = require('child_process');
const program = require('commander');
const chokidar = require('chokidar');
const packageInfo = require('../package.json');
const { logger } = require('./utils');

let showDebug = false;
const debug = text => {
  if (showDebug) logger.debug(text);
};

let hyperfProcess;
const startHyperf = (php, hyperfFile) => {
  logger.warn('Start', hyperfFile);
  hyperfProcess = childProcess.spawn(php, [hyperfFile, 'start']);
  hyperfProcess.stdout.on('data', data => {
    console.log(data.toString());
  });
  hyperfProcess.stderr.on('data', data => {
    console.log(`stderr: ${data.toString()}`);
  });
};

const stopHyperf = (php, hyperfFile) => {
  logger.err(`Stop`, hyperfFile);
  if (hyperfProcess) {
    hyperfProcess.kill();
  }
};

let timeout;
const restartHyperf = (php, hyperfFile) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    stopHyperf(php, hyperfFile);
    startHyperf(php, hyperfFile);
  }, 200);
  debug('ready to restart ...');
};

program
  .arguments('<hyperf-file> [watch-dirs...]')
  .option(
    '-i, --ignored <files>',
    '忽略指定文件(夹)的监听',
    '**/.* **/vendor/** **/test/** **/runtime/**',
  )
  .option('-i, --php <filepath>', 'PHP执行文件路径', 'php')
  .option('-d, --debug', '是否显示调试信息')
  .version(packageInfo.version)
  .description(packageInfo.description)
  .action((hyperfFile, watchDirs) => {
    showDebug = program.debug;

    startHyperf(program.php, hyperfFile);

    watchDirs.push(path.dirname(path.dirname(hyperfFile)));

    logger.warn('Watch', watchDirs.join(', '));
    chokidar
      .watch(watchDirs, {
        ignoreInitial: true,
        ignored: program.ignored ? program.ignored.split(' ') : [],
      })
      .on('all', (event, path) => {
        debug(`${event} ${path}`);
        restartHyperf(program.php, hyperfFile);
      });
  })
  .parse(process.argv);

if (!program.args[0]) {
  program.help();
}
