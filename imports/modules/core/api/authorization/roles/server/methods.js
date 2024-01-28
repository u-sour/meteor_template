import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import RoleGroups from '../../groups/collection'
import Roles from '../collection'
import { cloneDeep, extend, filter } from 'lodash'
import rateLimit from '../../../../utils/rate-limit'
import SimpleSchema from 'simpl-schema'

// schema
import Schema from '../../roles/schema'
import TimestampSchema from '../../../timestamp/schema'
// security
import { userIsInAuthorization, userLoggedIn } from '../../../../utils/security'
// responses
import { throwError, throwSuccess } from '../../../../utils/responses'
// message prefix
const messagePrefix = 'core.messages.transaction'

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
        selector = selector || {}
        options = options || {}
        const data = Roles.find(selector, options).fetch()
        return throwSuccess.general({ status: 200, data: data })
      } catch (error) {
        throwError(error)
      }
    }
  },
})

// Find One
export const findOneRole = new ValidatedMethod({
  name: 'core.admin.findOneRole',
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
        selector = selector || {}
        options = options || {}

        const data = Roles.findOne(selector, options)
        return throwSuccess.general({ status: 200, data })
      } catch (error) {
        throwError(error)
      }
    }
  },
})

// Insert
export const insertRole = new ValidatedMethod({
  name: 'core.admin.insertRole',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    doc: Schema,
  }).validator(),
  run({ doc }) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(300)
      try {
        // check authorization
        // valid: current user parentRoutePath = '/core/auth/admin/settings/roles' & role = 02 (create)
        userIsInAuthorization({
          parentRoutePath: '/core/auth/admin/settings/roles',
          roles: ['02'],
          isServer: true,
        })

        Roles.insert(doc)
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
export const updateRole = new ValidatedMethod({
  name: 'core.admin.updateRole',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    doc: cloneDeep(Schema).extend({
      _id: { type: String },
    }),
  }).validator(),
  run({ doc }) {
    if (Meteor.isServer) {
      try {
        const { _id, status } = doc

        // check authorization
        // valid: current user rolePermissions.route = /core/auth/admin/settings/roles & role = 03 (edit)
        userIsInAuthorization({
          parentRoutePath: '/core/auth/admin/settings/roles',
          roles: ['03'],
          isServer: true,
        })

        // check role status inactive
        if (status === 'inactive') {
          // remove role by _id inside routePermissions (role group collection)
          RoleGroups.find({
            routePermissions: { $elemMatch: { roles: _id } },
          }).forEach((rg) => {
            const newRoutePermissions = rg.routePermissions.map((rp) => {
              rp.roles = filter(rp.roles, (r) => r !== _id)
              return rp
            })
            return RoleGroups.update(rg._id, {
              $set: { routePermissions: newRoutePermissions },
            })
          })

          // remove role by _id inside 'profile.routePermissions' (users collection)
          Meteor.users
            .find({
              'profile.routePermissions': { $elemMatch: { roles: _id } },
            })
            .forEach((u) => {
              const newRoutePermissions = u.profile.routePermissions.map(
                (rp) => {
                  rp.roles = filter(rp.roles, (r) => r !== _id)
                  return rp
                }
              )
              return Meteor.users.update(u._id, {
                $set: { 'profile.routePermissions': newRoutePermissions },
              })
            })
        }

        // update
        Roles.update(doc._id, { $set: doc })
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
export const removeRole = new ValidatedMethod({
  name: 'core.admin.removeRole',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      try {
        // check authorization
        // valid: current user rolePermissions.route = /core/auth/admin/settings/roles & role = 04 (remove)
        userIsInAuthorization({
          parentRoutePath: '/core/auth/admin/settings/roles',
          roles: ['04'],
          isServer: true,
        })

        // remove role by _id inside routePermissions (role group collection)
        RoleGroups.find({
          routePermissions: { $elemMatch: { roles: _id } },
        }).forEach((rg) => {
          const newRoutePermissions = rg.routePermissions.map((rp) => {
            rp.roles = filter(rp.roles, (r) => r !== _id)
            return rp
          })
          return RoleGroups.update(rg._id, {
            $set: { routePermissions: newRoutePermissions },
          })
        })

        // remove role by _id inside 'profile.routePermissions' (users collection)
        Meteor.users
          .find({
            'profile.routePermissions': { $elemMatch: { roles: _id } },
          })
          .forEach((u) => {
            const newRoutePermissions = u.profile.routePermissions.map((rp) => {
              rp.roles = filter(rp.roles, (r) => r !== _id)
              return rp
            })
            return Meteor.users.update(u._id, {
              $set: { 'profile.routePermissions': newRoutePermissions },
            })
          })

        // remove
        Roles.remove({ _id })
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
  methods: [findRoles, findOneRole, insertRole, updateRole, removeRole],
})
