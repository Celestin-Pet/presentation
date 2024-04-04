<template>
    <div class="modal fade show" id="exampleScrollableModal" tabindex="-1" aria-modal="true" role="dialog" style="display: block;">
        <div class="modal-dialog modal-dialog-scrollable modal-xs">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-if="!candidate">New Candidate </h5>
                    <h5 class="modal-title" v-else>Edit Candidate </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('closeForm')"></button>
                </div>
                <form @submit.prevent>
                   <div class="modal-body">
                    <label for="">Name</label>
                    <input v-model="form.name" type="text" placeholder="Name" class="form-control"/>
                    
                    <label for="">Email</label>
                    <input v-model="form.email" type="email" placeholder="Email" class="form-control"/>

                    <label for="">Skills</label>
                    <textarea  cols="5" rows="3" class="form-control" v-model="form.skills" placeholder="Skills"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('closeForm')">Close</button>
                        <button type="button" class="btn btn-primary"  
                            :disabled="isSignupButtonDisabled"
                            @click="add_candidate"
                            v-if="!candidate"
                            >Add <i class="fa" :class="[loading?'fa fa-spinner fa-spin':'Add post']"></i>
                        </button>
                        <button type="button" class="btn btn-primary"  
                            :disabled="isSignupButtonDisabled"
                            v-else
                            @click="update_candidate">Update <i class="fa" :class="[loading?'fa fa-spinner fa-spin':'Add post']"></i>
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

    console.log(props.pass_data);
    let candidate = ref(props.pass_data);
    watch(() => (candidate.value), (updatedProps) => {
        candidate.value = updatedProps;
    })

    let loading = ref(false);
    const form = reactive({
        email:props.pass_data !=undefined?props.pass_data.email:'',
        skills:props.pass_data !=undefined?props.pass_data.skills:'',
        name:props.pass_data !=undefined?props.pass_data.name:'',
    })

        
    const { errors } = useFormValidation();
    const { isSignupButtonDisabled } = useSubmitButtonState(form, errors );

    const add_candidate = async()=>{
        loading.value = true;
        const response = await api({
        method:'POST',
        api:'/candidates/add',
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
            alertify.success(`candidate add successfully`);  
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

    const update_candidate = async()=>{
        loading.value = true;
        const response = await api({
        method:'PUT',
        api:`/candidates/${props.pass_data._id}`,
        data:form
        }).finally(()=> loading.value = false);  
        if (response.ok){  
            clearForm();
            emit('refresh')
            close_Modal()
            alertify.set('notifier','position', 'top-right');
            alertify.success(`candidate updated successfully`);  
        }
    }

    function close_Modal(){
        emit('closeForm')
    }

</script>
<style>
</style>
