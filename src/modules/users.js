    let users = {};
    if (localStorage.getItem('users'))  {
        users = JSON.parse(localStorage.getItem('users')); 
    }
    
    export default users;