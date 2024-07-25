const getMeta = require('../utils/get-meta');
const logger = require('../utils/logger');
const keyCheck = require('../utils/key-check');
const prettier = require('prettier');

const DEFINITION = getMeta('003');

migrate(DEFINITION.key, ({ transform, after }) => {
  let run = false;
  transform(
    `${DEFINITION.key}: ${DEFINITION.description}`,
    '**/*.js',
    ({ source, fileName }) => {
      // await prettier.format(source, { parser: "babel" });
      run = true;
      //   console.log({ files: `${process.cwd()}/${fileName}` });
      return source;
    },
  );
  after(() => {
    if (run) {
      logger(DEFINITION.key);
    }
  });
});
