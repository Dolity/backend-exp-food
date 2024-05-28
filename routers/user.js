const { Router } = require('express')
const app = Router()
const serverStatusController = require('../controllers/serverStatusController')
const userSettingController = require('../controllers/user/userSettingController')

app.get('/health', serverStatusController.status)
app.post('/profile', userSettingController.profile)

module.exports = app