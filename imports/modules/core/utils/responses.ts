import { Meteor } from "meteor/meteor"
import { ThrowSuccess } from "../types/responses"

export const throwSuccess = {
    general: (success: ThrowSuccess) => success,
    signIn: () => {
        return { data: { userId: Meteor.userId() }, status: 200, message: "core.messages.auth.signedIn" }
    },
    updateProfile: () => {
        return { status: 204, message: "core.messages.user.updateProfile" }
    },
    passwordChanged: () => {
        return { status: 204, message: "core.messages.user.changePassword.success" }
    }
}

export const throwError = (error: any) => {
    const statusCode = error.error || 'transaction-error'
    const newError = error.sanitizedError || error
    const reason = newError.reason || 'Transaction Error'
    throw new Meteor.Error(statusCode, reason, newError)
}
