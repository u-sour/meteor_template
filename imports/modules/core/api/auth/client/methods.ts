import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'
import { SignInForm, changePasswordForm } from "../../../types/authentication";
import authLocalStorage from "../../../storage/auth";
import { throwSuccess } from '../../../utils/responses'
import { ThrowSuccess } from "../../../types/responses";

export const signIn = (form: SignInForm) => {
    return new Promise<ThrowSuccess>((resolve, reject) => {
        const { username, password, rememberMe } = form;
        Meteor.loginWithPassword(username, password, (error) => {
            if (error) {
                reject(error);
            }
            // set rememberMe if user checked 
            rememberMe ? authLocalStorage.setRememberMe(JSON.stringify({ rememberMe: rememberMe, username: username })) : authLocalStorage.removeRememberMe()
            resolve(throwSuccess.signIn());
        });
    });
}

export const changePassword = (form: changePasswordForm) => {
    return new Promise<ThrowSuccess>((resolve, reject) => {
        const { currentPassword, newPassword } = form;
        Accounts.changePassword(currentPassword, newPassword, (error) => {
            if (error) {
                reject(new Meteor.Error(400, 'core.messages.user.changePassword.error'));
            }

            resolve(throwSuccess.passwordChanged());
        });
    });
}


