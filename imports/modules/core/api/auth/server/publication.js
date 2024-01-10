import { Meteor } from 'meteor/meteor'

// Users
Meteor.publish('core.users', (selector = {}, options = {}) => {
  return Meteor.users.find(selector, options)
})

// Roles
// Meteor.publish('core.roles', function () {
//   return Meteor.roles.find({})
// })
