import axios from "axios";

const setToken = axios.create({
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

setToken.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization") || "";

export {setToken}