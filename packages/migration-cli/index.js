#!/usr/bin/env node

const { runMigration, migrate } = require("code-migrate");
const { program } = require("commander");
const chalk = require("chalk");

program.option("-v, --version", "output the version number");
program.option("-l, --list", "list migrations that can be run");
program.option(
  "-L, --list-all",
  "list all migrations, including those that have already been run"
);
program.option("-a, --all", "run all migrations");
program.option("-m, --migrate <key>", "run a specific migration by key");

program.parse();

const options = program.opts();

if (options.version) {
  console.log(`alloy migration util v${require("./package.json").version}`);
}

if (options.all) {
  runMigration({
    cwd: process.cwd(),
    migrationFilePath: require.resolve("./migrations/_all.js"),
  });
}

if (options.migrate) {
  if (options.migrate === "001") {
    runMigration({
      cwd: process.cwd(),
      migrationFilePath: require.resolve("./migrations/001-gitignore.js"),
    });
  }
  if (options.migrate === "002") {
    runMigration({
      cwd: process.cwd(),
      migrationFilePath: require.resolve("./002.js"),
    });
  }
}

if (options.list || options.listAll) {
  const definitions = require("./migrations/_definitions.json");

  if (options.listAll) {
    const defs = definitions.map((def) => {
      const key = `- ${def.key}`;
      return chalk`{bold ${key}:} ${def.description}`;
    });

    console.log(
      `${chalk.green.bold("All Migrations:")}
${defs.join("\n")}`
    );
  }
}
