<template>
    <input type="checkbox" class="btn-check" id="theme" autocomplete="off">
    <label class="btn btn-outline-light" for="theme" @click="toggleDark()">
        <SunAnimationIcon v-if="!isDark" />
        <MoonAnimationIcon v-else />
    </label>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import SunAnimationIcon from './icons/SunAnimationIcon.vue'
import MoonAnimationIcon from './icons/MoonAnimationIcon.vue'
const isDark = useDark({
    selector: 'html',
    attribute: 'data-bs-theme',
    valueDark: 'dark',
    valueLight: 'light',
})
const toggleDark = useToggle(isDark)
</script>

<style scoped></style>