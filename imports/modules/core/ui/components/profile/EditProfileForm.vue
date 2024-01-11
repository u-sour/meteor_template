<template>
    <div class="col">
        <FormKit type="form" id="editProfileForm" v-model="initData" @submit="submit" #default="{ value }" :actions="false"
            :disabled="submitted">
            <FormKit type="file" name="profileImageFile" :label="$t(`${labelPrefix}.form.profileImage`)"
                accept=".jpg,.jpeg,.png" :file-item-icon="null" no-files-icon="fileImage"
                help="Select one image that you like for your profile.">
                <template #prefix>
                    <ImagePreview :imageFile="initData.profileImageFile" />
                </template>
            </FormKit>
            <div class="row">
                <div class="col-6">
                    <FormKit name="firstName" :label="$t(`${labelPrefix}.form.firstName`)"
                        :validation="validations.userInfo" />
                </div>
                <div class="col-6">
                    <FormKit name="lastName" :label="$t(`${labelPrefix}.form.lastName`)"
                        :validation="validations.userInfo" />
                </div>
            </div>
            <FormKit name="username" :label="$t(`${labelPrefix}.form.username`)" :validation="validations.userInfo" />
            <FormKit type="textarea" name="about" :label="$t(`${labelPrefix}.form.about`)"
                placeholder="write something about yourself." :help="`${value.about ? value.about.length : 0} / 120`"
                validation="length:0,120" validation-visibility="live" :validation-messages="{
                    length: 'About cannot be more than 120 characters.',
                }" />
            <FormKit name="company" :label="$t(`${labelPrefix}.form.company`)" />
            <FormKit name="job" :label="$t(`${labelPrefix}.form.job`)" />
            <FormKit name="address" :label="$t(`${labelPrefix}.form.address`)" />
            <FormKit name="phoneNumber" :label="$t(`${labelPrefix}.form.phoneNumber`)" validation="required" />
            <FormKit name="email" :label="$t(`${labelPrefix}.form.email`)" :validation="validations.email" />
            <div>
                <FormActions :submitted="submitted" submit-label-btn="core.btns.profile.saveChange"
                    :enable-cancel-btn="false" />
            </div>

        </FormKit>
    </div>
</template>

<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { ref, onMounted, toRefs } from 'vue';
import { useAuthStore } from '../../../stores/auth';
import { EditProfileForm } from '../../../types/authentication';
import { updateProfile } from '../../../api/auth/server/methods';
import uploadFolderPrefix from '../../../utils/upload-folder-prefix';
import compressor from '../../../utils/compressor';
import convertFile from '../../../utils/convert-file';
import ImagePreview from '../ImagePreview.vue';
import notify from '../../../utils/notify';
import FormActions from '../form/FormActions.vue';

defineProps({
    labelPrefix: { type: String, required: true }
})

const authStore = useAuthStore();
const { userId, username, profile, email, status } = toRefs(authStore);
const initData = ref<EditProfileForm>({
    _id: userId.value,
    profileImage: profile.value.profileImage || {},
    firstName: profile.value.firstName,
    lastName: profile.value.lastName,
    username: username.value,
    about: profile.value.about,
    company: profile.value.company,
    job: profile.value.job,
    address: profile.value.address,
    phoneNumber: profile.value.phoneNumber,
    email: email.value,
    status: status.value
})

onMounted(async () => {
    // convert profile image name,url to file
    if (profile.value.profileImage) {
        const fileName = profile.value.profileImage.name;
        const fileUrl = profile.value.profileImage.url;
        const file = await convertFile.fromUrl(fileUrl, fileName)
        initData.value.profileImageFile = [{ name: fileName, file: file }]
    }
})

const validations = {
    userInfo: "required|length:4",
    email: "required|email",
    password: "required|contains_uppercase|length:6"
}

const submitted = ref(false)

const submit = async (form: EditProfileForm) => {
    submitted.value = true;
    // check if profileImageFile field value is existed and file name isn't the same 
    const profileImageFile = form.profileImageFile![0];
    if (profileImageFile && profileImageFile.name != initData.value.profileImage?.name) {
        // compress file size & convert to base 64
        const folderPath = `${uploadFolderPrefix.profile}/${form._id} - ${form.username}`;
        const blob_file = (await compressor(profileImageFile.file!)) as Blob
        const base64 = await convertFile.toBase64(blob_file)
        // call upload edit method
        const res = await Meteor.callAsync('core.admin.upload.edit.profile', { upload: { folderPath, base64 } });
        // prepare data for update profile method
        if (res.data && form.profileImage) {
            form.profileImage.publicId = res.data.public_id
            form.profileImage.name = profileImageFile.name;
            form.profileImage.url = res.data.secure_url
        }
    }
    // omit
    if (!profileImageFile) delete form["profileImage"];
    delete form["profileImageFile"];
    // call update profile method
    updateProfile.call({ user: form }, (err: any, res: any) => {
        if (err) {
            submitted.value = false;
            return notify.error(err.message);
        }
        submitted.value = false;
        notify.success(res.message)
    })
}
</script>

<style scoped></style>