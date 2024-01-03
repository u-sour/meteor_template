<template>
    <div class="col">
        <h3>{{ $t(`${labelPrefix}.about`) }}</h3>
        <p>{{ about }}</p>
        <h3>{{ $t(`${labelPrefix}.profileDetails.title`) }}</h3>
        <table class="table table_custom table-borderless">
            <tbody>
                <tr v-for="(pd, index)  in profileDetails" :key="index">
                    <th scope="row">{{ $t(pd.label) }}</th>
                    <td>{{ pd.value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { useAuthStore } from '../../../stores/auth';
import { useI18n } from "vue-i18n";

const props = defineProps({
    labelPrefix: { type: String, required: true }
})

const i18n = useI18n();
const authStore = useAuthStore();
const { profile, fullName, email } = toRefs(authStore);
const about = computed(() => profile.value.about);
const labelFormPrefix = `${props.labelPrefix}.profileDetails.form`;
const profileDetails = ref([
    { label: `${labelFormPrefix}.fullName`, value: fullName.value },
    { label: `${labelFormPrefix}.company`, value: profile.value.company },
    { label: `${labelFormPrefix}.job`, value: profile.value.job },
    { label: `${labelFormPrefix}.address`, value: profile.value.address },
    { label: `${labelFormPrefix}.phoneNumber`, value: profile.value.phoneNumber },
    { label: `${labelFormPrefix}.email`, value: email },
]);
</script>

<style scoped>
.table_custom {
    --bs-table-bg: transparent !important;
}
</style>