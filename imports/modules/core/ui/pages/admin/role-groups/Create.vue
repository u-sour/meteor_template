<template>
    <div class="col">
        <FormKit type="form" id="createRoleGroupForm" @submit="submit" :actions="false" :disabled="submitted">
            <FormKit name="name" :label="$t(`${labelPrefix}.name`)" validation="required" autocomplete="off" />
            <!-- <FormKit name="roles" type="checkbox" :label="$t(`${labelPrefix}.roles.label`)" :options="roleOptions"
                decorator-icon="check" :help="$t(`${labelPrefix}.roles.help`)" validation="required" /> -->
            <div class="pb-2">
                <FormKit type="list" :value="[{}]" name="routePermissions" dynamic #default="{ items, node, value }">
                    <FormKit type="group" v-for="(item, index) in items" :key="item" :index="index">
                        <div class="row">
                            <FormKit type="select" label="Route" name="route" outer-class="col-12 col-lg-8"
                                inner-class="p-custom-1" placeholder="select one"
                                :options=dynamicOptions.routes(JSON.parse(JSON.stringify(value))) validation="required" />
                            <div class="col-12 col-lg-4 position-relative">
                                <FormKit name="roles" type="checkbox" :label="$t(`${labelPrefix}.roles.label`)"
                                    :options="roleOptions" decorator-icon="check" :value="['01', '02', '03', '04']"
                                    options-class="d-flex justify-content-between" :help="$t(`${labelPrefix}.roles.help`)"
                                    validation="required">
                                </FormKit>
                                <button type="button" @click="() => node.input(value.filter((_, i) => i !== index))"
                                    class="btn btn-danger position-absolute top-0 end-0 mt-3 mx-4">
                                    -
                                </button>
                            </div>
                        </div>
                    </FormKit>
                    <button type="button" @click="() => node.input(value.concat({}))" class="btn btn-dark">
                        +
                    </button>
                </FormKit>
            </div>
            <FormKit type="select" name="status" :label="$t(`${labelPrefix}.status`)" :options="staticOptions.status"
                validation="required" />
            <!--form-actions-->
            <FormActions :submitted="submitted" />
        </FormKit>
    </div>
</template>

<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { ref, onMounted } from 'vue';
import FormActions from '../../../components/form/FormActions.vue';
import { CreateRoleGroupForm } from '/imports/modules/core/types/roleGroup';
import notify from '/imports/modules/core/utils/notify';
import staticOptions from '../../../../utils/static-options';
import dynamicOptions from '/imports/modules/core/utils/dynamic-options';
import { Option } from '/imports/modules/core/types/option';
import { reset } from '@formkit/vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const labelPrefix = 'core.pages.admin.roleGroups.form';
const roleOptions = ref<Option[]>([])
const submitted = ref(false)

onMounted(async () => {
    roleOptions.value = await dynamicOptions.roles();
})

const submit = async (form: CreateRoleGroupForm) => {
    // submitted.value = true;
    form.createdAt = new Date();
    form.createdBy = Meteor.userId()!;
    Meteor.call('core.admin.insertRoleGroup', { doc: form }, (err: any, res: any) => {
        if (err) {
            submitted.value = false;
            return notify.error(t(err.message));
        }
        reset('createRoleGroupForm');
        submitted.value = false;
        notify.success(t(res.message))
    })
}
</script>

<style scoped></style>