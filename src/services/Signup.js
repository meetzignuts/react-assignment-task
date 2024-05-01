import { LOCALSTORAGE_KEYS } from '../utils/constants';

export const storeUser = (data) => {
    let users = localStorage.getItem(LOCALSTORAGE_KEYS.USER_DATA);
    if(users){
        users = JSON.parse(users);
        users.push({
            id: users.length+1,
            ...data
        });
        localStorage.setItem(LOCALSTORAGE_KEYS.USER_DATA, JSON.stringify(users));
    }else{
        localStorage.setItem(LOCALSTORAGE_KEYS.USER_DATA, JSON.stringify([{id: 1,...data}]));
    }
}

export const getUserByEmail = (email) => {
    let users = localStorage.getItem(LOCALSTORAGE_KEYS.USER_DATA);
    if(users){
        users = JSON.parse(users);
        return users.findIndex(user => user.email == email) != -1
    }else{
        return false;
    }
}