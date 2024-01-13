import { Meteor } from 'meteor/meteor'
import { isString, isArray, intersection } from 'lodash'
const messagePrefix = 'core.messages.auth'
export const userLoggedIn = () => {
  if (Meteor.userId()) {
    return true
  }
  throw new Meteor.Error(401, `${messagePrefix}.401`, 'Authorization required')
}

export const userIsInRole = (roles) => {
  let currentUserRoles = Meteor.user()
  currentUserRoles =
    (currentUserRoles &&
      currentUserRoles.profile &&
      currentUserRoles.profile.roles) ||
    []
  let userRoles = ['super']
  if (isString(roles)) {
    userRoles.push(roles)
  } else if (isArray(roles)) {
    userRoles = userRoles.concat(roles)
  }
  let result = intersection(currentUserRoles, userRoles)

  if (result.length) {
    return true
  }
  throw new Meteor.Error(403, `${messagePrefix}.403`, 'Forbidden')
}
