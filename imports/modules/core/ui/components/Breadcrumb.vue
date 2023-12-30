<template>
    <nav style="--bs-breadcrumb-divider:'>';font-size:14px">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink class="text-decoration-none" :to="{ name: breadcrumb.parent.route }">{{ breadcrumb.parent.title
                }}</RouterLink>
            </li>
            <li class="breadcrumb-item">{{ breadcrumb.title }}</li>
        </ol>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const breadcrumb = computed(() => route.meta.breadcrumb);
</script>

<style lang="scss" scoped></style>