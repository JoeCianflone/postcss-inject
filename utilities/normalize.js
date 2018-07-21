const _ = require('lodash');
const escape = require('css.escape');

const normalizeClasses = name => {
  return `.${escape(_.trimStart(name, '.'))}`;
}

module.exports = normalizeClasses;
