import { Meteor } from 'meteor/meteor'
import { EJSON } from 'meteor/ejson'
import RoleGroups from '../../api/authorization/groups/collection'
import Roles from '../../api/authorization/roles/collection'

Meteor.startup(function () {
  // Super User
  const superUserDoc = Meteor.users.findOne({ username: 'super' })
  if (!superUserDoc) {
    const data = EJSON.parse(Assets.getText('super.json'))
    data.forEach(({ username, email, password, profile }) => {
      const userExists = Accounts.findUserByUsername(username)
      if (!userExists) {
        const userId = Accounts.createUser({
          username,
          email,
          password,
          profile,
        })

        // Role Groups
        if (RoleGroups.find().count() === 0) {
          let roleGroups = EJSON.parse(Assets.getText('group-roles.json'))
          roleGroups.forEach((rg) => {
            rg.createdAt = new Date()
            rg.createdBy = userId
          })
          RoleGroups.rawCollection().insertMany(roleGroups)
        }

        // Roles
        if (Roles.find().count() === 0) {
          let roles = EJSON.parse(Assets.getText('roles.json'))
          roles.forEach((r) => {
            r.createdAt = new Date()
            r.createdBy = userId
          })
          Roles.rawCollection().insertMany(roles)
        }
      }
    })
  } else {
    // Role Groups
    if (RoleGroups.find().count() === 0) {
      let roleGroups = EJSON.parse(Assets.getText('group-roles.json'))
      roleGroups.forEach((rg) => {
        rg.createdAt = new Date()
        rg.createdBy = superUserDoc._id
      })
      RoleGroups.rawCollection().insertMany(roleGroups)
    }

    // Roles
    if (Roles.find().count() === 0) {
      let roles = EJSON.parse(Assets.getText('roles.json'))
      roles.forEach((r) => {
        r.createdAt = new Date()
        r.createdBy = superUserDoc._id
      })
      Roles.rawCollection().insertMany(roles)
    }
  }
})
