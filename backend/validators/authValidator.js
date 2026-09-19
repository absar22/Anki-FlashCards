import joi from 'joi'

const registerSchema = joi.object({
    userName: joi.string().alphanum().min(3).max(30).required(),
    fullname: joi.string().min(3).max(30).required(),
    email: joi.string().email({
        minDomainSegments:2,
        tlds: {allow : ['com', 'net' ]}
    }),
    password: joi.string().min(8).max(24).required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})
export {registerSchema, loginSchema}