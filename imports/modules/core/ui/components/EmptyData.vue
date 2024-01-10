<template>
    <div>
        <h2 v-if="title">{{ $t(title) }}</h2>
        <IconSvg :name="iconName" />
        <p class="m-2">{{ $t(message) }}</p>
    </div>
</template>

<script setup lang="ts">
import Icons from '../../utils/icons';
import IconSvg from './IconSvg.vue';

defineProps({ title: { type: String }, iconName: { type: String, default: Icons.emptyData }, message: { type: String, required: true } })
</script>

<style scoped></style>