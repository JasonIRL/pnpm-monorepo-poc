const getMeta = require('../utils/get-meta');
const logger = require('../utils/logger');

const DEFINITION = getMeta('003');

const mappings = require('./003-color-var-mappings.json');

migrate(DEFINITION.key, ({ transform, after }) => {
  const issues = {
    issue:
      'The following semantic slots were not found in the mappings file, and will need to be manually updated.',
    unmatchedTokens: [],
  };

  transform(
    `${DEFINITION.key}: ${DEFINITION.description}`,
    '**/*.scss',
    ({ source, fileName }) => {
      const { tokenized, unmatchedTokens } = swapSlotForToken(source, fileName);

      if (unmatchedTokens?.length) {
        issues.unmatchedTokens = [
          ...issues.unmatchedTokens,
          ...unmatchedTokens,
        ];
      }

      if (tokenized !== source) {
        const noPrefix = removeGetSemanticSlotPrefixes(tokenized);
        const replaced = swapGetSemanticSlotForVariables(noPrefix);

        return replaced;
      }

      return source;
    },
  );
  after(() => logger(DEFINITION.key, issues));
});

/**
 *
 * @param {string} source
 * @returns {{tokenized: string, unmatchedTokens: string[]}}
 */
function swapSlotForToken(source, fileName) {
  // Regex to find the contents within a get-semantic-slot call
  const matches = source.match(/(?<=get-semantic-slot\()([\S\s])*?(?=\))/g);

  if (!matches) return source;

  let tokenized = source;
  const unmatchedTokens = [];

  for (const match of matches) {
    // get-semantic-slot can take a theme-name param, we don't need it, so it can be ignored
    const split = match.trim().split(',');
    const lookup = split[0].replace(/["']/g, '');

    // Find the mapped token
    const replacement = mappings.find((item) => item.slot === lookup);

    if (replacement) {
      tokenized = tokenized.replace(match, replacement.token);
    } else {
      unmatchedTokens.push({ semanticSlotName: lookup, fileName });
    }
  }

  return { tokenized, unmatchedTokens };
}

function removeGetSemanticSlotPrefixes(input) {
  return input.replace(/[\w'-.]+(?=\get-semantic-slot)/g, '');
}

function swapGetSemanticSlotForVariables(input) {
  return input.replace(/get-semantic-slot\(/g, 'var(');
}
