<template>
<div class="page-container">
    <div class="main-content">
        <div class="section__content section__content--p30">
            <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="overview-wrap">
                                    <h2 class="title-1">overview</h2>
                                
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="overview-wrap">
                                    <button class="au-btn au-btn-icon au-btn--blue" data-bs-toggle="modal" data-bs-target="#exampleScrollableModal" @click="openModalCandidate(false)">
                                        <i :class="[spinner2?'fa-spin fa-spinner':'zmdi zmdi-plus']"></i>add Candidates
                                    </button>
                                    <button class="au-btn au-btn-icon au-btn--blue" data-bs-toggle="modal" data-bs-target="#exampleScrollableModal" @click="openModal(false)">
                                      <i :class="[spinner?'fa-spin fa-spinner':'zmdi zmdi-plus']"></i>add Jobs 
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-t-25">
                            <div class="col-sm-6 col-lg-3">
                                <div class="overview-item overview-item--c1">
                                    <div class="overview__inner">
                                        <div class="overview-box clearfix">
                                            <div class="icon">
                                                <i class="">33</i>
                                            </div>
                                            <div class="text">
                                                <div class="avatars"><img src="/images/icon/a.png" alt=""></div>
                                                <span>Interview scheduled</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="overview-item overview-item--c2">
                                    <div class="overview__inner">
                                        <div class="overview-box clearfix">
                                            <div class="icon">
                                                <i class="">2</i>
                                            </div>
                                            <div class="text">
                                                <div class="avatars"><img src="/images/icon/f.png" alt=""></div>
                                                <span>Interview Feedback pending</span>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="overview-item overview-item--c3">
                                    <div class="overview__inner">
                                        <div class="overview-box clearfix">
                                            <div class="icon">
                                                <i class="">44</i>
                                            </div>
                                            <div class="text">
                                                <div class="avatars"><img src="/images/icon/c.png" alt=""></div>
                                                <span>Approval Pending</span>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="overview-item overview-item--c4">
                                    <div class="overview__inner">
                                        <div class="overview-box clearfix">
                                            <div class="icon">
                                                <i class="">13</i>
                                            </div>
                                            <div class="text">
                                                <div class="avatars"><img src="/images/icon/d.png" alt=""></div>
                                                <span>Other Acceptance Pending</span>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="overview-item overview-item--c1">
                                    <div class="overview__inner">
                                        <div class="overview-box clearfix">
                                            <div class="icon">
                                                <i class="">17</i>
                                            </div>
                                            <div class="text">
                                                <div class="avatars"><img src="/images/icon/e.png" alt=""></div>
                                                <span>Documentation Pending</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="overview-item overview-item--c1">
                                    <div class="overview__inner">
                                        <div class="overview-box clearfix">
                                            <div class="icon">
                                                <i class="">17</i>
                                            </div>
                                            <div class="text">
                                                <div class="avatars"><img src="/images/icon/e.png" alt=""></div>
                                                <span>Documentation Pending</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="overview-item overview-item--c3">
                                    <div class="overview__inner">
                                        <div class="overview-box clearfix">
                                            <div class="icon">
                                                <i class="">5</i>
                                            </div>
                                            <div class="text">
                                                <div class="avatars"><img src="/images/icon/g.png" alt=""></div>
                                                <span>Supervisor Allocation Pending</span>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="overview-item overview-item--c4">
                                    <div class="overview__inner">
                                        <div class="overview-box clearfix">
                                            <div class="icon">
                                                <i class="">56</i>
                                            </div>
                                            <div class="text">
                                                <div class="avatars"><img src="/images/icon/j.png" alt=""></div>
                                                <span>Project Allocation Pending</span>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-9">
                                <h2 class="title-1 m-b-25">Require Attention</h2>
                                <div class="table-responsive table--no-card m-b-40">
                                    <table class="table table-borderless table-striped table-earnin">
                                        <thead>
                                            <tr>
                                                <th>Position left</th>
                                                <th>Application</th>
                                                <th class="text-right">Interviewed</th>
                                                <th class="text-right">Rejected</th>
                                                <th class="text-right">Feedback Pending</th>
                                                <th class="text-right">Offered</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Jaden kaling</td>
                                                <td>100398</td>
                                                <td>iPhone X 64Gb Grey</td>
                                                <td class="text-right">$999.00</td>
                                                <td class="text-right">1</td>
                                                <td class="text-right">$999.00</td>
                                            </tr>
                                            <tr>
                                                <td>Faith yano</td>
                                                <td>100397</td>
                                                <td>Samsung S8 Black</td>
                                                <td class="text-right">$756.00</td>
                                                <td class="text-right">1</td>
                                                <td class="text-right">$756.00</td>
                                            </tr>
                                            <tr>
                                                <td>Celestin bayo</td>
                                                <td>100396</td>
                                                <td>Game Console Controller</td>
                                                <td class="text-right">$22.00</td>
                                                <td class="text-right">2</td>
                                                <td class="text-right">$44.00</td>
                                            </tr>
                                            <tr>
                                                <td>Yannick kalingera</td>
                                                <td>100395</td>
                                                <td>iPhone X 256Gb Black</td>
                                                <td class="text-right">$1199.00</td>
                                                <td class="text-right">1</td>
                                                <td class="text-right">$1199.00</td>
                                            </tr>
                                            <tr>
                                                <td>Shaloom paluke</td>
                                                <td>100393</td>
                                                <td>USB 3.0 Cable</td>
                                                <td class="text-right">$10.00</td>
                                                <td class="text-right">3</td>
                                                <td class="text-right">$30.00</td>
                                            </tr>
                                            <tr>
                                                <td>Manick patrick</td>
                                                <td>100392</td>
                                                <td>Smartwatch 4.0 LTE Wifi</td>
                                                <td class="text-right">$199.00</td>
                                                <td class="text-right">6</td>
                                                <td class="text-right">$1494.00</td>
                                            </tr>
                                            <tr>
                                                <td>Agent metod</td>
                                                <td>100391</td>
                                                <td>Camera C430W 4k</td>
                                                <td class="text-right">$699.00</td>
                                                <td class="text-right">1</td>
                                                <td class="text-right">$699.00</td>
                                            </tr>
                                            <tr>
                                                <td>Joel yamila</td>
                                                <td>100393</td>
                                                <td>USB 3.0 Cable</td>
                                                <td class="text-right">$10.00</td>
                                                <td class="text-right">3</td>
                                                <td class="text-right">$30.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        
                        <div class="col-lg-3">
                            <h4 class="title-1 m-b-25">Upcoming Meetings</h4>
                            <div class="au-card au-card--bg-blue au-card-top-countries m-b-40">
                                <div class="au-card-inner">
                                    <div class="table-responsive">
                                        <table class="table table-top-countries">
                                            <tbody>
                                                <tr>
                                                    <td>United States</td>
                                                    <td class="text-right">$119,366.96</td>
                                                </tr>
                                                <tr>
                                                    <td>Australia</td>
                                                    <td class="text-right">$70,261.65</td>
                                                </tr>
                                                <tr>
                                                    <td>United Kingdom</td>
                                                    <td class="text-right">$46,399.22</td>
                                                </tr>
                                                <tr>
                                                    <td>Turkey</td>
                                                    <td class="text-right">$35,364.90</td>
                                                </tr>
                                                <tr>
                                                    <td>Germany</td>
                                                    <td class="text-right">$20,366.96</td>
                                                </tr>
                                                <tr>
                                                    <td>France</td>
                                                    <td class="text-right">$10,366.96</td>
                                                </tr>
                                                <tr>
                                                    <td>Australia</td>
                                                    <td class="text-right">$5,366.96</td>
                                                </tr>
                                                <tr>
                                                    <td>Italy</td>
                                                    <td class="text-right">$1639.32</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="copyright">
                            <p>Copyright © 2024 hr management. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    </div>  
</div>
<add v-if="displayModal" @closeForm="displayModal = false"/>
<candidate v-if="displayModal2" @closeForm="displayModal2 = false"/>
</template>
<script setup>
import {ref} from 'vue'
import add from "@/components/modals/jobs/jobs.vue";
import candidate from "@/components/modals/candidates/candidates.vue";

let spinner = ref(false);
let spinner2 = ref(false);
let displayModal = ref(false);
let displayModal2 = ref(false);

     function openModal(){
            spinner.value = true;
            setTimeout(()=>{
                displayModal.value = true
                spinner.value = false;
            }, 200)
        }

     function openModalCandidate(){
            spinner2.value = true;
            setTimeout(()=>{
                displayModal2.value = true
                spinner2.value = false;
            }, 200)
        }
</script>
<style>
</style>