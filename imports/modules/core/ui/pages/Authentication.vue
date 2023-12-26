<template>
    <div class="container-fluid">
        <div class="wrapper d-flex align-items-center">
            <I18nBtn :model-value="currentLocale" />
            <div class="vr mx-2 text-bg-light"></div>
            <ThemeBtn />
        </div>
        <div class="row">
            <div class="vh-100 col-sm-12 col-md-12 col-lg-6  d-flex justify-content-center align-items-center">
                <div class="col px-lg-5">
                    <router-view />
                </div>
            </div>
            <div class="vh-100 col-lg-6 d-none d-lg-flex justify-content-center align-items-center bg-primary">
                <h1 class=" text-body-emphasis">{{ companyName }}</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import I18nBtn from '../components/I18nBtn.vue';
import ThemeBtn from '../components/ThemeBtn.vue';

const { locale } = useI18n()
const companyName = "YOUR COMPANY NAME";

// set defualt locale
const currentLocale = ref(localStorage.getItem('locale') || 'en')
watch(currentLocale, (lang) => {
    localStorage.setItem('locale', lang)
    locale.value = lang
}, { immediate: true })

</script>

<style scoped>
.wrapper {
    margin-top: .5rem;
    margin-right: .5rem;
    position: absolute;
    top: 0px;
    right: 0px;
}
</style>