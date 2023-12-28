<template>
    <RouterLink :to="{ name: toRouteName }" class="link" :class="{ active: isActive }">
        <Icon class="icon" :name="iconName" />
        <Transition name="fade">
            <span v-if="!isCollapsed">
                <slot></slot>
            </span>
        </Transition>
    </RouterLink>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useRoute } from 'vue-router'
import Icon from './Icon.vue';
import { useSidebarStore } from '../../stores/layouts/sidebar';
const props = defineProps({
    toRouteName: { type: String, required: true },
    iconName: { type: String, required: true }
})

const sidebarStore = useSidebarStore()
const { isCollapsed } = toRefs(sidebarStore)

const route = useRoute()
const isActive = computed(() => route.name === props.toRouteName)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;

  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;

  color: white;
  text-decoration: none;
}

.link:hover {
  background-color: var(--sidebar-item-hover);
}

.link.active {
  background-color: var(--sidebar-item-active);
}

.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>