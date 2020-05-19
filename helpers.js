const values = require('./data/values.json');

const helpers = () => {
  return {
    pillBadge: (val) => {
      return val>=20
        ? 'badge-danger'
        : val>=15
        ? 'badge-success'
        : val>=10
        ? 'badge-info'
        : 'badge-primary';
    }
    , select: (val, comp) => {
      return val == comp 
        ? 'selected'
        : ''
    }
    , isArray: (val) => {
      return Array.isArray(val) && val.length > 0;
    }
    , letterizer: (word) => {
      return word.split('').map(r=>`<letter>${r}<sub>${values[r]}</sub></letter>`).join('');
    }
    , total: (val) => {
      return val ? `(${val})` : '(0)';
    }
  }
}

module.exports = helpers
