const getMeta = require('../utils/get-meta');
const logger = require('../utils/logger');
const keyCheck = require('../utils/key-check');

const DEFINITION = getMeta('002');

migrate(DEFINITION.key, ({ transform, after }) => {
  let run = false;
  transform(
    `${DEFINITION.key}: ${DEFINITION.description}`,
    '.gitignore',
    ({ source, abort }) => {
      if (keyCheck(DEFINITION.key)) {
        return abort();
      }

      run = true;
      return `${source}\n# This is a second test`;
    },
  );
  after(() => {
    if (run) logger(DEFINITION.key);
  });
});

module.exports = migrate;
