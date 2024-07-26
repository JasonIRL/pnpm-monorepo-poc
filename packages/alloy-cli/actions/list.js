const chalk = require('chalk');

function listAvailableMigrations() {
  const definitions = require('../migrations/_definitions.json');
  const log = require(`${process.cwd()}/migration-log.json`);
  const previouslyRun = log.map((entry) => entry.key);
  const availableMigrations = definitions.filter(
    (def) => !previouslyRun.includes(def.key),
  );

  console.log(chalk.greenBright.bold('Available migrations:'));
  for (const migration of availableMigrations) {
    console.log(
      `${chalk.greenBright.bold(migration.key)} - ${migration.description}`,
    );
  }

  process.exitCode = 0;
}

module.exports = { listAvailableMigrations };
