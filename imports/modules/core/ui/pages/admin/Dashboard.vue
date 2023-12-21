<template>
    <div>
        <h1>Dashboard</h1>
        user: {{ authStore.user }}
        <button class="btn btn-primary" @click="signOut">Sign Out</button>
    </div>
</template>

<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { useAuthStore } from '../../../stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()

const signOut = () => {
    Meteor.logout((error) => {
        if (error) console.log(error);
        router.replace({ name: 'core.auth.signIn' });
    });
}
</script>

<style scoped></style>