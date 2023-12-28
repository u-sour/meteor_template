import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSidebarStore = defineStore('sidebar', () => {
    // static
    const _width = 10;
    const _width_collapsed = 2.5;
    // state
    const _collapsed = ref(false);
    // getter
    const isCollapsed = computed(() => _collapsed.value);
    const sidebarWidth = computed(() => `${_collapsed.value ? _width_collapsed : _width}%`);
    // methods
    const toggleSidebar = () => _collapsed.value = !_collapsed.value;

    return { isCollapsed, sidebarWidth, toggleSidebar }
})