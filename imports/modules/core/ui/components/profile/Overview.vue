<template>
    <div class="col">
        <h3>{{ $t(`${labelPrefix}.about`) }}</h3>
        <p>{{ about ?? "Unknown" }}</p>
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
import { computed, toRefs } from 'vue';
import { useAuthStore } from '../../../stores/auth';

const props = defineProps({
    labelPrefix: { type: String, required: true }
})

const authStore = useAuthStore();
const { profile, fullName, email } = toRefs(authStore);
const about = computed(() => profile.value.about);
const labelFormPrefix = `${props.labelPrefix}.profileDetails.form`;
const profileDetails = computed(() => [
    { label: `${labelFormPrefix}.fullName`, value: fullName.value },
    { label: `${labelFormPrefix}.company`, value: profile.value.company },
    { label: `${labelFormPrefix}.job`, value: profile.value.job },
    { label: `${labelFormPrefix}.address`, value: profile.value.address },
    { label: `${labelFormPrefix}.phoneNumber`, value: profile.value.phoneNumber },
    { label: `${labelFormPrefix}.email`, value: email.value },
]);
</script>

<style scoped>
.table_custom {
    --bs-table-bg: transparent !important;
}
</style>