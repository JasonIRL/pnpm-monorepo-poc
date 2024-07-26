module.exports = function getMeta(key) {
  return require('../migrations/_definitions.json').find(
    (def) => def.key === key,
  );
};
