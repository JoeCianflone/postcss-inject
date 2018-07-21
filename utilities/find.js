const _ = require('lodash');

const find = (toApply, lookup, options, onError) => {
  const items = _.get(lookup, toApply, []);

  if (_.isEmpty(items)) {
    throw onError(`\`@inject\` No class named ${items}`);
  } else if (items.length > 1) {
    throw onError(`\`@inject\` Too many classes named ${items} not sure which to pick`);
  }

  [item] = items;

  if (! options.allowFromMediaQueries) {
    if (item.parent.type !== 'root') {
      throw onError(`\`@inject\` cannot be used with ${toApply} because ${toApply} is nested inside of an at-rule (@${item.parent.name}).`)
    }
  }

  return item.clone().nodes;
}

module.exports = find;
