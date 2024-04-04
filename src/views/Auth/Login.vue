<template>
   <div class="page-wrappers">
        <div class="page-content--bge54"
            style="background-image: url('/images/icon/bg-register-img.jpg')">
            <div class="containers">
                <div class="login-wraps">
                    <h3 class="text-center" style="color:#3f61c5">
                        Hr Management
                    </h3>
                    <br>
                    <div class="frame">
                        <div class="row">
                            <div class="col-sm-6">
                                <img src="/images/icon/logins.png" alt=""
                                    class="login-image">
                            </div>
                            <div class="col-sm-6">
                                <div class="nav">
                                    <ul class="links">
                                        <li class="signin-active">
                                            <a class="btn">Login</a>
                                        </li>
                                        <li class="signup-inactive">
                                            <a class="btn">Sign up </a>
                                        </li>
                                    </ul>
                                </div>
                                <div ng-app ng-init="checked = false">
                                    <form class="form-signin" @submit.prevent>
                                        <div class="form-group">
                                            <input class="au-input au-input--full"
                                                type="text" name="email"
                                                placeholder="Username"
                                                v-model="form.username">
                                        </div>
                                        <div class="form-group">
                                            <input class="au-input au-input--full"
                                                type="password" name="password"
                                                placeholder="Password"
                                                v-model="form.password">
                                        </div>
                                        <div class="login-checkbox">
                                            <label>
                                                <input type="checkbox"
                                                    name="remember"> 
                                                    <span style="color:#3f61c5">
                                                        Remember Me
                                                    </span>
                                            </label>
                                            <label>
                                                <a href="#">
                                                    Forgot
                                                    Password?
                                                </a>
                                            </label>
                                        </div>

                                        <button class="au-btn au-btn--block au-btn--green m-b-20"
                                            type="submit" @click="login">
                                            Login  <i class="fa" :class="[load?'fa fa-spinner fa-spin':'fa fa-sign-in']"></i>
                                        </button>

                                        <button  class="au-btn au-btn--block au-btn--blue m-b-20">
                                            sign in with Google
                                             <i class="zmdi zmdi-google"></i>
                                        </button>
                                    </form>

                                    <form class="form-signup" style="display: non;"  @submit.prevent>
                                        <div class="form-group">
                                            <input class="au-input au-input--full"
                                                type="text" name="fullname"
                                                required
                                                placeholder="First Name" v-model="signup.firstName"/>
                                        </div>
                                        <div class="form-group">
                                            <input class="au-input au-input--full"
                                                type="text" name="email"
                                                required
                                                placeholder="Last Name" v-model="signup.lastName"/>
                                        </div>
                                        <div class="form-group">
                                            <input class="au-input au-input--full"
                                                type="email" name="email"
                                                required
                                                placeholder="Email" v-model="signup.email"/>
                                        </div>
                                        <div class="form-group">
                                            <input class="au-input au-input--full"
                                                type="password" name="password"
                                                placeholder="Password" v-model="signup.password"/>
                                        </div>
                                        <div class="form-group">
                                            <input class="au-input au-input--full"
                                                type="password" name="confirmpassword"
                                                placeholder="Re-enter password" v-model="signup.retypePassword"/>
                                        </div>

                                        <button class="au-btn au-btn--block au-btn--green m-b-20"
                                            type="submit" @click="sign_up">
                                            Sign up <i class="fa" :class="[load_sign?'fa fa-spinner fa-spin':'fa fa-sign-in']"></i>
                                        </button>

                                        <button class="au-btn au-btn--block au-btn--blue m-b-20">
                                            sign up with Google 
                                            <i class="zmdi zmdi-google"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref, reactive } from "@vue/reactivity";
import { api } from '@/boot/axios.js';

const form = reactive({
    username:'',
    password:''
});

const signup = reactive({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    retypePassword:'',
});

let load = ref(false)
let load_sign = ref(false)

const login = async() =>{
    load.value = true;
    if(form.username !='' && form.password !='') {
        const response = await api({
            method: 'POST',
            api: `/auth/login`,
            data:{
                password: form.password,
                email: form.username,
            }
        }).finally(() => load.value = false);
        if (response.ok) {
            localStorage.setItem('isConnect',  true);
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('fullName', form.username);

            alertify.set('notifier','position', 'top-right');
            alertify.success(`User log in successfully`); 

            clearForm();
                window.location = '/Layout';
        }
            
    } else {
        load.value = false;
        alertify.set('notifier','position', 'top-right');
		alertify.error(`Fields are required `); 
    }
}

// Sign up
const sign_up  = async()=>{
    if (signup.firstName !='' && signup.lastName !='' && signup.email !='' && signup.password !='' && signup.retypePassword !=''){
        load_sign.value = true;
        const response = await api({
            method: 'POST',
            api: `/auth/signup`,
            data:{
                firstName: signup.firstName,
                lastName: signup.lastName,
                email: signup.email,
                password: signup.password,
                retypePassword: signup.retypePassword,
            }
        }).finally(() => load_sign.value = false);
        if (response.ok) {
            alertify.set('notifier','position', 'top-right');
            alertify.success(`${response.data.message}`); 

            clearForm();
            $(".form-signin").toggleClass("form-signin-left");
            $(".form-signup").toggleClass("form-signup-left");
            $(".frame").toggleClass("frame-long");
            $(".signup-inactive").toggleClass("signup-active");
            $(".signin-active").toggleClass("signin-inactive");
            $(".forgot").toggleClass("forgot-left");   
            $(this).removeClass("idle").addClass("active");
        }
    } else {
        load_sign.value = false;
        alertify.set('notifier','position', 'top-right');
		alertify.error(`Fields are required `); 
    }
}

$(function() {
	$(".btn").click(function() {
        $(".form-signin").toggleClass("form-signin-left");
        $(".form-signup").toggleClass("form-signup-left");
        $(".frame").toggleClass("frame-long");
        $(".signup-inactive").toggleClass("signup-active");
        $(".signin-active").toggleClass("signin-inactive");
        $(".forgot").toggleClass("forgot-left");   
        $(this).removeClass("idle").addClass("active");
	});
});

$(function() {
	$(".btn-signup").click(function() {
        $(".nav").toggleClass("nav-up");
        $(".form-signup-left").toggleClass("form-signup-down");
        $(".success").toggleClass("success-left"); 
        $(".frame").toggleClass("frame-short");
	});
});

$(function() {
	$(".btn-signin").click(function() {
        $(".btn-animate").toggleClass("btn-animate-grow");
        $(".welcome").toggleClass("welcome-left");
        $(".cover-photo").toggleClass("cover-photo-down");
        $(".frame").toggleClass("frame-short");
        $(".profile-photo").toggleClass("profile-photo-down");
        $(".btn-goback").toggleClass("btn-goback-up");
        $(".forgot").toggleClass("forgot-fade");
	});
});

function clearForm() // THE CLEAR FORM FUNCTION
{
    $('input[type="text"]').val('');
    $('input[type="password"]').val('');
    $('input[type="email"]').val('');
    $('input[type="checkbox"]').prop('checked', false); // Uncheck
    $('select').val('');
    $('input[type="date"]').val('');
    $('textarea').val('');
}
</script>
<style scoped>
            .frame {
                overflow: hidden;
                transition: all .5s ease;
               position: relative;
                /* right: 200px; */
            }

            .frame-long {
               height: 615px;
            }

            .frame-short {
                height: auto; /* Remove fixed height */
                margin-top: 5%;
                height: 400px;
                /* margin-top: 50px; */
                box-shadow: 0px 2px 7px rgba(0,0,0,0.1);
            }

            .page-wrappers {
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            .page-content--bge54 {
                flex: 1;
                background-size: cover;
                background-position: center;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .containers {
                max-width: 900px;
                width: 100%;
                padding: 0 15px;
            }

            .login-wraps {
                background-color: rgba(255, 255, 255, 0.8);
                padding: 50px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }

            .login-image {
                width: 100%;
                max-width: 100%;
                height: auto;
            }

        .nav {
            margin-top: 20px;
            text-align: center;
            margin-bottom: 22px;
            opacity: 1;
             transition: all .5s ease;
        }

        .nav-up {
            transform: translateY(-100px);
            opacity: 0;
        }

        .links {
            list-style-type: none;
            padding: 0;
        }

        .links li {
            display: inline;
            margin-right: 10px;
        }

        .btn {
            /* background-color: #1059FF; */
            color: #fff;
            /* padding: 10px 20px; */
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .btn:hover {
            /* background-color: #0F4FE6; */
        }

        .signin-active a {
            padding-bottom: 10px;
            color: #1059FF;
            text-decoration: none;
            border-bottom: solid 3px #ffe04a;
            transition: all .25s ease;
            cursor: pointer;
            font-weight: bold;
            font-size: 20px;
        }

        .signin-inactive a {
            padding-bottom: 0;
            color: rgba(255,255,255,.3);
            text-decoration: none;
            border-bottom: none;
            cursor: pointer;
        }

        .signup-active a {
            cursor: pointer;
            color: #ffffff;
            text-decoration: none;
            border-bottom: solid 3px #ffe04a;
            padding-bottom: 10px;
        }

        .signup-inactive a {
            cursor: pointer;
            color:#1059FF;
            text-decoration: none;
            transition: all .25s ease;
            font-weight: bold;
            font-size: 20px;
        }

        .form-signup {
       
        /* padding-left: 37px;
        padding-right: 37px;
        padding-top: 55px; */
        position: relative;
        top: -275px;
         left: 400px;
        opacity: 0;
        transition: all .5s ease;
        }

        .form-signup-left {
            transform: translateX(-399px);
            opacity: 1;
        }


        .form-signup-down {
            top: 0px;
            opacity: 0;
         }

         .forgot-left {
            transform: translateX(-400px);
            opacity: 0;
        }

        .forgot-fade {
            opacity: 0;
        }


        .welcome {
            width: 100%;
            height: 50px;
            position: relative;
            color: rgba(35,43,85,0.75);
            opacity: 0;
            transition: transform 1.5s ease .25s, opacity .1s ease 1s;
        }

        .welcome-left {
            transform: translateY(-780px);
            opacity: 1; 
        }

        .success {
            width: 80%;
            height: 150px;
            text-align: center;
            position: relative;
            top: -890px;
            left: 450px;
            opacity: .0;
            transition: all .8s .4s ease;
        }

        .success-left {
            transform: translateX(-406px);
            opacity: 1;
        }

       .successtext {
            color: #ffffff;
            font-size: 16px;
            font-weight: 300;
            margin-top: -35px;
            padding-left: 37px;
            padding-right: 37px;
        }

        .form-signin {
            /* width: 430px; */
            /* height: 375px;
                font-size: 16px;
                font-weight: 300; */
            /* padding-left: 37px;
            padding-right: 37px;
            padding-top: 55px; */
         transition: opacity .5s ease, transform .5s ease;
        }

        .form-signin-left {
            transform: translateX(-400px);
            opacity: .0;
        }

       

        /* Responsive styles */
        @media (max-width: 767px) {
            .login-wraps {
                padding: 30px;
            }
        }

        @media (max-width: 575px) {
            .login-wraps {
                padding: 20px;
            }
        }
</style>