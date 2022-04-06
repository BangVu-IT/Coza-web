import React, { useEffect, useState } from "react";
import { userController } from "../../../controller/UserController";
import { UserItem } from "../../../model/UserItem";
import DataUser from "./DataUser";

export default function UserList() {
  const [data, setData] = useState<UserItem[]>([]);
  const [userUpdate, setUserUpdate] = useState<UserItem>({
    user_id: "",
    full_name: "",
    user_name: "",
    pass_word: "",
    phone_number: 0,
    email: "",
    address: "",
    post_code: "",
    role: "user",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUserUpdate({
      user_id: "",
      full_name: "",
      user_name: "",
      pass_word: "",
      phone_number: 0,
      email: "",
      address: "",
      post_code: "",
      role: "user",
    });
  };

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    userController.getUserList().then((res) => {
      setData(res);
    });
  };

  const onAddUser = (user: UserItem) => {
    if (userUpdate.user_id != "") {          
      userController.updateUser(user).then((res) => {
        getUserList();
      });
    } else {
      userController.addUser(user).then((res) => {
        getUserList();
      });
    }
  };

  const onDeleteUser = (id: string) => {
    userController.deleteUser(id).then((res) => {
      getUserList();
    });
  };

  const onUpdateUser = (user: UserItem) => {
    setUserUpdate(user);
  };

  return (
    <DataUser
      userList={data}
      onAddUser={onAddUser}
      onUpdateUser={onUpdateUser}
      userUpdate={userUpdate}
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      onDeleteUser={onDeleteUser}
    />
  );
}
