const Joi = require('joi');

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
});

const updateProductSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
});

module.exports = {
    createProductSchema,
    updateProductSchema,
};
