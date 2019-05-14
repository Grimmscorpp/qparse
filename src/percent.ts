/**
 * Percent encodes a given string.
 * @param {string} string The string to encode
 */
function encode(string) {
  try {
    return encodeURIComponent(string);
  } catch (e) { return string; }
}

/**
 * Percent decodes a given string.
 * @param {string} string The string to decode
 */
function decode(string) {
  try {
    return decodeURIComponent(string);
  } catch (e) { return string; }
}

module.exports = {
  encode,
  decode
}
