const _ = require('lodash');

const buildClassList = css => {
  const classes = {};

  css.walkRules(rule => {
    if (!_.has(classes, rule.selector)) {
      classes[rule.selector] = [];
    }

    classes[rule.selector].push(rule);
  });

  return classes;
}

module.exports = buildClassList;
