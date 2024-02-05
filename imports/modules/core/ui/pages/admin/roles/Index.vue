<template>
    <EasyDataTableSearch v-model="searchValue" />
    <EasyDataTable theme-color=var(--primary) show-index buttons-pagination :headers="headers" :items="items"
        :search-field="searchField" :search-value="searchValue" :loading="loading"
        :rows-per-page-message="$t(labelRowsPerPage)">
        <template #loading>
            <Processing class="d-flex flex-column align-items-center" :message="`${labelMessagePrefix}.loading`" />
        </template>
        <template #empty-message>
            <EmptyData class="d-flex flex-column align-items-center" :message="`${labelMessagePrefix}.emptyData`" />
        </template>
        <template #item-status="{ status }">
            <Status :text="status" :color="status === 'active' ? 'success' : 'danger'" />
        </template>
        <template #item-operation="item">
            <EasyDataTableActions @remove="removeItem(item)" @edit="editItem(item)" />
        </template>
    </EasyDataTable>
</template>


<script setup lang="ts">
import { ref, computed } from "vue";
import type { Header, Item } from "vue3-easy-data-table";
import Processing from "../../../components/Processing.vue";
import EasyDataTableSearch from "../../../components/easy-data-table/EasyDataTableSearch.vue";
import EasyDataTableActions from '../../../components/easy-data-table/EasyDataTableActions.vue';
import EmptyData from "../../../components/EmptyData.vue";
import Status from "../../../components/Status.vue";
import { useRouter } from "vue-router";
import notify from "/imports/modules/core/utils/notify";
import { Meteor } from "meteor/meteor";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const labelPrefix = 'core.pages.admin.settings.roles.form';
const labelRowsPerPage = 'core.pageFilter.rowsPerPage';
const labelMessagePrefix = 'core.messages.other';
const router = useRouter();
const searchField = ref(["name", "status"]);
const searchValue = ref();

const headers = computed<Header[]>(() => [
    { text: t(`${labelPrefix}.name`), value: "name" },
    { text: t(`${labelPrefix}.status`), value: "status" },
    { text: t(`${labelPrefix}.operation`), value: "operation", width: 120 },
]);

const items = ref<Item[]>([]);
const loading = ref(true);

// load data from server
Meteor.call('core.admin.findRoles', {}, {}, (err: any, res: any) => {
    if (err) {
        return notify.error(err.message);
    }
    // prepare data
    for (let index = 0; index < res.data.length; index++) {
        const role = res.data[index];
        items.value.push({
            _id: role._id,
            name: role.name,
            status: role.status
        })
    }
    loading.value = false;
})

const removeItem = (val: Item) => {
    const { _id } = val;
    loading.value = true;
    // call remove role method
    Meteor.call('core.admin.removeRole', { _id }, async (err: any, res: any) => {
        if (err) {
            return notify.error(t(err.reason))
        }
        loading.value = false;
        items.value = items.value.filter((item) => item._id !== _id);
        notify.success(t(res.message))
    })
};

const editItem = (val: Item) => router.push({ name: 'core.auth.admin.settings.roles.edit', params: { id: val._id } });

</script>

<style scoped lang="scss"></style>