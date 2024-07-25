const migrationList = require("./_definitions.json");

for (const migration of migrationList) {
  const execute = require(`./${migration.file}`);

  () => execute();
}
