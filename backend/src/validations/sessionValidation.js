const { celebrate, Segments, Joi } = require('celebrate')

function create() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  })
}

module.exports = {
  create
}