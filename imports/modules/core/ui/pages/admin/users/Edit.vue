<template>
    <div class="col">
        <FormKit type="form" id="editUserForm" v-model="initData" @submit="submit" #default="{ value }" :actions="false"
            :disabled="submitted">
            <FormKit type="hidden" name="_id" validation="required" />
            <div class="row">
                <div class="col-6">
                    <FormKit name="firstName" :label="$t(`${labelPrefix}.firstName`)" :validation="validations.userInfo" />
                </div>
                <div class="col-6">
                    <FormKit name="lastName" :label="$t(`${labelPrefix}.lastName`)" :validation="validations.userInfo" />
                </div>
            </div>
            <FormKit name="username" :label="$t(`${labelPrefix}.username`)" :validation="validations.userInfo" />
            <FormKit type="textarea" name="about" :label="$t(`${labelPrefix}.about`)"
                placeholder="write something about yourself." :help="`${value.about ? value.about.length : 0} / 120`"
                validation="length:0,120" validation-visibility="live" :validation-messages="{
                    length: 'About cannot be more than 120 characters.',
                }" />
            <FormKit name="company" :label="$t(`${labelPrefix}.company`)" />
            <FormKit name="job" :label="$t(`${labelPrefix}.job`)" />
            <FormKit name="address" :label="$t(`${labelPrefix}.address`)" />
            <FormKit name="phoneNumber" :label="$t(`${labelPrefix}.phoneNumber`)" validation="required" />
            <FormKit name="email" :label="$t(`${labelPrefix}.email`)" :validation="validations.email" />
            <FormKit name="changePassword" type="checkbox" :label="$t(`${labelPrefix}.edit.changePassword`)" />
            <FormKit type="password" name="password" :label="$t(`${labelPrefix}.edit.newPassword`)" prefix-icon="password"
                suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500" :validation="validations.password"
                @suffix-icon-click="toggleShowPassword" v-if="value.changePassword" />
            <FormKit type="checkbox" name="roles" :label="$t(`${labelPrefix}.roles.label`)" :options="roleOptions"
                decorator-icon="check" :help="$t(`${labelPrefix}.roles.help`)" validation="required|min:1" />
            <FormKit type="select" name="status" :label="$t(`${labelPrefix}.status`)" :options="staticOptions.status"
                validation="required" />
            <!--form-actions-->
            <FormActions :submitted="submitted" />
        </FormKit>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormActions from '../../../components/form/FormActions.vue';
import { EditUserForm } from '/imports/modules/core/types/user';
import notify from '/imports/modules/core/utils/notify';
import staticOptions from '../../../../utils/static-options';
import dynamicOptions from '/imports/modules/core/utils/dynamic-options';
import { Option } from '/imports/modules/core/types/option';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Meteor } from 'meteor/meteor';

const { t } = useI18n()
const { id } = useRoute().params
const router = useRouter()
const initData = ref()
const labelPrefix = 'core.pages.admin.users.form';
const validations = {
    userInfo: "required|length:4",
    email: "required|email",
    password: "required|contains_uppercase|length:6"
}
const roleOptions = ref<Option[]>([])
const submitted = ref(false)

onMounted(async () => {
    // set role options
    roleOptions.value = await dynamicOptions.roles()
})

// find one user
Meteor.call('core.admin.findOneUser', { _id: id }, (err: any, res: any) => {
    if (err) {
        return notify.error(err.message);
    }
    const { _id, username, emails, profile: { firstName, lastName, about, company, job, address, phoneNumber, roles, status } } = res.data
    initData.value = {
        _id,
        firstName,
        lastName,
        about,
        username,
        company,
        job,
        address,
        phoneNumber,
        email: emails[0].address,
        changePassword: false,
        roles,
        status
    }
})

const toggleShowPassword = (node: any) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

const submit = async (form: EditUserForm) => {
    submitted.value = true;
    // omit
    delete form["changePassword"];
    // call update user method
    Meteor.call('core.admin.updateUser', { user: form }, (err: any, res: any) => {
        if (err) {
            submitted.value = false;
            return notify.error(err.message);
        }
        submitted.value = false;
        notify.success(t(res.message));
        router.back();
    })
}
</script>

<style scoped></style>