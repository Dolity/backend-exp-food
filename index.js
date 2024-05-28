require('dotenv').config()
const logger = require('./helpers/winston')
const { Sequelize } = require('sequelize');
const express = require('express')
const router = require('./routers')

const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

// const syncModels = async () => {
//     await sequelize.sync({ force: false });
//     console.log('All models were synchronized successfully.');
// }

// syncModels()

app.use('/api', router)

const port = process.env.WEB_PORT || 3000
logger.info(`Server started on port ${port}`);
logger.info(`localhost:${port}`)
app.listen(port)
