<template>
    <img :src="flag.path" class="img border border-2 rounded-circle" @click="toggleI18n" :alt="flag.locale">
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Flag } from '../../types/i18n';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n()
const props = defineProps({
    modelValue: { type: String, required: true }
})
const initData = [
    { path: '/images/i18n/en-US.svg', locale: 'en' },
    { path: '/images/i18n/km-KH.svg', locale: 'km' },
]
const flag = ref<Flag>(initData[0]);

if (props.modelValue != undefined) {
    flag.value = props.modelValue === 'en' ? initData[0] : initData[1]
}

// emit
const emit = defineEmits(['update:modelValue'])

//methods
const toggleI18n = () => {
    // set locale
    // set image src & alt 
    // set locale to local storage
    // emit value
    if (locale.value === 'en') {
        locale.value = 'km'
        flag.value = initData[1]
        localStorage.setItem('locale', 'km')
    } else {
        locale.value = 'en'
        flag.value = initData[0]
        localStorage.setItem('locale', 'en')
    }
    emit('update:modelValue', flag.value.locale)
}
</script>

<style scoped>
.img {
    height: 2.4rem;
    width: 2.4rem;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease-in-out;
}

.img:hover {
    transform: scale(1.1);
    cursor: pointer;
}
</style>