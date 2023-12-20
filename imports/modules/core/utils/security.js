import { Meteor } from 'meteor/meteor'
import { isString, isArray, intersection } from 'lodash'

export const userLoggedIn = () => {
    if (Meteor.userId()) {
        return true
    }
    throw new Meteor.Error('logged-out', 'The user is not login')
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

    return result.length ? true : false
}

export const throwError = (error) => {
    console.log('Throw Error', error)

    const newError = error.sanitizedError || error
    const reason = newError.reason || 'Transaction Error'

    throw new Meteor.Error('transaction-error', reason, newError)
}
