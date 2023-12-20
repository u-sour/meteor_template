import { Meteor } from "meteor/meteor";
import { EJSON } from "meteor/ejson";
import { Roles } from 'meteor/alanning:roles'

Meteor.startup(function () {
    // Roles
    if (Roles.getAllRoles().count() === 0) {
        const data = EJSON.parse(Assets.getText('roles.json'))
        data.forEach(role => {
            Roles.createRole(role)
        })
    }
    // Super User
    if (!Meteor.users.findOne({ name: 'super' })) {
        const data = EJSON.parse(Assets.getText('super.json'))
        data.forEach(({ username, email, password, profile, roles }) => {
            const userExists = Accounts.findUserByUsername(username)

            if (!userExists) {
                const userId = Accounts.createUser({
                    username,
                    email,
                    password,
                    profile,
                })
                Roles.addUsersToRoles(userId, roles)
            }
        })
    }

});