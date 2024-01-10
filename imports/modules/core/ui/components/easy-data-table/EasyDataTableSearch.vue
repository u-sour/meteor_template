<template>
    <FormKit :value="modelValue" type="search" :inner-class="{ 'col-sm-12 col-md-6 col-lg-2': true }"
        :placeholder="$t(placeholder)" @input="updateSearch">
        <template #prefixIcon>
            <IconSvg :name="iconName" class="icon ms-2" />
        </template>
    </FormKit>
</template>

<script setup lang="ts">
import IconSvg from '../IconSvg.vue';
import Icons from '../../../utils/icons';

defineProps({
    iconName: { type: String, default: Icons.search },
    placeholder: { type: String, default: 'core.pageFilter.search' },
    modelValue: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue'])
const updateSearch = (value: any) => {
    emit('update:modelValue', value)
}
</script>

<style scoped>
.icon {
    width: 1rem;
}
</style>