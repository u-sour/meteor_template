<template>
    <div class="d-flex justify-content-between">
        <h5>{{ $t(pageHeader.title) }}</h5>
        <RouterLink :to="{ name: pageHeader.create.route }" class="btn btn-sm btn-outline-primary"
            v-if="pageHeader.isParent && pageHeader.create" role="button">Create
        </RouterLink>
    </div>
    <hr>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageHeader = computed(() => route.meta)
</script>

<style scoped></style>