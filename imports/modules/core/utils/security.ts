import { Meteor } from 'meteor/meteor'
import { intersection, find } from 'lodash'
import { User } from '../types/authentication'
const messagePrefix = 'core.messages.auth'

export const userLoggedIn = () => {
  if (Meteor.userId()) {
    return true
  }
  throw new Meteor.Error(401, `${messagePrefix}.401`, 'Authorization required')
}

interface UserIsInAuthorization {
  parentRoutePath: string,
  roles: string[],
  isServer?: boolean,
}

export const userIsInAuthorization = ({
  parentRoutePath,
  roles,
  isServer = false
}: UserIsInAuthorization) => {
  const currentUser = Meteor.user() as User
  const currentUserRoutePermissions =
    currentUser && currentUser.profile && currentUser.profile.routePermissions
  const currentUserRoles = find(currentUserRoutePermissions, o => o.route == parentRoutePath)?.roles
  let result = intersection(currentUserRoles, roles)

  if (isServer) {
    if (result.length) return true
    throw new Meteor.Error(403, `${messagePrefix}.403`, 'Forbidden')
  }
  return result.length ? true : false
}

