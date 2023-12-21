import { Meteor } from "meteor/meteor";
import { SignInForm } from "../../../types/authentication";
import { throwSuccess } from '../../../utils/responses'
import { ThrowSuccess } from "../../../types/responses";
class User {
    signIn = (form: SignInForm) => {
        return new Promise<ThrowSuccess>((resolve, reject) => {
            const { username, password } = form;
            Meteor.loginWithPassword(username, password, (error) => {
                if (error) {
                    reject(error);
                }
                resolve(throwSuccess.signIn());
            });
        });
    }


}

export default new User(); 