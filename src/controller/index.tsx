import axios from "axios";

const setToken = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 30000
})

const setTokenAdmin = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 30000
})

setToken.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status == 403) {
            localStorage.removeItem("Authorization");
            window.location.href = (`/users/login`);
        }
    }
)

setTokenAdmin.interceptors.response.use(
    response => response,
    error => {        
        if (error.response.status == 401) {            
            window.location.href = (`/`);
        }
        if (error.response.status == 403) {
            localStorage.removeItem("Authorization");
            window.location.href = (`/users/login`);
        }
    }
)

setToken.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization") || "";
setTokenAdmin.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization") || "";

export {setToken, setTokenAdmin}