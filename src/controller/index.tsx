import axios from "axios";
import { error } from "console";

const setToken = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 30000
})

const token = localStorage.getItem("Authorization") || "";
setToken.defaults.headers.common['Authorization'] = token;

setToken.interceptors.response.use(
    response => response,
    error => {    
        if (error.response.status !== 200) {
            window.location.href = (`/users/login`);
        }
    }
)

export {setToken}