module.exports = (app) => {
  app.get("/", (req, res, next) => {
    res.send("Hello World")
  })

  app.get("/search", (req, res, next) => {
    res.send("this is the search page")
  })
}