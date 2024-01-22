<template>
    <div>
        user: {{ authStore.user }}
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth';
const authStore = useAuthStore();
</script>

<style scoped></style>