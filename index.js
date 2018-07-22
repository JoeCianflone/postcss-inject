const postcss = require('postcss');
const _ = require('lodash');
const find = require('./utilities/find');
const normalize = require('./utilities/normalize');
const buildClassList = require('./utilities/buildClassList');

const defaultOptions = {
  allowFromMediaQueries: true,
}

module.exports = postcss.plugin('postcss-inject', options => {
  return css => {
    options = Object.assign({}, defaultOptions, options);
    const lookup = buildClassList(css);

    css.walkRules(rule => {
      rule.walkAtRules('inject', atRule => {
        const decls = _(postcss.list.space(atRule.params))
          .flatMap(cssClass => {
            return find(normalize(cssClass), lookup, options, message => {
              return atRule.error(message);
            });
          })
          .value();

        atRule.before(decls)
              .remove();
      });
    });
  };
});
