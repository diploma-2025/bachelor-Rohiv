const {body, validationResult} = require("express-validator")

const createTemplateValidator = [
    body('templateName').isString(),
    body('templateStreet').isString(),
    body('templatePhone').isArray(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
        next()
    }
]

module.exports = {
    createTemplateValidator,
}
