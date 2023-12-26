import { Meteor } from "meteor/meteor";
import { SignInForm } from "../../../types/authentication";
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


}

export default new User(); 