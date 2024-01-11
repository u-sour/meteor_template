<template>
    <div :style="`width:${width}px; height:${height}px;`">
        <div class="d-flex flex-column justify-content-center border align-items-center rounded w-100 h-100">
            <IconSvg :name="iconName" class="w-25 h-25" />
        </div>
    </div>
</template>

<script setup lang="ts">
import IconSvg from './IconSvg.vue';
import Icons from '../../utils/icons';

defineProps({
    width: { type: Number, default: 128 },
    height: { type: Number, default: 128 },
    iconName: { type: String, default: Icons.imageNotFound }
})
</script>

<style scoped></style>