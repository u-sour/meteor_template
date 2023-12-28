<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
        <!--------------header----------------->
        <h3>
            <span v-if="isCollapsed">
                <div>M</div>
                <div>T</div>
            </span>
            <span v-else>Meteor Template</span>
        </h3>
        <!-----------navigation--------------->
        <SidebarLink v-for="route in adminRoutes" :key="route.name" :to-route-name="route.name"
            :icon-name="route.meta.iconName">{{ route.meta.title }}</SidebarLink>
        <!-----------action-buttons------------>
        <div class="wrapper-collapse-icon w-100" @click="toggleSidebar">
            <span class="collapse-icon" :class="{ 'rotate-180': isCollapsed }" >
                <Icon name="SolarDoubleAltArrowLeftOutline" />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useSidebarStore } from '../../stores/layouts/sidebar'
import SidebarLink from '../components/sidebarlink.vue';
import Icon from './Icon.vue';
import routes from '../routes'

const sidebarStore = useSidebarStore();
const adminRoutes = routes[0].children[1].children

const { isCollapsed, sidebarWidth, toggleSidebar } = toRefs(sidebarStore);
</script>

<style scoped>
.sidebar {
    background-color: var(--sidebar-bg-color);
    color: #fff;
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
}
.sidebar h1 {
  height: 2.5em;
}
.wrapper-collapse-icon{
    position: absolute;
    bottom: 0;
}
.collapse-icon {

    color: #fff;
    transition: 0.2s linear;
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
}
</style>