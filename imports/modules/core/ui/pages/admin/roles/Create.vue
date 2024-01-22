<template>
    <div class="col">
        <FormKit type="form" id="createRoleForm" @submit="submit" :actions="false" :disabled="submitted">
            <div class="row">
                <div class="col-6">
                    <FormKit name="name" :label="$t(`${labelPrefix}.name`)" validation="required" autocomplete="off" />
                </div>
                <div class="col-6">
                    <FormKit type="select" name="status" :label="$t(`${labelPrefix}.status`)"
                        :options="staticOptions.status" validation="required" />
                </div>
            </div>
            <!--form-actions-->
            <FormActions :submitted="submitted" />
        </FormKit>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormActions from '../../../components/form/FormActions.vue';
import { CreateRoleForm } from '/imports/modules/core/types/role';
import notify from '/imports/modules/core/utils/notify';
import staticOptions from '../../../../utils/static-options';
import { reset } from '@formkit/vue';
import { useI18n } from 'vue-i18n';
import { Meteor } from 'meteor/meteor';

const { t } = useI18n()
const labelPrefix = 'core.pages.admin.settings.roles.form';
const submitted = ref(false)

const submit = async (form: CreateRoleForm) => {
    submitted.value = true;
    form.createdAt = new Date();
    form.createdBy = Meteor.userId()!;
    Meteor.call('core.admin.insertRole', { doc: form }, (err: any, res: any) => {
        if (err) {
            submitted.value = false;
            return notify.error(t(err.message));
        }
        reset('createRoleForm');
        submitted.value = false;
        notify.success(t(res.message))
    })
}
</script>

<style scoped></style>