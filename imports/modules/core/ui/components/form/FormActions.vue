<template>
    <div class="col">
        <template v-if="submitted">
            <Processing class="d-flex align-items-center" :message="labelMessagePrefix" />
        </template>
        <template v-else>
            <button type="button" class="btn btn-light fw-bold me-3" @click="$router.back()" v-if="enableCancelBtn">{{
                $t(cancelLabelBtn) }} </button>
            <button type="submit" class="btn btn-primary fw-bold">{{ $t(submitLabelBtn) }}</button>
        </template>
    </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import Processing from '../Processing.vue';

const props = defineProps({
    submitted: { type: Boolean, required: true },
    submitLabelBtn: { type: String, default: 'core.btns.transaction.submit' },
    enableCancelBtn: { type: Boolean, default: true },
    cancelLabelBtn: { type: String, default: 'core.btns.transaction.cancel' },
})

const submitted = toRef(props, 'submitted')
const labelMessagePrefix = 'core.messages.other.processing';
</script>

<style scoped></style>