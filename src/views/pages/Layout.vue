<template>   
    
       <Header></Header>  
      <SideBar></SideBar>
      <div class="page-wrapper">
         <dashboard v-if="this.$route.name ==='Layout'"></dashboard>   
      </div>
      <div class="page-wrapper">
            <router-view> </router-view>         
      </div>
      
</template>
<script setup>
import dashboard from '@/views/dashboard.vue'
import Header from '@/components/header.vue'
import SideBar from '@/components/sideBar.vue'

</script>