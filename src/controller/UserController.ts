import axios from "axios";
import { setToken } from ".";

class UserController {

    async login(user: object) {
        return setToken.post(`/users/login`, user).then(res => {
            return res;
        })
    }

    async getMe() {
        return setToken.get(`/get-me`).then(res => {
            if (res != undefined) {
                return res.data;
            }
        })
    }

}

export const userController = new UserController();