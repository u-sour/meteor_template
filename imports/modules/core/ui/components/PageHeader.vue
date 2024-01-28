<template>
    <div class="d-flex justify-content-between align-items-center">
        <h5 class="mt-1 fw-bold">{{ $t(`${pageMeta.title}`) }}</h5>
        <RouterLink :to="{ name: pageMeta.create.route }" class="btn btn-sm btn-outline-primary"
            v-if="pageMeta.isParent && pageMeta.create && userIsInAuthorization({ parentRoutePath: route.path, roles: ['01'] })"
            role="button">{{ $t(`${labelBtnPrefix}.create`) }}
        </RouterLink>
    </div>
    <hr />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { userIsInAuthorization } from '../../utils/security';

const route = useRoute();
const pageMeta = computed(() => route.meta)
const labelBtnPrefix = 'core.btns.transaction';

</script>

<style scoped></style>