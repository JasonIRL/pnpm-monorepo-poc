const { writeFileSync, existsSync } = require('node:fs');

const LOGFILE = `${process.cwd()}/migration-log.json`;

function logger(key, issues) {
  const log = existsSync(LOGFILE) ? require(LOGFILE) : [];

  log.push({
    key,
    runDate: new Date().toISOString(),
    issues,
  });

  writeFileSync(LOGFILE, JSON.stringify(log, null, 2));
}

module.exports = logger;
