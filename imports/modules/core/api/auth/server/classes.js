import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import SimpleSchema from 'simpl-schema'

// schema
import { InsertSchema, UpdateSchema } from "../schema";
// security
import { userIsInRole } from '../../../utils/security'
// responses
import { throwError } from '../../../utils/responses'

class Admin {
    // Find
    findUsers = new ValidatedMethod({
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
    findOneUser = new ValidatedMethod({
        name: 'core.admin.findOneUser',
        mixins: [CallPromiseMixin],
        validate: new SimpleSchema({
            _id: String,
        }).validator(),
        run({ _id }) {
            if (Meteor.isServer) {
                return Meteor.users.findOne({ _id })
            }
        },
    })

    // Find user profile
    findUserProfileImage = new ValidatedMethod({
        name: 'core.admin.findUserProfileImage',
        mixins: [CallPromiseMixin],
        validate: new SimpleSchema({
            _id: String,
        }).validator(),
        run({ _id }) {
            if (Meteor.isServer) {
                let profilePic = FileImages.findOne({ _id })
                if (profilePic) {
                    profilePic.url = FileImages.findOne({ _id }).url()
                }

                return profilePic
            }
        },
    })

    // Insert
    insertUser = new ValidatedMethod({
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
                            status: user.status,
                            profilePic: user.profilePic,
                        },
                    })
                    // Add roles
                    Roles.addUsersToRoles(userId, user.roles)

                    return userId
                } catch (e) {
                    throwError(e)
                }
            }
        },
    })

    // Update
    updateUser = new ValidatedMethod({
        name: 'core.admin.updateUser',
        mixins: [CallPromiseMixin],
        validate: new SimpleSchema({
            user: UpdateSchema,
        }).validator(),
        run({ user }) {
            if (Meteor.isServer) {
                // Check role
                // userIsInRole(['super', 'admin'])

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
                                    status: user.status,
                                    profilePic: user.profilePic,
                                },
                            },
                        }
                    )
                    // Update roles
                    Roles.setUserRoles(user._id, user.roles)

                    // Update password
                    Accounts.setPassword(user._id, user.password, { logout: false })
                    if (user._id === Meteor.userId()) {
                        return 'logout'
                    }

                    return 'success'
                } catch (e) {
                    throwError(e)
                }
            }
        },
    })

    //Remove
    removeUser = new ValidatedMethod({
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
                    return Meteor.users.remove({ _id })
                } catch (e) {
                    throwError(e)
                }
            }
        },
    })
}

export default new Admin();

// class Authencation {
//     admin = new Admin();
// }
// const auth = new Authencation()
// export default auth;