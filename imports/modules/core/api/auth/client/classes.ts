import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'
import { SignInForm,changePasswordForm } from "../../../types/authentication";
import authLocalStorage from "../../../storage/auth";
import { throwSuccess } from '../../../utils/responses'
import { ThrowSuccess } from "../../../types/responses";
class User {
    signIn = (form: SignInForm) => {
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

    changePassword = (form: changePasswordForm) => {
        return new Promise<ThrowSuccess>((resolve, reject) => {
            const { currentPassword, newPassword } = form;
            Accounts.changePassword(currentPassword, newPassword, (error) => {
                if (error) {
                    reject(new Meteor.Error(403,'Incorrect current password'));
                }
        
                resolve(throwSuccess.passwordChanged());
            });
        });
    }
}

export default new User(); 