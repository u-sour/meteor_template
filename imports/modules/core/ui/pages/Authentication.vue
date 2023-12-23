<template>
    <div class="container-fluid">
        <ToggleI18n :model-value="currentLocale" />
        <div class="row">
            <div class="vh-100 col-sm-12 col-md-12 col-lg-6  d-flex justify-content-center align-items-center">
                <div class="col px-lg-5">
                    <router-view />
                </div>
            </div>
            <div class="vh-100 col-lg-6 d-none d-lg-flex justify-content-center align-items-center bg-primary">
                <h1 class="text-light">{{ companyName }}</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import ToggleI18n from '../components/ToggleI18n.vue';

const { locale } = useI18n()
const companyName = "YOUR COMPANY NAME";

// set defualt locale
const currentLocale = ref(localStorage.getItem('locale') || 'en')
watch(currentLocale, (lang) => {
    localStorage.setItem('locale', lang)
    locale.value = lang
}, { immediate: true })

</script>

<style scoped></style>