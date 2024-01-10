
<template>
    <IconSvg :name="iconName"></IconSvg>
</template>
<script setup lang="ts" >
import IconSvg from './IconSvg.vue';
import Icons from '../../utils/icons';

defineProps({ iconName: { type: String, default: Icons.loading } })
</script>