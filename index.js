const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
var ageValidateError = false
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

var ageMiddleware = function (req, res, next) {
  console.log(req.body.age)
  if (req.body.age == null || req.body.age === '') {
    return res.render('home', { ageValidateError: true })
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('home', { ageValidateError })
})

app.get('/major', (req, res) => {
  return res.render('major')
})

app.get('/minor', (req, res) => {
  return res.render('minor')
})

app.post('/check', ageMiddleware, (req, res) => {
  req.body.age >= 18 ? res.redirect('/major') : res.redirect('/minor')
})

app.listen(3000)
