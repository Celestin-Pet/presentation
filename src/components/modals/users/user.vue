<template>
    <div class="modal fade show" id="exampleScrollableModal" tabindex="-1" aria-modal="true" role="dialog" style="display: block;">
        <div class="modal-dialog modal-dialog-scrollable modal-xs">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-if="!users">New User </h5>
                    <h5 class="modal-title" v-else>Edit User </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('closeForm')"></button>
                </div>
                <form @submit.prevent>
                   <div class="modal-body">
                    <label for="">First Name</label>
                    <input v-model="form.firstName" type="text" placeholder="Name" class="form-control"/>
                    <label for="">Last Name</label>
                    <input v-model="form.lastName" type="text" placeholder="Name" class="form-control"/>
                    
                    <label for="">Email</label>
                    <input v-model="form.email" type="email" placeholder="Email" class="form-control"/>

                    <label for="">Password</label>
                    <input v-model="form.password" type="text" placeholder="password" class="form-control"/>
                    <label for="">Confirm password</label>
                    <input v-model="form.retypePassword" type="text" placeholder="retype Password" class="form-control"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('closeForm')">Close</button>
                        <button type="button" class="btn btn-primary"  
                            :disabled="isSignupButtonDisabled"
                            @click="add_users"
                            v-if="!users"
                            >Add <i class="fa" :class="[loading?'fa fa-spinner fa-spin':'Add post']"></i>
                        </button>
                        <button type="button" class="btn btn-primary"  
                            :disabled="isSignupButtonDisabled"
                            v-else
                            @click="update_users">Update <i class="fa" :class="[loading?'fa fa-spinner fa-spin':'Add post']"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive ,ref, computed, watch} from 'vue';
import useFormValidation from "@/modules/Forms/useFormValidation.js";
  import useSubmitButtonState from "@/modules/useSubmitButtonState.js";
import { api } from '@/boot/axios.js';

   const emit = defineEmits(['closeForm', 'refresh']);
   const props = defineProps({
        pass_data:{
            type:Object,
            required:false
        }
    });

    let users = ref(props.pass_data);
    watch(() => (users.value), (updatedProps) => {
        users.value = updatedProps;
    })

    let loading = ref(false);
    const form = reactive({
        email:props.pass_data.email,
        firstName:props.pass_data.firstName,
        lastName:props.pass_data.lastName,
        password:props.pass_data.password,
        retypePassword:props.pass_data.retypePassword,
    })

        
    const { errors } = useFormValidation();
    const { isSignupButtonDisabled } = useSubmitButtonState(form, errors );

    const add_users = async()=>{
        loading.value = true;
        const response = await api({
        method:'POST',
        api:'/userss/add',
        data:{
            name:form.name,
            email:form.email,
            skills:form.skills,
        }
        }).finally(()=> loading.value = false);  
        if (response.ok){  
            clearForm();
            emit('refresh')
            close_Modal()
            alertify.set('notifier','position', 'top-right');
            alertify.success(`users add successfully`);  
        }
    }

    function clearForm() // THE CLEAR FORM FUNCTION
        {
            $('input[type="text"]').val('');
            $('input[type="checkbox"]').prop('checked', false); // Uncheck
            $('select').val('');
            $('input[type="date"]').val('');
            $('input[type="email"]').val('');
            $('input[type="file"]').val('');
            $('textarea').val('');
    }

    const update_users = async()=>{
        loading.value = true;
        const response = await api({
        method:'PUT',
        api:`/auth/signup/${props.pass_data._id}`,
        data:form
        }).finally(()=> loading.value = false);  
        if (response.ok){  
            clearForm();
            emit('refresh')
            close_Modal()
            alertify.set('notifier','position', 'top-right');
            alertify.success(`users updated successfully`);  
        }
    }

    function close_Modal(){
        emit('closeForm')
    }

</script>
<style>
</style>
