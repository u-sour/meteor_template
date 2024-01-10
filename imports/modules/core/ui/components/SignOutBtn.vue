<template>
    <button class="btn btn-outline-light d-inline-flex justify-content-center  align-items-center" @click="signOut">
        <IconSvg class="icon me-2" :name="Icons.singOut" /> {{ $t('core.btns.auth.signOut') }}
    </button>
</template>

<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { useRouter } from 'vue-router';
import IconSvg from './IconSvg.vue';
import Icons from '../../utils/icons';

const router = useRouter()
const signOut = () => {
    Meteor.logout((error) => {
        if (error) console.log(error);
        router.replace({ name: 'core.auth.signIn' });
    });
}
</script>

<style scoped>
.icon {
    width: 25px;
}
</style>