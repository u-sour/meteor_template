<template>
    <div class="p-2 d-md-none d-flex align-items-center text-white bg-primary">
        <a href="#" class="text-white" data-bs-toggle="offcanvas" data-bs-target="#bdSidebar">
            <IconSvg name="SolarHamburgerMenuLinear" />
        </a>
        <span class="ms-3">{{ brand.toUpperCase() }}</span>
    </div>
</template>

<script setup lang="ts">
import IconSvg from './IconSvg.vue';
defineProps({
    brand: { type: String, default: 'meteor template' }
})
</script>

<style scoped></style>