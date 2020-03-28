const { celebrate, Segments, Joi } = require('celebrate')

function index() {
  return celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown()
  })
}

module.exports = {
  index
}