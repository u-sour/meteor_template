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
        <template #item-profileImage="{ profileImage }">
            <div class="profileImage-wrapper">
                <AdvancedImagePreview class="rounded" :public-id="profileImage.publicId" :name="profileImage.name"
                    :width="dimensions.width" :height="dimensions.height" v-if="profileImage" />
                <ImageNotFound :width="dimensions.width" :height="dimensions.height" v-else />
            </div>
        </template>
        <template #item-roleGroup="{ roleGroup }">
            <Status class="rounded-pill me-1" :text="roleGroup && roleGroup.name ? roleGroup.name : ''" />
        </template>
        <template #item-routePermissions="{ routePermissions }">
            <div v-for="rp in routePermissions" :key="rp.route">
                <h6>{{ rp.route }}</h6>
                <Status v-for="r in rp.roles " :key="r._id" class="rounded-pill me-1" :text="r.name" />
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
    { text: t(`${labelPrefix}.roleGroup.label`), value: "roleGroup" },
    { text: t(`${labelPrefix}.permissions`), value: "routePermissions" },
    { text: t(`${labelPrefix}.status`), value: "status" },
    { text: t(`${labelPrefix}.operation`), value: "operation", width: 120 },
]);

const items = ref<Item[]>([]);
const loading = ref(true);

// load data from server
Meteor.call('core.admin.findUsers', { selector: { _id: { $ne: Meteor.userId() } } }, (err: any, res: any) => {
    if (err) {
        return notify.error(err.message);
    }
    // prepare data
    const users: [User] = res.data
    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        items.value.push({
            profileImage: user.profile.profileImage,
            _id: user._id,
            fullName: `${user.profile.firstName} ${user.profile.lastName}`,
            username: user.username,
            email: user.emails[0].address,
            phoneNumber: user.profile.phoneNumber,
            roleGroup: user.profile.roleGroup,
            routePermissions: user.profile.routePermissions,
            status: user.profile.status
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

<style scoped lang="scss">
.profileImage-wrapper {
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-items: center;
}
</style>