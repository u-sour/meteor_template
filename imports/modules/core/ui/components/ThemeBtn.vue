<template>
    <input type="checkbox" class="btn-check" id="theme" autocomplete="off">
    <label class="btn btn-outline-light d-inline-flex align-items-center" for="theme" @click="toggleDark()">
        <SunAnimationIcon class="icon" v-if="!isDark" />
        <MoonAnimationIcon class="icon" v-else />
        <span class="ms-2" v-if="isShowLabel">{{ $t(!isDark ? 'core.btns.themeMode.light' : 'core.btns.themeMode.dark')
        }}</span>
    </label>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import SunAnimationIcon from './icons/SunAnimationIcon.vue'
import MoonAnimationIcon from './icons/MoonAnimationIcon.vue'
defineProps({
    isShowLabel: { type: Boolean, default: false }
})
const isDark = useDark({
    selector: 'html',
    attribute: 'data-bs-theme',
    valueDark: 'dark',
    valueLight: 'light',
})
const toggleDark = useToggle(isDark)
</script>

<style scoped>
.icon {
    width: 25px;
}
</style>