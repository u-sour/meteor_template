<template>
    <div class="col">
        <FormKit type="form" id="editProfileForm" :value="initData" @submit="submit" #default="{ value }" :actions="false"
            :disabled="submitted">
            <!-- <FormKit type="file" name="profileImageFile" :label="$t(`${labelPrefix}.form.profileImage`)"
                accept=".jpg,.jpeg,.png" :wrapper-class="{ 'formkit-wrapper': false }" outer-class="col-12"
                file-item-icon="" no-files-icon="fileImage" help="Select one image that you like for your profile.">
                <template #prefix>
                    <ImagePreview :imageFile="value.profileImageFile" />
                </template>
            </FormKit> -->
            <div class="row">
                <div class="col-6">
                    <FormKit name="firstName" :label="$t(`${labelPrefix}.form.firstName`)"
                        :wrapper-class="{ 'formkit-wrapper': false }" :validation="validations.userInfo" />
                </div>
                <div class="col-6">
                    <FormKit name="lastName" :label="$t(`${labelPrefix}.form.lastName`)"
                        :wrapper-class="{ 'formkit-wrapper': false }" :validation="validations.userInfo" />
                </div>
            </div>
            <FormKit name="username" :label="$t(`${labelPrefix}.form.username`)"
                :wrapper-class="{ 'formkit-wrapper': false }" :validation="validations.userInfo" />
            <FormKit type="textarea" name="about" :label="$t(`${labelPrefix}.form.about`)"
                :wrapper-class="{ 'formkit-wrapper': false }" placeholder="write something about yourself."
                :help="`${value.about ? value.about.length : 0} / 120`" validation="length:0,120"
                validation-visibility="live" :validation-messages="{
                    length: 'About cannot be more than 120 characters.',
                }" />
            <FormKit name="company" :label="$t(`${labelPrefix}.form.company`)"
                :wrapper-class="{ 'formkit-wrapper': false }" />
            <FormKit name="job" :label="$t(`${labelPrefix}.form.job`)" :wrapper-class="{ 'formkit-wrapper': false }" />
            <FormKit name="address" :label="$t(`${labelPrefix}.form.address`)"
                :wrapper-class="{ 'formkit-wrapper': false }" />
            <FormKit name="phoneNumber" :label="$t(`${labelPrefix}.form.phoneNumber`)"
                :wrapper-class="{ 'formkit-wrapper': false }" validation="required" />
            <FormKit name="email" :label="$t(`${labelPrefix}.form.email`)" :wrapper-class="{ 'formkit-wrapper': false }"
                :validation="validations.email" />
            <div>
                <button class="btn btn-primary fw-bold" type="submit" :disabled="submitted">{{
                    $t('core.btns.profile.saveChange') }}</button>
            </div>

        </FormKit>
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { reset } from '@formkit/core';
import auth from '../../../api/auth/class';
import { useAuthStore } from '../../../stores/auth';
import { EditProfileForm } from '../../../types/authentication';
import ConvertFile from '../../../utils/convert-file';
import compressor from '../../../utils/compressor';
import ImagePreview from '../ImagePreview.vue';
import notify from '../../../utils/notify';

defineProps({
    labelPrefix: { type: String, required: true }
})
const authStore = useAuthStore();
const { userId, username, profile, email, status } = toRefs(authStore);
const initData: EditProfileForm =
{
    _id: userId.value,
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
}

const validations = {
    userInfo: "required|length:4",
    email: "required|email",
    password: "required|contains_uppercase|length:6"
}

const submitted = ref(false)

const submit = async (form: EditProfileForm) => {
    // compress file image & convert to base 64
    // if (form.profileImageFile) {
    //     const blob_file = (await compressor(form.profileImageFile[0].file)) as Blob
    //     const base64 = await ConvertFile.toBase64(blob_file)
    //     form.profileImage.name = form.profileImage[0].name;
    //     form.profileImage.base64 = base64;
    // }
    submitted.value = true;
    auth.admin.updateProfile.call({ user: form }, (err, res) => {
        if (err) {
            submitted.value = false;
            return notify.error(err.message);
        }
        submitted.value = false;
        reset('editProfileForm');
        notify.success(res.message)
    })
}
</script>

<style scoped></style>