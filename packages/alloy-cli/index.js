#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { runAllMigrations, runMigrationsByKey } = require('./actions/migrate');
const { isRepoClean } = require('./utils/git-clean');
const helpInfo = require('./utils/help-info');
const { listAvailableMigrations } = require('./actions/list');
const { listAllMigrations } = require('./actions/list-all');

const program = new Command();

program
  .name('alloy-cli')
  .description('CLI utility for Alloy projects.')
  .version(require('./package.json').version)
  .addHelpText('beforeAll', helpInfo);

program
  .command('migrate')
  .description('Run migrations')
  .option('-l, --list', 'list migrations that can be run')
  .option(
    '-L, --list-all',
    'list all migrations, including those that have already been run',
  )
  .option('-a, --all', 'run all migrations')
  .option('-m, --migrate <key>', 'run a specific migration by key')
  .option('--force', 'force migration to run.')
  .option('-rr, --re-run', 're-run a migration')
  .action(async (options) => {
    if (options.list) listAvailableMigrations();

    if (options.listAll) listAllMigrations();

    if (options.migrate) {
      const clean = await isRepoClean();
      if (!clean && !options.force) {
        console.log(
          `${chalk.redBright.bold('Please commit your changes before running migrations, or run with --force to ignore.')}`,
        );
        process.exitCode = 0;
      }

      if (clean || options.force) {
        if (options.migrate) runMigrationsByKey(options.migrate, options.reRun);

        if (options.all) runAllMigrations();
      }
    }
  });

program.parse();
