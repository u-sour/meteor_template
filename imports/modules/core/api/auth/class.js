import Admin from './server/classes'
import User from './client/classes'
class Authencation {
    admin = Admin;
    user = User;
}
const auth = new Authencation()
export default auth;