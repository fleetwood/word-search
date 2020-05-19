const routes = [
  'lux'
  , 'buttons'
  , 'containers'
  , 'dialogs'
  , 'forms'
  , 'indicators'
  , 'navbar'
  , 'navs'
  , 'progress'
  , 'tables'
  , 'typography'
];

const helpers = () => {
  return {
    routes,
    pillBadge: (val) => {
      return val >= 20
        ? 'badge-danger'
        : val >= 15
          ? 'badge-success'
          : val >= 10
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
    , total: (val) => {
      return val ? `(${val})` : '(0)';
    }
    , luxes: () => {
      let button = (route) => `<button type="button" onclick="document.location.href='/${route}'" class="btn btn-primary btn-lg btn-block">${route}</button>`;
      let results = '';
      routes.map(route => results += button(route));
      return results;
    }
  }
}

module.exports = helpers
