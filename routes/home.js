const route = (req, res, next) => {
  const context = {
    title: "Word Search"
  }
  res.render('home', context)
}

module.exports = route
