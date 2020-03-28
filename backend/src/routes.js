const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const ongValidation = require('./validations/ongValidation')
const incidentsValidation = require('./validations/incidentsValidation')
const profileValidation = require('./validations/profileValidation')
const sessionValidation = require('./validations/sessionValidation')

const ongController = require('./controllers/ongController')
const incidentsController = require('./controllers/incidentsController')
const profileController = require('./controllers/profileController')
const sessionController = require('./controllers/sessionController')

const routes = express.Router()

/* Session Routes */
routes.post('/session', sessionValidation.create(), sessionController.create)

/* Ongs Routes */
routes.get('/ongs', ongController.index)
routes.post('/ongs', ongValidation.create(), ongController.create)

/* Incidents Routes */
routes.get('/incidents', incidentsValidation.index(), incidentsController.index)
routes.post('/incidents', incidentsValidation.create(), incidentsController.create)
routes.delete('/incidents/:id', incidentsValidation.del(), incidentsController.del)

/* Profile Routes */
routes.get('/profile/incidents', profileValidation.index(), profileController.index)

module.exports = routes