<template>
    <div class="col">
        <FormKit type="form" id="createUserForm" @submit="submit" #default="{ value }" :actions="false"
            :disabled="submitted">
            <div class="row">
                <div class="col-6">
                    <FormKit name="firstName" :label="$t(`${labelPrefix}.firstName`)" :validation="validations.userInfo" />
                </div>
                <div class="col-6">
                    <FormKit name="lastName" :label="$t(`${labelPrefix}.lastName`)" :validation="validations.userInfo" />
                </div>
            </div>
            <FormKit name="username" :label="$t(`${labelPrefix}.username`)" :validation="validations.userInfo" />
            <FormKit type="textarea" name="about" :label="$t(`${labelPrefix}.about.label`)"
                :placeholder="$t(`${labelPrefix}.about.placeholder`)"
                :help="`${value.about ? value.about.length : 0} / 120`" validation="length:0,120"
                validation-visibility="live" :validation-messages="{
                    length: 'About cannot be more than 120 characters.',
                }" />
            <FormKit name="company" :label="$t(`${labelPrefix}.company`)" />
            <FormKit name="job" :label="$t(`${labelPrefix}.job`)" />
            <FormKit name="address" :label="$t(`${labelPrefix}.address`)" />
            <FormKit name="phoneNumber" :label="$t(`${labelPrefix}.phoneNumber`)" validation="required" />
            <FormKit name="email" :label="$t(`${labelPrefix}.email`)" :validation="validations.email" />
            <FormKit type="password" name="password" :label="$t('core.pages.auth.signUp.form.password')"
                prefix-icon="password" suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                :validation="validations.password" @suffix-icon-click="toggleShowPassword" />
            <FormKit type="radio" name="roleGroup" :label="$t(`${labelPrefix}.roleGroup.label`)" :options="roleGroupOptions"
                :help="$t(`${labelPrefix}.roleGroup.help`)" validation="required" />
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
import { CreateUserForm } from '/imports/modules/core/types/user';
import notify from '/imports/modules/core/utils/notify';
import staticOptions from '../../../../utils/static-options';
import dynamicOptions from '/imports/modules/core/utils/dynamic-options';
import { Option } from '/imports/modules/core/types/option';
import { reset } from '@formkit/vue';
import { useI18n } from 'vue-i18n';
import { Meteor } from 'meteor/meteor';

const { t } = useI18n()
const labelPrefix = 'core.pages.admin.users.form';
const validations = {
    userInfo: "required|length:4",
    email: "required|email",
    password: "required|contains_uppercase|length:6"
}
const roleGroupOptions = ref<Option[]>([])
const submitted = ref(false)

onMounted(async () => {
    roleGroupOptions.value = await dynamicOptions.roleGroups()
})

const toggleShowPassword = (node: any) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

const submit = async (form: CreateUserForm) => {
    submitted.value = true;
    // find one roleGroup
    const roleGroup = await Meteor.callAsync('core.admin.findOneRoleGroup', { selector: { _id: form.roleGroup } })
    form.routePermissions = roleGroup.data.routePermissions
    Meteor.call('core.admin.insertUser', { user: form }, (err: any, res: any) => {
        if (err) {
            submitted.value = false;
            return notify.error(err.message);
        }
        reset('createUserForm');
        submitted.value = false;
        notify.success(t(res.message))
    })

}
</script>

<style scoped></style>