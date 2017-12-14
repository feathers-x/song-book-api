const { authenticate } = require('@feathersjs/authentication').hooks;
const setUsername = require('./set-username.hook')
const copyEmailToEmailService = require('./copy-email-to-email-service.hook')

const {
 hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [],
    create: [
       hashPassword(),
       setUsername()            
      ],
    update: [ hashPassword() ],
    patch: [ hashPassword() ],
    remove: []
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      copyEmailToEmailService()      
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};