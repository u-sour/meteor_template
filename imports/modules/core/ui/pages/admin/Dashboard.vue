<template>
    <div class="">
        <h1>Dashboard</h1>
        user: {{ authStore.user }}
        <ThemeBtn/>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth';
import ThemeBtn from '../../components/ThemeBtn.vue';

const authStore = useAuthStore();
</script>

<style scoped></style>