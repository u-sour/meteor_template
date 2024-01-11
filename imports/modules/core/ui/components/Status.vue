<template>
    <span :class="`badge ${mode} text-bg-${color}`">{{ text }}</span>
</template>

<script setup lang="ts">
defineProps({
    text: { type: String, required: true },
    color: {
        type: String,
        validator: (value: string) => {
            const colors = ['success', 'warning', 'danger']
            const val = colors.includes(value);
            if (!val) {
                console.warn(`Prop color can only have a value of ${colors}`);
            }
            return val
        },
        required: true
    },
    mode: { type: String }
})
</script>

<style lang="scss" scoped></style>