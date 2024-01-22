<template>
    <div class="d-flex justify-content-between align-items-center">
        <h5 class="mt-1 fw-bold">{{ $t(`${pageMeta.title}`) }}</h5>
        <!-- <template v-for="auth in pageMeta.authorization" :key="auth.roleGroup"> -->
        <RouterLink :to="{ name: pageMeta.create.route }" class="btn btn-sm btn-outline-primary"
            v-if="pageMeta.isParent && pageMeta.create" role="button">{{ $t(`${labelBtnPrefix}.create`) }}
        </RouterLink>
        <!-- </template> -->
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