import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import rateLimit from '../../../utils/rate-limit'
import SimpleSchema from 'simpl-schema'

// schema
import { InsertSchema, UpdateSchema, UpdateProfileSchema } from '../schema'
// security
import { userIsInAuthorization, userLoggedIn } from '../../../utils/security'
// responses
import { throwError, throwSuccess } from '../../../utils/responses'
// message prefix
export const messagePrefix = 'core.messages.auth'

// Find
export const findUsers = new ValidatedMethod({
  name: 'core.admin.findUsers',
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
        options = options || { $sort: { createdAt: 1 } }
        const data = await Meteor.users
          .rawCollection()
          .aggregate(
            [
              { $match: selector },
              {
                $lookup: {
                  from: 'core_roleGroups',
                  localField: 'profile.roleGroup',
                  foreignField: '_id',
                  as: 'profile.roleGroup',
                },
              },
              {
                $unwind: {
                  path: '$profile.roleGroup',
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $group: {
                  _id: '$_id',
                  createdAt: { $last: '$createdAt' },
                  services: { $last: '$services' },
                  username: { $last: '$username' },
                  emails: { $last: '$emails' },
                  profile: { $last: '$profile' },
                },
              },
              {
                $unwind: {
                  path: '$profile.routePermissions',
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $unwind: {
                  path: '$profile.routePermissions.roles',
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: 'core_roles',
                  localField: 'profile.routePermissions.roles',
                  foreignField: '_id',
                  as: 'profile.routePermissions.roles',
                },
              },
              {
                $unwind: {
                  path: '$profile.routePermissions.roles',
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $group: {
                  _id: {
                    route: '$profile.routePermissions.route',
                    userId: '$_id',
                  },
                  createdAt: { $last: '$createdAt' },
                  services: { $last: '$services' },
                  username: { $last: '$username' },
                  emails: { $last: '$emails' },
                  profile: { $last: '$profile' },
                  route: { $last: '$profile.routePermissions.route' },
                  roles: { $push: '$profile.routePermissions.roles' },
                },
              },
              {
                $group: {
                  _id: '$_id.userId',
                  createdAt: { $last: '$createdAt' },
                  services: { $last: '$services' },
                  username: { $last: '$username' },
                  emails: { $last: '$emails' },
                  profile: { $last: '$profile' },
                  routePermissions: {
                    $push: { route: '$route', roles: '$roles' },
                  },
                },
              },
              {
                $set: { 'profile.routePermissions': '$routePermissions' },
              },
              {
                $unset: ['routePermissions'],
              },
              options,
            ],
            { allowDiskUse: true }
          )
          .toArray()

        return throwSuccess.general({ status: 200, data })
      } catch (error) {
        throwError(error)
      }
    }
  },
})

// Find One
export const findOneUser = new ValidatedMethod({
  name: 'core.admin.findOneUser',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String,
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      const data = Meteor.users.findOne({ _id })
      return throwSuccess.general({ status: 200, data })
    }
  },
})

// Insert
export const insertUser = new ValidatedMethod({
  name: 'core.admin.insertUser',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    user: InsertSchema,
  }).validator(),
  run({ user }) {
    if (Meteor.isServer) {
      try {
        // insert
        const userId = Accounts.createUser({
          username: user.username,
          email: user.email,
          password: user.password,
          profile: {
            firstName: user.firstName,
            lastName: user.lastName,
            about: user.about,
            company: user.company,
            job: user.job,
            address: user.address,
            phoneNumber: user.phoneNumber,
            roleGroup: user.roleGroup,
            routePermissions: user.routePermissions,
            status: user.status,
          },
        })

        // add roles
        // Roles.addUsersToRoles(userId, user.roles)

        return throwSuccess.general({
          status: 201,
          data: { userId },
          message: `${messagePrefix}.signedUp`,
        })
      } catch (e) {
        throwError(e)
      }
    }
  },
})

// Update
export const updateUser = new ValidatedMethod({
  name: 'core.admin.updateUser',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    user: UpdateSchema,
  }).validator(),
  run({ user }) {
    if (Meteor.isServer) {
      // check authorization
      // valid: current user rolePermissions.route = /core/auth/admin/users & role = 03 (edit)
      userIsInAuthorization({
        parentRoutePath: '/core/auth/admin/users',
        roles: ['03'],
        isServer: true,
      })

      try {
        // update user
        Meteor.users.update(
          { _id: user._id },
          {
            $set: {
              username: user.username,
              'emails.0.address': user.email,
              'profile.firstName': user.firstName,
              'profile.lastName': user.lastName,
              'profile.about': user.about,
              'profile.company': user.company,
              'profile.job': user.job,
              'profile.address': user.address,
              'profile.phoneNumber': user.phoneNumber,
              'profile.roleGroup': user.roleGroup,
              'profile.routePermissions': user.routePermissions,
              'profile.status': user.status,
            },
          }
        )

        // update password
        if (user.password) {
          Accounts.setPassword(user._id, user.password, { logout: false })
          if (user._id === Meteor.userId()) {
            return 'logout'
          }
        }

        return throwSuccess.general({
          status: 204,
          message: `${messagePrefix}.edited`,
        })
      } catch (e) {
        throwError(e)
      }
    }
  },
})

// Update Profile
export const updateProfile = new ValidatedMethod({
  name: 'core.admin.updateProfile',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    user: UpdateProfileSchema,
  }).validator(),
  async run({ user }) {
    if (Meteor.isServer) {
      try {
        // check authentication
        userLoggedIn()
        // update
        Meteor.users.update(
          { _id: user._id },
          {
            $set: {
              username: user.username,
              'emails.0.address': user.email,
              'profile.firstName': user.firstName,
              'profile.firstName': user.firstName,
              'profile.lastName': user.lastName,
              'profile.about': user.about,
              'profile.company': user.company,
              'profile.job': user.job,
              'profile.address': user.address,
              'profile.phoneNumber': user.phoneNumber,
              'profile.profileImage': user.profileImage,
              'profile.status': user.status,
            },
          }
        )
        // Update roles
        // Roles.setUserRoles(user._id, user.roles)

        // Update password
        // Accounts.setPassword(user._id, user.password, { logout: false })
        // if (user._id === Meteor.userId()) {
        //     return 'logout'
        // }

        return throwSuccess.updateProfile()
      } catch (e) {
        throwError(e)
      }
    }
  },
})

//Remove
export const removeUser = new ValidatedMethod({
  name: 'core.admin.removeUser',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      try {
        // check authorization
        // valid: current user rolePermissions.route = /core/auth/admin/users & role = 04 (remove)
        userIsInAuthorization({
          parentRoutePath: '/core/auth/admin/users',
          roles: ['04'],
          isServer: true,
        })

        // remove
        Meteor.users.remove({ _id })
        return throwSuccess.general({
          status: 204,
          message: `${messagePrefix}.removed`,
        })
      } catch (e) {
        throwError(e)
      }
    }
  },
})

// check user exist
export const checkUserExisted = new ValidatedMethod({
  name: 'core.admin.checkUserExisted',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    selector: {
      type: Object,
      blackbox: true,
    },
  }).validator(),
  run({ selector }) {
    if (Meteor.isServer) {
      try {
        return Meteor.users.findOne(selector)
      } catch (e) {
        throwError(e)
      }
    }
  },
})

rateLimit({
  methods: [
    findUsers,
    findOneUser,
    insertUser,
    updateUser,
    updateProfile,
    removeUser,
  ],
})
