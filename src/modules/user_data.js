import { api } from '@/boot/axios.js';
var user = {};
export default async function user_infos(){
    const response = await api({
        method:'GET',
        api:'user/profile/load',
    });  
      user = response.data.data
    return user;
}

