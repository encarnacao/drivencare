import Joi from "joi";

const doctorSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    registration: Joi.string().max(6).required(),
    specialty: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
});


export default doctorSchema;