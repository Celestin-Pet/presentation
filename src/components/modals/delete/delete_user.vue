<template>
    <div class="modal fade show" id="exampleScrollableModal" tabindex="-1" aria-modal="true" role="dialog" style="display: block;">
   <div class="modal-dialog">
     <span class="close" title="Close Modal" @click="$emit('closeForm')">&times;</span>
     <form class="modal-content">
       <div class="container">
         <h1>Delete {{ pass_data?pass_data.email:"-" }}</h1>
         <p>Are you sure you want to delete  ?</p>
   
         <div class="clearfix">
           <button type="button" class="btn btn-info" @click="$emit('closeForm')">Cancel</button>
           <button type="button" class="btn btn-danger" @click="delete_data">Delete <i class="fa" :class="[loading?'fa-spin fa-spinner':'delete']"></i></button>
         </div>
       </div>
     </form>
   </div>
   </div>
   </template>
   <script>
   import { api } from '@/boot/axios.js'
   import {ref} from 'vue'
   export default{
       emits:['refresh'],
       props:{
           pass_data:{
               type:Object,
               required:true
           }
       },
       setup(props, {emit}){
           let loading = ref(false);
   
           const delete_data = async()=>{
           loading.value = true;
           const response = await api({
           method:'DELETE',
           api:`/auth/signup/del${props.pass_data._id}`,
           }).finally(()=> loading.value = false);  
           if (response.ok){  
               emit('refresh')
               close_Modal()
               alertify.set('notifier','position', 'top-right');
               alertify.success(`User deleted successfully`);  
           }
        }
   
        function close_Modal(){
           setTimeout(() => {
               emit('closeForm')
           }, 500);
        }
   
       return {
           loading,
           delete_data
       }
   }
   }
   </script>
   <style>
   * {box-sizing: border-box}
   
   /* Add padding and center-align text to the container */
   .container {
     padding: 16px;
     text-align: center;
   }
   
   
   
   /* Modal Content/Box */
   
   
   /* Style the horizontal ruler */
   hr {
     border: 1px solid #f1f1f1;
     margin-bottom: 25px;
   }
   
   
   /* Clear floats */
   .clearfix::after {
     content: "";
     clear: both;
     display: table;
     padding: 10px;
   }
   
   </style>