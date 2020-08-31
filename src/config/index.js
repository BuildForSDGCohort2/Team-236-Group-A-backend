'use strict'
const convict = require('convict')

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

if (process.env.NODE_ENV === 'development') require('dotenv').config()

convict.addFormat(require('convict-format-with-validator').url)

const config = convict({
  NODE_ENV: {
    doc: 'Node Env',
    default: process.env.NODE_ENV,
    env: 'NODE_ENV'
  },
  PORT: {
    doc: 'The port to bind.',
    format: 'port',
    default: process.env.PORT,
    env: 'PORT'
  },
  DB_URL: {
    doc: 'Mongodb url',
    env: 'DB_URL',
    default: process.env.DB_URL
  }
})

config.validate({ allowed: 'strict' })

module.exports = config
