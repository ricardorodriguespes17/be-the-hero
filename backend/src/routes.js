const express = require('express')
const ongController = require('./controllers/ongController')
const incidentsController = require('./controllers/incidentsController')
const profileController = require('./controllers/profileController')
const sessionController = require('./controllers/sessionController')

const routes = express.Router()

/* Session Routes */
routes.post('/session', sessionController.create)

/* Ongs Routes */
routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create)

/* Incidents Routes */
routes.get('/incidents', incidentsController.index)
routes.post('/incidents', incidentsController.create)
routes.delete('/incidents/:id', incidentsController.del)

/* Profile Routes */
routes.get('/profile/incidents', profileController.index)

module.exports = routes