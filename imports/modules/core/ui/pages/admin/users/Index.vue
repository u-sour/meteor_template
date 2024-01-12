<template>
    <EasyDataTableSearch v-model="searchValue" />
    <EasyDataTable show-index buttons-pagination :headers="headers" :items="items" :search-field="searchField"
        :search-value="searchValue" :loading="loading" :rows-per-page-message="$t(labelRowsPerPage)">
        <template #loading>
            <Processing class="d-flex flex-column align-items-center" :message="`${labelMessagePrefix}.loading`" />
        </template>
        <template #empty-message>
            <EmptyData class="d-flex flex-column align-items-center" :message="`${labelMessagePrefix}.emptyData`" />
        </template>
        <template #item-profileImage="{ profileImage }">
            <div class="profileImage-wrapper">
                <AdvancedImagePreview class="rounded" :public-id="profileImage.publicId" :name="profileImage.name"
                    :width="dimensions.width" :height="dimensions.height" v-if="profileImage" />
                <ImageNotFound :width="dimensions.width" :height="dimensions.height" v-else />
            </div>
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
import AdvancedImagePreview from '../../../components/AdvancedImagePreview.vue';
import ImageNotFound from '../../../components/ImageNotFound.vue';
import EmptyData from "../../../components/EmptyData.vue";
import Status from "../../../components/Status.vue";
import { useRouter } from "vue-router";
import { findUsers, removeUser } from "/imports/modules/core/api/auth/server/methods";
import uploadFolderPrefix from "/imports/modules/core/utils/upload-folder-prefix";
import notify from "/imports/modules/core/utils/notify";
import { Meteor } from "meteor/meteor";
import { User } from "../../../../types/authentication"
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const dimensions = { width: 40, height: 40 };
const labelPrefix = 'core.pages.admin.users.form';
const labelRowsPerPage = 'core.pageFilter.rowsPerPage';
const labelMessagePrefix = 'core.messages.other';
const router = useRouter();
const searchField = ref(["fullName", "phoneNumber", "status"]);
const searchValue = ref();

const headers = computed<Header[]>(() => [
    { text: t(`${labelPrefix}.profileImage`), value: "profileImage" },
    { text: t(`${labelPrefix}.fullName`), value: "fullName" },
    { text: t(`${labelPrefix}.username`), value: "username" },
    { text: t(`${labelPrefix}.email`), value: "email" },
    { text: t(`${labelPrefix}.phoneNumber`), value: "phoneNumber" },
    { text: t(`${labelPrefix}.status`), value: "status" },
    { text: t(`${labelPrefix}.operation`), value: "operation", width: 120 },
]);

const items = ref<Item[]>([]);
const loading = ref(true);

// load data from server
findUsers.call({ selector: { _id: { $ne: Meteor.userId() } } }, (err: any, res: [User]) => {
    if (err) {
        return notify.error(err.message);
    }
    // prepare data
    for (let index = 0; index < res.length; index++) {
        const user = res[index];
        items.value.push({
            profileImage: user.profile.profileImage,
            _id: user._id,
            fullName: `${user.profile.firstName} ${user.profile.lastName}`,
            username: user.username,
            email: user.emails[0].address,
            phoneNumber: user.profile.phoneNumber,
            status: user.profile.status
        })
    }
    loading.value = false;
})

const removeItem = async (val: Item) => {
    const { _id, username } = val;
    // call delete profile image method
    if (val.profileImage && val.profileImage.publicId) {
        const publicId = val.profileImage.publicId
        await Meteor.callAsync('core.admin.upload.remove', { publicId, deleteEmptyFolder: true, folderPath: `${uploadFolderPrefix.profile}/${_id} - ${username}` });
    }
    // call remove user method
    removeUser.call({ _id }, (err: any, res: any) => {
        if (err) {
            notify.error(err.message)
        }
        items.value = items.value.filter((item) => item._id !== _id);
        notify.success(t(res.message))
    })
};

const editItem = (val: Item) => router.push({ name: 'core.auth.admin.users.edit', params: { id: val._id } });

</script>

<style scoped>
.profileImage-wrapper {
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-items: center;
}

.avator {
    margin-right: 10px;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
}
</style>