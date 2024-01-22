import { Meteor } from "meteor/meteor";
import { defineStore } from "pinia"
import { ref, computed } from 'vue';
import { User } from '../../types/authentication';
import { Tracker } from "meteor/tracker";

export const useAuthStore = defineStore('auth', () => {
    //state
    const _user = ref<User>();
    //getter
    const user = computed(() => _user.value);
    const userId = computed(() => _user.value?._id);
    const username = computed(() => _user.value?.username);
    const profile = computed(() => _user.value?.profile);
    const fullName = computed(() => `${_user.value?.profile.firstName} ${_user.value?.profile.lastName}`);
    const job = computed(() => _user.value?.profile.job || 'Unknown');
    const email = computed(() => _user.value?.emails[0].address);
    const status = computed(() => _user.value?.profile.status);

    //methods
    const setUser = (userId: string | null) => {
        if (userId) {
            // load real time current user
            Tracker.autorun(async () => {
                const currentUser = Meteor.user() as User;
                if (currentUser) {
                    // filter user data
                    const userData = <User>{
                        _id: currentUser._id,
                        username: currentUser.username,
                        emails: currentUser.emails,
                        profile: currentUser.profile,
                    }
                    _user.value = userData
                }
            })
        }
    }



    return { user, userId, username, fullName, job, profile, email, status, setUser }
})