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
import uploadFolderPrefix from "/imports/modules/core/utils/upload-folder-prefix";
import notify from "/imports/modules/core/utils/notify";
import { Meteor } from "meteor/meteor";
import { User } from "../../../../types/authentication"
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const labelPrefix = 'core.pages.admin.roles.form';
const labelRowsPerPage = 'core.pageFilter.rowsPerPage';
const labelMessagePrefix = 'core.messages.other';
const router = useRouter();
const searchField = ref(["_id"]);
const searchValue = ref();

const headers = computed<Header[]>(() => [
    { text: t(`${labelPrefix}._id`), value: "_id" },
    { text: t(`${labelPrefix}.children`), value: "children" },
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
            children: role.children
        })
    }
    loading.value = false;
})

const removeItem = (val: Item) => {
    const { _id, username } = val;
    // call remove user method
    Meteor.call('core.admin.removeUser', { _id }, async (err: any, res: any) => {
        if (err) {
            return notify.error(t(err.reason))
        }
        // call delete profile image method
        if (val.profileImage && val.profileImage.publicId) {
            const publicId = val.profileImage.publicId
            await Meteor.callAsync('core.admin.upload.remove', { publicId, deleteEmptyFolder: true, folderPath: `${uploadFolderPrefix.profile}/${_id} - ${username}` });
        }
        items.value = items.value.filter((item) => item._id !== _id);
        notify.success(t(res.message))
    })
};

const editItem = (val: Item) => router.push({ name: 'core.auth.admin.users.edit', params: { id: val._id } });

</script>

<style scoped lang="scss"></style>