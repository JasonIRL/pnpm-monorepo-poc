const chalk = require('chalk');

function listAllMigrations() {
  const definitions = require('../migrations/_definitions.json');
  const log = require(`${process.cwd()}/migration-log.json`);
  const previouslyRun = log.map((entry) => entry.key);

  console.log(chalk.greenBright.bold('All migrations:'));
  for (const migration of definitions) {
    if (previouslyRun.includes(migration.key)) {
      console.log(
        `${chalk.yellowBright.bold(migration.key)} - ${migration.description} (ran ${log.find((entry) => entry.key === migration.key).runDate})`,
      );
      continue;
    }
    console.log(
      `${chalk.greenBright.bold(migration.key)} - ${migration.description}`,
    );
  }

  process.exitCode = 0;
}

module.exports = { listAllMigrations };
