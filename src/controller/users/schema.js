'use strict'
const joi =  require('joi')


const createUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(16).required(),
  username: joi.string().required(),
  role: joi.string().required(),
})


module.exports = {createUserSchema}
