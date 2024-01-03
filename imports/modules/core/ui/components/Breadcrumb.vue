<template>
    <div class="d-flex justify-content-between">
        <nav style="--bs-breadcrumb-divider:'>';font-size:14px">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink class="text-decoration-none" :to="{ name: breadcrumb.parent.route }">{{
                        $t(breadcrumb.parent.title)
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