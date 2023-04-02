import Joi from "joi";

const doctorSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    registration: Joi.string().length(6).required(),
    specialty: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().length(2).required(),
});


export default doctorSchema;