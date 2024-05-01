import { LOCALSTORAGE_KEYS } from '../utils/constants';

export const getUserById = (id) => {
    let users = localStorage.getItem(LOCALSTORAGE_KEYS.USER_DATA);
    if(users){
        users = JSON.parse(users);
        return {index: users.findIndex(user => user.id == id),user: users.find(user => user.id == id)};
    }else{
        return null;
    }
}

export const checkEmailExist = (email, id) => {
    let users = localStorage.getItem(LOCALSTORAGE_KEYS.USER_DATA);
    if(users){
        users = JSON.parse(users);
        return users.findIndex(user => user.id != id && user.email == email) == -1;
    }else{
        return false;
    }
}

export const changePassword = (index, password) => {
    let users = localStorage.getItem(LOCALSTORAGE_KEYS.USER_DATA);
    if(users){
        users = JSON.parse(users);
        users[index].password = password;
        localStorage.setItem(LOCALSTORAGE_KEYS.USER_DATA, JSON.stringify(users));
        return true;
    }else{
        return null;
    }
}

export const updateUser = (index, data) => {
    let users = localStorage.getItem(LOCALSTORAGE_KEYS.USER_DATA);
    if(users){
        users = JSON.parse(users);
        users[index] = data;
        localStorage.setItem(LOCALSTORAGE_KEYS.USER_DATA, JSON.stringify(users));
        return true;
    }else{
        return null;
    }
}