<template>
    <!-- Set progressbar -->
    <vue-progress-bar />
    <!-- Dynamic layout -->
    <router-view />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuthStore } from './modules/core/stores/auth';
import { Meteor } from 'meteor/meteor';

const authStore = useAuthStore()
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