import joi from 'joi'

const registerSchema = joi.object({
    userName: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email({
        minDomainSegments:2,
        tlds: {allow : ['com', 'net' ]}
    }),
    password: joi.string().min(8).max(24).required()
})

export {registerSchema}