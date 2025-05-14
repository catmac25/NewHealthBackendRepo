// const Joi = require("joi");
// const registerValidationSchema = Joi.object({
//     name: Joi.string().min(3).required(),
//     phone : Joi.integer().required(),
//     email: Joi.string().required(),
//     password: Joi.string().min(4).required(),
//     address: Joi.string().required(),
//     gender: Joi.string().valid("Male", "Female", "ThirdGender").required()
// });

// const validateRegistration = (req, res, next) => {
//     const {error} = registerValidationSchema.validate(req.body);
//     if (error){
//         return res.status(400).json({message: error.details[0].message, success:false});
//     }
//     next()
// };

// module.exports = validateRegistration;