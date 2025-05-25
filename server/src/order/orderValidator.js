const {body, validationResult} = require("express-validator")

const createOrderValidator = [
    body('amount').isInt(),
    body('tabId').isInt(),
    body('redirectUrl').isString(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
        next()
    }
]

module.exports = {createOrderValidator};
