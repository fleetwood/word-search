const helpers = () => {
  return {
    customHelper: (name) => {
      return `I\'m helping ${name}`
    }
    , pillBadge: (val) => {
      return val>30
        ? 'badge-danger'
        : val>20
        ? 'badge-success'
        : val>10
        ? 'badge-info'
        : 'badge-primary';
    }
    , select: (val, comp) => {
      return val == comp 
        ? 'selected'
        : ''
    }
  }
}

module.exports = helpers
