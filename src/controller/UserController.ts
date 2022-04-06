import axios from "axios";
import { setToken } from ".";
import { UserItem } from "../model/UserItem";

class UserController {

    async getUserList() {
        return setToken.get(`/users/list`).then(res => {
            return res.data;
        })
    }

    async addUser(user: UserItem) {
        return setToken.post(`/add/user`, {user}).then(res => {
            return res.data;
        })
    }

    async updateUser(user: UserItem) {
        return setToken.put(`/user/update`, {user}).then(res => {
            return res.data;
        })
    }

    async deleteUser(id: string) {
        return setToken.delete(`/delete/user/${id}`).then(res => {
            return res.data;
        })
    }

    async login(user: object) {
        return setToken.post(`/users/login`, user).then(res => {
            return res;
        })
    }

    async register(user: object) {
        return setToken.post(`/users/register`, user).then(res => {
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