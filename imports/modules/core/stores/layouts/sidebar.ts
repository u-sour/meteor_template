import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSidebarStore = defineStore('sidebar', () => {
    // static
    const _width = 180;
    const _width_collapsed = 38;
    // state
    const _collapsed = ref(false);
    // getter
    const isCollapsed = computed(() => _collapsed.value);
    const sidebarWidth = computed(() => `${_collapsed.value ? _width_collapsed : _width}px`);
    // methods
    const toggleSidebar = () => _collapsed.value = !_collapsed.value;

    return { isCollapsed, sidebarWidth, toggleSidebar }
})