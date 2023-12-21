import { Meteor } from 'meteor/meteor';
import { defineStore } from "pinia"
import { ref, computed } from 'vue';
import auth from '../../api/auth/class'
import { User } from '../../types/authentication';

export const useAuthStore = defineStore('auth', () => {
    //state
    const _user = ref<User>();
    //getter
    const user = computed(() => _user.value);
    //methods
    const setUser = (userId: string | null) => {
        if (userId) {
            auth.admin.findOneUser.call({ _id: userId }, (err, res) => {
                if (err) {
                    return console.error(err)
                }
                // filter user data
                const userData = <User>{
                    username: res.username,
                    emails: res.emails,
                    profile: res.profile,
                }
                _user.value = userData
            })
        }
    }

    return { user, setUser }
})