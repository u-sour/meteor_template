<template>
    <div class="operation-wrapper">
        <template v-if="!showRemoveConfirmation">
            <RouterLink to="" class="link-danger link-opacity-50-hover" @click="setShowRemoveConfirmation">
                <IconSvg class="operation-icon" :name="removeIcon" />
            </RouterLink>
            <RouterLink to="" class="link-warning link-opacity-50-hover" @click="$emit('edit')">
                <IconSvg class="operation-icon" :name="editIcon" />
            </RouterLink>
        </template>
        <template v-else>
            <div>
                <Vue3Marquee :duration="4.5" pauseOnHover>
                    <span class="d-flex align-items-center fw-bold">
                        <IconSvg class="operation-icon me-2" :name="Icons.info" /> {{ $t(labelMessagePrefix) }}
                    </span>
                </Vue3Marquee>
                <span class="d-flex align-items-center">
                    <RouterLink to="" class="link-danger link-opacity-50-hover" @click="setShowRemoveConfirmation">
                        <IconSvg class="operation-icon" :name="Icons.cancel">Cancel</IconSvg>
                    </RouterLink>
                    <RouterLink to="" class="link-success link-opacity-50-hover" @click="emitRemove">
                        <IconSvg class="operation-icon" :name="Icons.yes" />
                    </RouterLink>
                </span>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Vue3Marquee } from 'vue3-marquee';
import IconSvg from '../IconSvg.vue';
import Icons from '../../../utils/icons';

defineProps({
    removeIcon: { type: String, default: Icons.remove },
    editIcon: { type: String, default: Icons.edit },
})

const labelMessagePrefix = 'core.messages.transaction.confirm';

// ref
const showRemoveConfirmation = ref(false);

// emit
const emit = defineEmits(['remove', 'edit'])

// methods
const setShowRemoveConfirmation = () => showRemoveConfirmation.value = !showRemoveConfirmation.value
const emitRemove = () => {
    emit('remove')
    setShowRemoveConfirmation()
}
</script>

<style scoped>
.operation-wrapper {
    display: flex;
}

.operation-wrapper .operation-icon {
    width: 1rem;
    margin-left: .5rem;
    cursor: pointer;
}
</style>