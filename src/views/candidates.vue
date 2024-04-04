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
                            <h4 class="">List of Candidates</h4> <br>
                            <div class="card">
                                <div class="card-body">
                                        <div class="col-sm-12">
                                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleScrollableModal" @click="openModal(false)" v-if="!displayModal">
                                        New Candidates <i class="fa" :class="[spinner_create?'fa-spin fa-spinner':'fa fa-plus']"></i>
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
                                                <td>Name</td>
                                                <td>Email</td>
                                                <td>Skills</td>
                                                <td>Edit</td>
                                                <td>Delete</td>
                                            </tr>
                                            </thead> 
                                            <tbody>
                                                <tr v-for="(display , index) in candidates_list" :key="display.index">
                                                    <td>{{ (index + 1) }}</td>
                                                    <td >{{ Convert(display.name) }}</td>
                                                    <td >{{ Convert(display.email) }}</td>
                                                    <td >{{ Convert(display.skills) }}</td>
                                                    <td>
                                                        <button class="btn btn-info"  data-bs-toggle="modal" data-bs-target="#exampleScrollableModal" @click="openModal(display, index)"><i class="fa" :class="[spinner_create && indexBusi === index?'fa-spin fa-spinner':'fa fa-edit']"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button class="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleScrollableModal" @click="deleteCandidate(display, index)"><i class="fa" :class="[spinnerDelete && indexBusi === index?'fa-spin fa-spinner':'fa fa-trash']"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr v-if="candidates_list.length === 0">
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
    <add v-if="displayModal" @closeForm="displayModal = false" @refresh="fetch_candidates" :pass_data="pass_data"/>
    <deleteComponent v-if="Modal_delete" @closeForm="Modal_delete = false" @refresh="fetch_candidates" :pass_data="pass_data"/>
</template>
       
<script setup>
       import Loading from 'vue-loading-overlay';
       import { onMounted , ref, reactive} from 'vue'
       import uppercase from "@/modules/uppercase.js"
       import { api } from '@/boot/axios.js'
       import add from "@/components/modals/candidates/candidates.vue";
       import deleteComponent from '@/components/modals/delete/delete_candidate.vue'
    
            let there = ref(null);
            let indexBusi = ref('')
            let spinner_create = ref(false)
            let displayModal = ref(false);
           let  candidates_list = ref([]);
           let pass_data = ref(Object);
           let  isLoading = ref(false);
           let  fullPage = ref(true);
           let spinnerDelete = ref(false);
           let Modal_delete = ref(false)

           const { Convert } = uppercase();
           // fecth jobs 
              const fetch_candidates = async ()=>{
                   isLoading.value = true;
                     const response = await api({
                            method:'GET',
                            api:`/candidates/get`,
                        }).finally(()=> isLoading.value = false)
                     if (response.ok) {
                        candidates_list.value = response.data;
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

                function deleteCandidate(data, index){
                    indexBusi.value = index;
                    pass_data.value = data;
                    spinnerDelete.value = true;
                    setTimeout(()=>{
                        Modal_delete.value = true
                        spinnerDelete.value = false;
                    }, 200)
                }


             onMounted(() => {
               fetch_candidates()
           })
          
       </script>
       
       <style>

       </style>