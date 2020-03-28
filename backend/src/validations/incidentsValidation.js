const { celebrate, Segments, Joi } = require('celebrate')

function index() {
  return celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().integer()
    })
  })
}

function create() {
  return celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required()
    })
  })
}

function del() {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  })
}

module.exports = {
  index,
  create,
  del
}