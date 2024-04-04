import axios from 'axios';


const base_url = 'https://dull-gray-hedgehog-tam.cyclic.app'
axios.defaults.baseURL = base_url;  

axios.defaults.headers.common['Authorization'] = '';
let token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${ localStorage.getItem('token') }`;
}

export async function api({ ...args }) {
    try{
        const response = await axios({
            method:args.method,
            data:args.data,
            params:args.params,
            headers: {
                ...args.header,
                Authorization: axios.defaults.headers.common['Authorization']
            },
            baseURL:axios.defaults.baseURL + args.api
        })
        return { ok:true, data:response.data}
    } catch(error){
        // console.log(error);
        if (error.message && error.code == 'ERR_NETWORK'){
            alertify.set('notifier','position', 'top-right');
            alertify.error(`you are not connected !!!`); 
        } 

        if (error.code == 'ERR_BAD_REQUEST'){
            if (error.response.data.errorsList) {
               error.response.data.errorsList.forEach(element => {
                   
                alertify.set('notifier','position', 'top-right');
                return alertify.warning(` ${element}!!!`); 
            }); 
            } 
            else {
                alertify.set('notifier','position', 'top-right');
                return alertify.warning(` ${error.response.data.message}!!!`); 
            }
            
        }
        if (error.response) {
            alertify.set('notifier','position', 'top-right');
            return alertify.warning(` ${error.response.data.message}!!!`);
        }
        return { ok:false, error: error.response }
    }
}
