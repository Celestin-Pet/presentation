
<template>
    <loading v-model:active="isLoading"
               :can-cancel="true"
               :is-full-page="fullPage"/>
    <header class="header-desktop">
        <div class="section__content section__content--p30">
            <div class="container-fluid">
                <div class="header-wrap">
                    <form class="form-header" action="" method="POST">
                        <!-- <input class="au-input au-input--xl" type="text" name="search" placeholder="Search">
                        <button class="au-btn--submit" type="submit">
                            <i class="zmdi zmdi-search"></i>
                        </button> -->
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i class="zmdi zmdi-search"></i></span>
                            </div>
                            <input type="text" class="au-input au-input--xl" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1">
                            </div>
                    </form>
                    <div class="header-button">
                        <div class="account-wrap">
                            <div class="account-item clearfix js-item-menu" >
                                <div class="image" @click="openDropdown">
                                    <img src="/images/icon/avatar-01.jpg" alt="John Doe">
                                </div>
                                <div class="content">
                                    <a class="js-acc-btn" href="#" @click="openDropdown">{{ fullName?fullName:'John Doe' }}</a>
                                </div>
                                <div class="account-dropdown js-dropdown">
                                    <div class="account-dropdown__body">
                                        <div class="account-dropdown__item">
                                            <a href="#">
                                                <i class="fa fa-user"></i>Profil</a>
                                        </div>
                                    </div>
                                    <div class="account-dropdown__footer">
                                        <a href="#" @click="logout">
                                            <i class="zmdi zmdi-power"></i>Logout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import {ref} from 'vue'
import Loading from 'vue-loading-overlay';
import { useRouter } from "vue-router";

let isLoading = ref(false)
let fullPage = ref(true);
let visible = ref(false)
let fullName = ref(localStorage.getItem('fullName'))
const router = useRouter();

function logout(){
    localStorage.clear();
    isLoading.value = true;
    setTimeout(()=>{
        isLoading.value = false;
        router.push({ path:'/'});
    }, 2000);
}

function openDropdown(){
  
    if (visible.value){
        $('.account-item').addClass('show-dropdown');
           visible.value = false
        } else {
          visible.value = true
          $('.account-item').removeClass('show-dropdown');
        }
}
</script>