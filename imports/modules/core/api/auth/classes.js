import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import SimpleSchema from 'simpl-schema'

// schema
import { InsertSchema, UpdateSchema } from "./schema";
// security
import { userIsInRole, throwError } from '../../utils/security'

class Admin {
    // Find
    findUsers = new ValidatedMethod({
        name: 'core.findUsers',
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
        name: 'core.findOneUser',
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
        name: 'core.findUserProfileImage',
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
        name: 'core.insertUser',
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
        name: 'core.updateUser',
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
        name: 'core.removeUser',
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

class User {

}

class Authencation {
    admin = new Admin();
}

export default new Authencation();
