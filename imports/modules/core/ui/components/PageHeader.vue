<template>
    <div class="d-flex justify-content-between align-items-center">
        <h5 class="mt-1 fw-bold">{{ $t(pageHeader.title) }}</h5>
        <RouterLink :to="{ name: pageHeader.create.route }" class="btn btn-sm btn-outline-primary"
            v-if="pageHeader.isParent && pageHeader.create" role="button">{{ $t(`${labelBtnPrefix}.create`) }}
        </RouterLink>
    </div>
    <hr />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageHeader = computed(() => route.meta)
const labelBtnPrefix = 'core.btns.transaction';
</script>

<style scoped></style>