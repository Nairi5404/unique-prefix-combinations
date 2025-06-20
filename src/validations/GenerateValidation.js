import Joi from 'joi';

export const generateValidation = Joi.object({
    items: Joi.array().items(Joi.number().integer()).required(),
    length: Joi.number().integer().min(1).required()
}).strict();
