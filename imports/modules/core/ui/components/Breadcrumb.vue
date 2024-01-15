<template>
    <div class="d-flex justify-content-between align-items-center">
        <nav style="--bs-breadcrumb-divider:'>';font-size:14px">
            <ol class="breadcrumb mt-3">
                <li class="breadcrumb-item" v-for="bc in breadcrumb.parent" :key="bc.title">
                    <RouterLink class="text-decoration-none" :to="{ name: bc.route }">{{
                        $t(bc.title)
                    }}</RouterLink>
                </li>
                <li class="breadcrumb-item">{{ $t(breadcrumb.title) }}</li>
            </ol>
        </nav>
        <I18nBtn :model-value="currentLocale" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import I18nBtn from './I18nBtn.vue';

const route = useRoute()
const breadcrumb = computed(() => route.meta.breadcrumb);
const currentLocale = ref(localStorage.getItem('locale') || 'en')
</script>

<style lang="scss" scoped></style>