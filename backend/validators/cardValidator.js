import joi from 'joi'

const createCardSchema = joi.object({
    question: joi.string().min(3).required(),
    answer: joi.string().min(3).required(),
    tag: joi.string().min(3).max(30).optional()
})

export {createCardSchema}