const Joi = require('joi');

const createProductSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Product name must be a string',
        'string.empty': 'Product name is required',
        'any.required': 'Product name is required',
    }),
    price: Joi.number().required().messages({
        'number.base': 'Price must be a number',
        'number.empty': 'Price is required',
        'any.required': 'Price is required',
    }),
});

const updateProductSchema = Joi.object({
    name: Joi.string().messages({
        'string.base': 'Product name must be a string',
    }),
    price: Joi.number().messages({
        'number.base': 'Price must be a number',
    }),
});

module.exports = {
    createProductSchema,
    updateProductSchema,
};
