import { Meteor } from "meteor/meteor"
import { ThrowSuccess } from "../types/responses"

export const throwSuccess = {
    general: (success: ThrowSuccess) => success,
    signIn: () => {
        return { data: { userId: Meteor.userId() }, status: 200, message: "User logged." }
    },
    updateProfile: () => {
        return { status: 200, message: "Profile have been changed." }
    },
    passwordChanged: () => {
        return { status: 200, message: "Password changed." }
    }
}

export const throwError = (error: any) => {
    const newError = error.sanitizedError || error
    const reason = newError.reason || 'Transaction Error'
    throw new Meteor.Error('transaction-error', reason, newError)
}
