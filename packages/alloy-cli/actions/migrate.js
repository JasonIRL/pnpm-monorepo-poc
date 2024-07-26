const chalk = require('chalk');
const { runMigration } = require('code-migrate');

/**
 * @typedef {{key: string, runDate: string}} LogEntry
 */

/**
 * Runs the selected migration
 * @param {string} key
 * @param {boolean} [reRun=false]
 */
function runMigrationsByKey(key, reRun = false) {
  const definitions = require('../migrations/_definitions.json');
  const availableMigrations = definitions.map((def) => def.key);

  if (!availableMigrations.includes(key)) {
    console.log(
      `${chalk.redBright.bold(`Migration ${chalk.bgRed.white(key)} not found. Please check the key and try again.`)}`,
    );
    process.exitCode = 0;
    return;
  }

  const previouslyRun = checkLog(key);

  if (previouslyRun && !reRun) {
    console.log(
      `${chalk.redBright.bold(`Migration ${chalk.bgRed.white(key)} has already been run on ${previouslyRun.runDate}.`)}`,
      `${chalk.redBright.bold('\nYou can re-run this migration by running with the --re-run flag.')}`,
    );
    process.exitCode = 0;
    return;
  }

  if (!previouslyRun || reRun) {
    runMigration({
      cwd: process.cwd(),
      migrationFilePath: require.resolve(
        `../migrations/${definitions.find((def) => def.key === key).file}`,
      ),
    });
  }
}

/**
 * Runs all migrations
 */
function runAllMigrations() {
  runMigration({
    cwd: process.cwd(),
    migrationFilePath: require.resolve('../migrations/_all.js'),
  });
}

/**
 * Checks the log for a given key, if found, returns the entry
 * @param {string} key
 * @returns {LogEntry | undefined}
 */
function checkLog(key) {
  console.log(`Checking log for ${key}`);
  const log = require(`${process.cwd()}/migration-log.json`);
  return log.some((entry) => entry.key === key)
    ? log.find((entry) => entry.key === key)
    : undefined;
}

module.exports = { runAllMigrations, runMigrationsByKey };
