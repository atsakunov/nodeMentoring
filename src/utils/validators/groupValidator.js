import Joi from '@hapi/joi';

const groupSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  permission: Joi.array().items(Joi.string())
    .required(),
});

export {
  groupSchema,
};
