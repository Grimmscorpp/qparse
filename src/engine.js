function engineIsNode() {
  try {
    return this === global;
  } catch (e) { return false; }
}

function engineIsBrowser() {
  try {
    return this === window;
  } catch (e) { return false; }
}

module.exports = {
  isNode: engineIsNode(),
  isBrowser: engineIsBrowser()
};
