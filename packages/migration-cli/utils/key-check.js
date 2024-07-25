const { existsSync } = require("node:fs");

const LOGFILE = `${process.cwd()}/migration-log.json`;

module.exports = function keyCheck(key) {
  const log = existsSync(LOGFILE) ? require(LOGFILE) : false;

  if (!log) {
    return false;
  }

  return log.some((entry) => entry.key === key);
};
