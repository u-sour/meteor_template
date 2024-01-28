import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import RoleGroups from '../collection'
import { cloneDeep, extend } from 'lodash'
import rateLimit from '../../../../utils/rate-limit'
import SimpleSchema from 'simpl-schema'

// schema
import Schema from '../../groups/schema'
// security
import { userIsInAuthorization, userLoggedIn } from '../../../../utils/security'
// responses
import { throwError, throwSuccess } from '../../../../utils/responses'
// message prefix
const messagePrefix = 'core.messages.transaction'

// Find
export const findRoleGroups = new ValidatedMethod({
  name: 'core.admin.findRoleGroups',
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
  async run({ selector, options }) {
    if (Meteor.isServer) {
      try {
        selector = selector || {}
        options = options || { $sort: { _id: 1 } }
        const data = await RoleGroups.aggregate([
          { $match: selector },
          {
            $unwind: {
              path: '$routePermissions',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $unwind: {
              path: '$routePermissions.roles',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: 'core_roles',
              localField: 'routePermissions.roles',
              foreignField: '_id',
              as: 'routePermissions.roles',
            },
          },
          {
            $unwind: {
              path: '$routePermissions.roles',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: { route: '$routePermissions.route', roleGroupId: '$_id' },
              name: { $last: '$name' },
              route: { $last: '$routePermissions.route' },
              roles: { $push: '$routePermissions.roles' },
              status: { $last: '$status' },
            },
          },
          {
            $group: {
              _id: '$_id.roleGroupId',
              name: { $last: '$name' },
              routePermissions: { $push: { route: '$route', roles: '$roles' } },
              status: { $last: '$status' },
            },
          },
          options,
        ])
        return throwSuccess.general({ status: 200, data: data })
      } catch (error) {
        throwError(error)
      }
    }
  },
})

// Find One
export const findOneRoleGroup = new ValidatedMethod({
  name: 'core.admin.findOneRoleGroup',
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
        const data = RoleGroups.findOne(selector, options)
        return throwSuccess.general({ status: 200, data })
      } catch (error) {
        throwError(error)
      }
    }
  },
})

// Insert
export const insertRoleGroup = new ValidatedMethod({
  name: 'core.admin.insertRoleGroup',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({ doc: Schema }).validator(),
  run({ doc }) {
    if (Meteor.isServer) {
      try {
        // check authorization
        // valid: current user parentRoutePath = '/core/auth/admin/role-groups' & role = 02 (create)
        userIsInAuthorization({
          parentRoutePath: '/core/auth/admin/role-groups',
          roles: ['02'],
          isServer: true,
        })

        RoleGroups.insert(doc)
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
export const updateRoleGroup = new ValidatedMethod({
  name: 'core.admin.updateRoleGroup',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    doc: cloneDeep(Schema).extend({
      _id: { type: String },
    }),
  }).validator(),
  run({ doc }) {
    if (Meteor.isServer) {
      try {
        let { _id, routePermissions, status } = doc

        // check authorization
        // valid: current user rolePermissions.route = /core/auth/admin/role-groups & role = 03 (edit)
        userIsInAuthorization({
          parentRoutePath: '/core/auth/admin/role-groups',
          roles: ['03'],
          isServer: true,
        })

        //find users by role group _id
        Meteor.users.find({ 'profile.roleGroup': _id }).forEach((u) => {
          if (status === 'inactive') routePermissions = []
          // update users role group & routePermissions
          return Meteor.users.update(u._id, {
            $set: {
              'profile.roleGroup': _id,
              'profile.routePermissions': routePermissions,
            },
          })
        })

        // update
        RoleGroups.update(doc._id, { $set: doc })
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
export const removeRoleGroup = new ValidatedMethod({
  name: 'core.admin.removeRoleGroup',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      // check authorization
      // valid: current user rolePermissions.route = /core/auth/admin/role-groups & role = 04 (remove)
      userIsInAuthorization({
        parentRoutePath: '/core/auth/admin/role-groups',
        roles: ['04'],
        isServer: true,
      })

      //find users by role group _id
      Meteor.users.find({ 'profile.roleGroup': _id }).forEach((u) => {
        // update users role group & routePermissions
        return Meteor.users.update(u._id, {
          $set: { 'profile.roleGroup': '', 'profile.routePermissions': [] },
        })
      })

      // remove
      RoleGroups.remove({ _id })
      return throwSuccess.general({
        status: 204,
        message: `${messagePrefix}.removed`,
      })
    }
  },
})

rateLimit({
  methods: [
    findRoleGroups,
    findOneRoleGroup,
    insertRoleGroup,
    updateRoleGroup,
    removeRoleGroup,
  ],
})
