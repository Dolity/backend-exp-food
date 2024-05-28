const { Router } = require('express')
const app = Router()

app.use(require('./auth'))
app.use(require('./user'))
// app.use(require('./admin'))

module.exports = app