const { Router } = require('express')
const app = Router()
const userAuthController = require('../controllers/user/userAuthController')

app.post('/register', userAuthController.register)
app.post('/login', userAuthController.login)

module.exports = app