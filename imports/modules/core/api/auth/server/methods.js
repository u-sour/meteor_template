import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import SimpleSchema from 'simpl-schema'

// schema
import { InsertSchema, UpdateSchema, UpdateProfileSchema } from '../schema'
// security
import { userIsInRole, userLoggedIn } from '../../../utils/security'
// responses
import { throwError, throwSuccess } from '../../../utils/responses'
// message prefix
const messagePrefix = 'core.messages.auth'

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
  run({ selector, options }) {
    if (Meteor.isServer) {
      return Meteor.users.find(selector, options).fetch()
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

// Find user profile
// export const findUserProfileImage = new ValidatedMethod({
//   name: 'core.admin.findUserProfileImage',
//   mixins: [CallPromiseMixin],
//   validate: new SimpleSchema({
//     _id: String,
//   }).validator(),
//   run({ _id }) {
//     if (Meteor.isServer) {
//       let profileImage = FileImages.findOne({ _id })
//       if (profileImage) {
//         profileImage.url = FileImages.findOne({ _id }).url()
//       }

//       return profileImage
//     }
//   },
// })

// Insert
export const insertUser = new ValidatedMethod({
  name: 'core.admin.insertUser',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    user: InsertSchema,
  }).validator(),
  run({ user }) {
    if (Meteor.isServer) {
      // Check role
      // userIsInRole(['super', 'admin'])

      try {
        // Add new user
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
            roles: user.roles,
            status: user.status,
          },
        })

        // Add roles
        Roles.addUsersToRoles(userId, user.roles)

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
      // Check role
      userIsInRole(['super', 'admin'])

      try {
        // Update user
        Meteor.users.update(
          { _id: user._id },
          {
            $set: {
              username: user.username,
              'emails.0.address': user.email,
              profile: {
                firstName: user.firstName,
                lastName: user.lastName,
                about: user.about,
                company: user.company,
                job: user.job,
                address: user.address,
                phoneNumber: user.phoneNumber,
                roles: user.roles,
                status: user.status,
              },
            },
          }
        )
        // Update roles
        Roles.setUserRoles(user._id, user.roles)

        // Update password
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
        // Check authorization
        userLoggedIn()

        // Update profile
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
      // Check role
      userIsInRole(['super'])

      try {
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

// check current password with new password
//export const checkUserCurrentPassword = new ValidatedMethod({
//     name: 'core.admin.checkUserCurrentPassword',
//     mixins: [CallPromiseMixin],
//     validate: new SimpleSchema({
//         password: String,
//     }).validator(),
//     run({ password }) {
//         if (Meteor.isServer) {
//             let digest = Package.sha.SHA256(password)
//             let user = Meteor.user()
//             let passwordOpts = { digest: digest, algorithm: 'sha-256' }
//             // try {
//             let result = Accounts._checkPassword(user, passwordOpts)
//             // Accounts._checkPassword(user, passwordOpts)
//             // return true;
//             return result;
//             // } catch (e) {
//             //     throwError(e)
//             // }
//         }
//     },
// })
