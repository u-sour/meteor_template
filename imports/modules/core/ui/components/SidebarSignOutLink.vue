<template>
    <li class="nav-item mb-1">
        <a href="#" @click="signOut">
            <IconSvg name="SolarLogout3Linear" />
            <span class="ms-2">Sign Out</span>
        </a>
    </li>
</template>

<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { useRouter } from 'vue-router';
import IconSvg from './IconSvg.vue';

const router = useRouter()

const signOut = () => {
    Meteor.logout((error) => {
        if (error) console.log(error);
        router.replace({ name: 'core.auth.signIn' });
    });
}
</script>

<style scoped></style>