import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import rateLimit from '../../../utils/rate-limit'
import SimpleSchema from 'simpl-schema'

// security
import { userIsInRole, userLoggedIn } from '../../../utils/security'
// responses
import { throwError, throwSuccess } from '../../../utils/responses'

// Find
export const findRoles = new ValidatedMethod({
  name: 'core.admin.findRoles',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    selector: {
      type: Object,
      blackbox: true,
      optional: true,
    },
    options: {
      type: Object,
      blackbox: true,
      optional: true,
    },
  }).validator(),
  run({ selector, options }) {
    if (Meteor.isServer) {
      try {
        const data = Meteor.roles.find({ selector, options }).fetch()
        return throwSuccess.general({ status: 200, data: data })
      } catch (error) {
        throwError(error)
      }
    }
  },
})

rateLimit({
  methods: [findRoles],
})
