import { Meteor } from 'meteor/meteor'
import { isString, isArray, intersection } from 'lodash'
import { User } from '../types/authentication'
const messagePrefix = 'core.messages.auth'

export const userLoggedIn = () => {
  if (Meteor.userId()) {
    return true
  }
  throw new Meteor.Error(401, `${messagePrefix}.401`, 'Authorization required')
}

interface UserIsInAuthorization {
  roleGroups: string[],
  roles: string[],
  isServer?: boolean,
}

export const userIsInAuthorization = ({
  roleGroups = [],
  roles = [],
  isServer = false
}: UserIsInAuthorization) => {
  console.log("🚀 ~ roles:", roles)
  console.log("🚀 ~ roleGroups:", roleGroups)
  const currentUser = Meteor.user() as User
  const currentUserRoleGroup =
    currentUser && currentUser.profile && currentUser.profile.roleGroup
  const currentUserRoles =
    currentUser && currentUser.profile && currentUser.profile.roles || []

  let isInRoleGroup = roleGroups.includes(currentUserRoleGroup)
  console.log("🚀 ~ isInRoleGroup:", isInRoleGroup)
  let isInRoles: string[] = []
  if (isString(roles)) {
    isInRoles.push(roles)
  } else if (isArray(roles)) {
    isInRoles = [...new Set([...isInRoles, ...roles])]
  }
  let result = intersection(currentUserRoles, isInRoles)

  if (isServer) {
    if (isInRoleGroup && result.length) return true
    throw new Meteor.Error(403, `${messagePrefix}.403`, 'Forbidden')
  }

  return isInRoleGroup && result.length ? true : false
}
