<template>
    <!-- Set progressbar -->
    <vue-progress-bar />
    <!-- Dynamic layout -->
    <router-view />
</template>

<script setup lang="ts">
// import { autorun } from 'vue-meteor-tracker';
import { ref, watch } from 'vue';
import { useAuthStore } from './modules/core/stores/auth';

const authStore = useAuthStore()
// const userId = autorun(() => Meteor.userId()).result;
const userId = ref(Meteor.userId());
watch(
    () => userId.value,
    (newUserId) => {
        authStore.setUser(newUserId);
    },
    { immediate: true },
);

</script>
<style scoped></style>