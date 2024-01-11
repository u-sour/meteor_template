<template>
    <RouterLink :to="{ name: 'core.auth.admin.profile' }" class="btn btn-outline-light d-flex align-items-center p-2"
        :class="{ 'active': isActive }">
        <AdvancedImagePreview class="profile-img rounded me-2" :public-id="profile.profileImage.publicId"
            :name="profile.profileImage.name" v-if="profile.profileImage" />
        <ImageNotFound :width="dimensions.width" :height="dimensions.height" v-else />
        <span class="d-flex flex-column align-items-baseline ms-2">
            <h6>{{ fullName.toUpperCase() }}</h6>
            <small>{{ email }}</small>
        </span>
    </RouterLink>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useAuthStore } from '../../stores/auth';
import AdvancedImagePreview from './AdvancedImagePreview.vue';
import ImageNotFound from './ImageNotFound.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const dimensions = { width: 48, height: 48 };
const router = useRouter()
const authStore = useAuthStore()
const { profile, fullName, email } = toRefs(authStore)
const isActive = computed(() => router.currentRoute.value.name === 'core.auth.admin.profile');
</script>

<style scoped>
.profile-img {
    width: 48px;
    height: 48px;
    object-fit: cover;
}
</style>