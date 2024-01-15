import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import ChildRoles from '../collection'
import { cloneDeep } from 'lodash'
import rateLimit from '../../../utils/rate-limit'
import SimpleSchema from 'simpl-schema'

// schema
import Schema from '../../child-roles/schema'
// security
import { userIsInRole, userLoggedIn } from '../../../utils/security'
// responses
import { throwError, throwSuccess } from '../../../utils/responses'
// message prefix
const messagePrefix = 'core.messages.transaction'

// Find
export const findChildRoles = new ValidatedMethod({
  name: 'core.admin.findChildRoles',
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
        const data = ChildRoles.find({ selector, options }).fetch()
        return throwSuccess.general({ status: 200, data: data })
      } catch (error) {
        throwError(error)
      }
    }
  },
})

// Find One
export const findOneChildRole = new ValidatedMethod({
  name: 'core.admin.findOneChildRole',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String,
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      try {
        const data = ChildRoles.findOne({ _id })
        return throwSuccess.general({ status: 200, data })
      } catch (error) {
        throwError(error)
      }
    }
  },
})

// Insert
export const insertChildRole = new ValidatedMethod({
  name: 'core.admin.insertChildRole',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    doc: Schema,
  }).validator(),
  run({ doc }) {
    if (Meteor.isServer) {
      try {
        // check authorization
        userIsInRole(['super', 'admin'])
        // insert
        ChildRoles.insert(doc)
        return throwSuccess.general({
          status: 201,
          message: `${messagePrefix}.saved`,
        })
      } catch (error) {
        throwError(error)
      }
    }
  },
})

// Update
export const updateChildRole = new ValidatedMethod({
  name: 'core.admin.updateChildRole',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    doc: cloneDeep(Schema).extend({
      _id: {
        type: String,
      },
    }),
  }).validator(),
  run({ doc }) {
    if (Meteor.isServer) {
      try {
        // check authorization
        userIsInRole(['super', 'admin'])
        // update
        ChildRoles.update(doc._id, { $set: doc })
        return throwSuccess.general({
          status: 201,
          message: `${messagePrefix}.edited`,
        })
      } catch (error) {
        throwError(error)
      }
    }
  },
})

// Remove
export const removeChildRole = new ValidatedMethod({
  name: 'core.admin.removeChildRole',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      try {
        // check authorization
        userIsInRole(['super'])
        // remove
        ChildRoles.remove({ _id })
        return throwSuccess.general({
          status: 204,
          message: `${messagePrefix}.removed`,
        })
      } catch (error) {
        throwError(error)
      }
    }
  },
})

rateLimit({
  methods: [
    findChildRoles,
    findOneChildRole,
    insertChildRole,
    updateChildRole,
    removeChildRole,
  ],
})
