<template>
    <div>
        <h2 v-if="title">{{ $t(title) }}</h2>
        <Loading />
        <p class="m-2">{{ $t(message) }}</p>
    </div>
</template>

<script setup lang="ts">
import Loading from './Loading.vue';
defineProps({ title: { type: String }, message: { type: String, required: true } })
</script>

<style scoped></style>