import stylus from 'stylus';
import path from 'path';
import css from 'css';

const KEY = '__jest-stylus__';

const getNodes = (node, nodes = []) => {
  if (node.getAttribute || node.props) {
    nodes.push(node);
  }
  if (node.childNodes || node.children) {
    Array.from(node.childNodes || node.children).forEach(child => getNodes(child, nodes));
  }
  return nodes;
};

/* eslint-disable no-param-reassign */
const markNodes = nodes => nodes.forEach((node) => { node[KEY] = true; });

const filterRule = (classes, rule) => {
  // skip everything that is not media or rule
  if (['media', 'rule'].indexOf(rule.type) < 0) {
    return false;
  }
  if (rule.type === 'media') {
    rule.rules = rule.rules.filter(filterRule.bind(null, classes));
    // remove empty media
    if (rule.rules.length) {
      return true;
    }
    return false;
  }
  const selector = rule.selectors.join('');
  return classes.some(className => new RegExp(`\\.${className}($| |,)`).exec(selector));
};
/* eslint-enable no-param-reassign */

export default paths => paths && paths.length && expect.addSnapshotSerializer({
  test(val) {
    return val && !val[KEY] && (val.getAttribute || val.$$typeof === Symbol.for('react.test.json'));
  },

  print(val, print) {
    const nodes = getNodes(val);
    markNodes(nodes);

    let stylePaths = paths;
    if (!Array.isArray(stylePaths)) {
      stylePaths = [stylePaths];
    }
    const parser = stylus('').set('paths', [path.resolve('node_modules')]);
    stylePaths.forEach(style => parser.import(style));

    let classes = [];
    nodes.forEach((node) => {
      const className = (node.props && node.props.className) || (node.getAttribute && node.getAttribute('class'));
      if (className) {
        classes = classes.concat(className.split(' '));
      }
    });

    let styles = '';
    parser.render((err, cssAsString) => {
      if (err) {
        throw err;
      }
      const cssObj = css.parse(cssAsString);
      cssObj.stylesheet.rules = cssObj.stylesheet.rules.filter(filterRule.bind(null, classes));
      const styleAsString = css.stringify(cssObj).trim();
      if (styleAsString !== '') {
        styles = `${styleAsString}\n\n`;
      }
    });

    const code = print(val);
    return `${styles}${code}`;
  },
});
