<template>
    <div class="modal fade show" id="exampleScrollableModal" tabindex="-1" aria-modal="true" role="dialog" style="display: block;">
        <div class="modal-dialog modal-dialog-scrollable modal-xs">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-if="!jobs">New Job </h5>
                    <h5 class="modal-title" v-else>Edit Job </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('closeForm')"></button>
                </div>
                <form @submit.prevent>
                   <div class="modal-body">
                    <label for="">Job Title</label>
                    <input v-model="form.title" type="text" placeholder="Title" class="form-control"/>
                    
                    <label for="">Job Requirements</label>
                    <input v-model="form.requirements" type="text" placeholder="Requirement" class="form-control"/>

                    <label for="">Description</label>
                    <textarea  cols="5" rows="3" class="form-control" v-model="form.description"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('closeForm')">Close</button>
                        <button type="button" class="btn btn-primary"  
                            :disabled="isSignupButtonDisabled"
                            @click="add_jobs"
                            v-if="!jobs"
                            >Add <i class="fa" :class="[loading?'fa fa-spinner fa-spin':'Add post']"></i>
                        </button>
                        <button type="button" class="btn btn-primary"  
                            :disabled="isSignupButtonDisabled"
                            v-else
                            @click="update_jobs">Update <i class="fa" :class="[loading?'fa fa-spinner fa-spin':'Add post']"></i>
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

    let jobs = ref(props.pass_data);
    watch(() => (jobs.value), (updatedProps) => {
        jobs.value = updatedProps;
    })

    let loading = ref(false);
    const form = reactive({
        title:props.pass_data !=undefined?props.pass_data.title:'',
        requirements:props.pass_data !=undefined?props.pass_data.requirements:'',
        description:props.pass_data !=undefined?props.pass_data.description:'',
    })

        
    const { errors } = useFormValidation();
    const { isSignupButtonDisabled } = useSubmitButtonState(form, errors );

    const add_jobs = async()=>{
        loading.value = true;
        const response = await api({
        method:'POST',
        api:'/job-posts/add',
        data:{
            title:form.title,
            requirements:form.requirements,
            description:form.description,
        }
        }).finally(()=> loading.value = false);  
        if (response.ok){  
            clearForm();
            emit('refresh')
            close_Modal()
            alertify.set('notifier','position', 'top-right');
            alertify.success(`Job posted successfully`);  
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

    const update_jobs = async()=>{
        loading.value = true;
        const response = await api({
        method:'PUT',
        api:`/job-posts/${props.pass_data._id}`,
        data:form
        }).finally(()=> loading.value = false);  
        if (response.ok){  
            clearForm();
            emit('refresh')
            close_Modal()
            alertify.set('notifier','position', 'top-right');
            alertify.success(`Job edited successfully`);  
        }
    }

    function close_Modal(){
        emit('closeForm')
    }

</script>
<style>
</style>
