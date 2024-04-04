<template v-if="isConnect">
    <div>
         <loading v-model:active="isLoading"
               :can-cancel="true"
               :is-full-page="fullPage"/>
    </div>
    <div class="page-wrapper">
        <div class="page-container">
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="row">
                        <div class="col-md-12 listepermission">
                            <div class="card">
                                <div class="card-body">
                                        <div class="col-sm-12">
                                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleScrollableModal" @click="openModal(false)" v-if="!displayModal">
                                        New Jobs <i class="fa" :class="[spinner_create?'fa-spin fa-spinner':'fa fa-plus']"></i>
                                        </button>
                                        </div>
                                </div>
                                <div class="dropdown-divider mb-0"></div>	
                                <div class="car-body" id="pdf">
                                    <div class="card-datatable"> 
                                        <table class="table table-striped">
                                            <thead>
                                            <tr>
                                                <td>N°</td>
                                                <td>Title</td>
                                                <td>Description</td>
                                                <td>Edit</td>
                                                <td>Delete</td>
                                            </tr>
                                            </thead> 
                                            <tbody>
                                                <tr v-for="(display , index) in list_jobs" :key="display.index">
                                                    <td>{{ (index + 1) }}</td>
                                                    <td >{{ Convert(display.title) }}</td>
                                                    <td >{{ Convert(display.description) }}</td>
                                                    <td>
                                                        <button class="btn btn-info"  data-bs-toggle="modal" data-bs-target="#exampleScrollableModal" @click="openModal(display, index)"><i class="fa" :class="[spinner_create && indexBusi === index?'fa-spin fa-spinner':'fa fa-edit']"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button class="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleScrollableModal" @click="deleteModal(display, index)"><i class="fa" :class="[spinner_delete && indexBusi === index?'fa-spin fa-spinner':'fa fa-trash']"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr v-if="list_jobs.length === 0">
                                                    <td colspan="8" style="text-align:center; font-weight: bold; font-size:20px;">No data</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-12 d-flex justify-content-center">
                                        <vue-loaders name="line-scale"  color="red" scale="1" v-if="isLoading"/> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <add v-if="displayModal" @closeForm="displayModal = false" @refresh="fetch_jobs" :pass_data="pass_data"/>
    <modalDelete v-if="DeleteModal" @closeForm="DeleteModal = false" @refresh="fetch_jobs" :pass_data="pass_data"/>
</template>
       
<script setup>
       import Loading from 'vue-loading-overlay';
       import { onMounted , ref, reactive} from 'vue'
       import uppercase from "@/modules/uppercase.js"
       import { api } from '@/boot/axios.js'
       import add from "@/components/modals/jobs/jobs.vue";
       import modalDelete from "@/components/modals/delete/delete_job.vue";
    
            let there = ref(null);
            let indexBusi = ref('')
            let spinner_create = ref(false)
            let displayModal = ref(false);
            let DeleteModal = ref(false);
           let  list_jobs = ref([]);
           let pass_data = ref(Object);
           let  isLoading = ref(false);
           let  fullPage = ref(true);
           let  spinner_delete = ref(false);

           const { Convert } = uppercase();
           // fecth jobs 
              const fetch_jobs = async ()=>{
                   isLoading.value = true;
                     const jobs = await api({
                            method:'GET',
                            api:`/job-posts/`,
                        }).finally(()=> isLoading.value = false)
                     if (jobs.ok) {
                        list_jobs.value = jobs.data;
                     } 
               }

                function openModal(data, index){
                    indexBusi.value = index;
                    pass_data.value = data;
                    spinner_create.value = true;
                    setTimeout(()=>{
                        displayModal.value = true
                        spinner_create.value = false;
                    }, 200)
                }

                function deleteModal(data, index){
                    indexBusi.value = index;
                    pass_data.value = data;
                    spinner_delete.value = true;
                    setTimeout(()=>{
                        DeleteModal.value = true
                        spinner_delete.value = false;
                    }, 200)
                }


             onMounted(() => {
               fetch_jobs()
           })
          
       </script>
       
       <style>

       </style>