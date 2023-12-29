<template>
    <div class="d-flex align-items-center">
        <img src="/images/404/No-Image-Placeholder.svg" class="img-fluid rounded me-2" width="42px" alt="">
        <span>
            <h6 class="mt-1 mb-0">{{ fullName }}</h6>
            <small>{{email}}</small>
        </span>
    </div>
</template>

<script setup lang="ts">
import {computed, toRefs } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore()
const {user} = toRefs(authStore)
const fullName = computed(()=> `${user.value.profile.firstName} ${user.value.profile.lastName}`.toUpperCase());
const email = computed(()=> user.value.emails[0].address);
</script>

<style scoped></style>