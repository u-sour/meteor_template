<template>
    <div>
        <SideBar />
        <div :style="{ 'margin-left': sidebarWidth }">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useSidebarStore } from '../../stores/layouts/sidebar';
import SideBar from '../components/SideBar.vue';


const sidebarStore = useSidebarStore()
const { sidebarWidth } = toRefs(sidebarStore)

</script>

<style scoped></style>