<template>
    <RouterLink :to="{ name: 'core.auth.admin.profile' }" class="btn btn-outline-light d-flex align-items-center"
        :class="{ 'active': isActive }">
        <img src="/images/404/No-Image-Placeholder.svg" class="profile-img rounded me-2" alt="profile image">
        <span>
            <h6 class="mt-1 mb-0">{{ fullName.toUpperCase() }}</h6>
            <small>{{ email }}</small>
        </span>
    </RouterLink>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
const router = useRouter()
const authStore = useAuthStore()
const { fullName, email } = toRefs(authStore)
const isActive = computed(() => router.currentRoute.value.name === 'core.auth.admin.profile');
</script>

<style scoped>
.profile-img {
    width: 48px;
    height: 48px;
    object-fit: cover;
}
</style>