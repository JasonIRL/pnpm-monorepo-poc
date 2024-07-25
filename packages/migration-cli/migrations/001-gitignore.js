const getMeta = require("../utils/get-meta");
const logger = require("../utils/logger");
const keyCheck = require("../utils/key-check");

const DEFINITION = getMeta("001");

migrate(DEFINITION.key, ({ transform, after }) => {
  let run = false;
  transform(
    `${DEFINITION.key}: ${DEFINITION.description}`,
    ".gitignore",
    ({ source, abort }) => {
      if (keyCheck(DEFINITION.key)) {
        return abort();
      }
      run = true;
      return `# This is a test\n${source}`;
    }
  );
  after(() => {
    if (run) {
      logger(DEFINITION.key);
    }
  });
});

module.exports = migrate;
