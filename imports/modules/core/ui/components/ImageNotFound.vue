<template>
    <div class="col-12 d-flex flex-column justify-content-center align-items-center rounded bg-body-secondary"
        :style="`width: ${width}px; height: ${height}px;`">
        <IconSvg :name="iconName" class="mb-2" />
        <small class="fw-bold">Image Not Found</small>
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