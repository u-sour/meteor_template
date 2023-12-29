<template>
  <li class="nav-item mb-1">
    <RouterLink :to="{ name: toRouteName }" class="cool" :class="{ active: isActive }">
      <IconSvg :name="iconName" />
      <slot></slot>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import IconSvg from './IconSvg.vue';

const props = defineProps({
  toRouteName: { type: String, required: true },
  iconName: { type: String, required: true }
});

const route = useRoute();
const isActive = computed(() => route.name === props.toRouteName);
</script>

<style scoped></style>