import bcrypt from 'bcryptjs';
import { LOCALSTORAGE_KEYS } from '../utils/constants';

export const login = async (data) => {
    let users = localStorage.getItem(LOCALSTORAGE_KEYS.USER_DATA);
    if(users){
        users = JSON.parse(users);
        let findUser = users.findIndex(user => user.email === data.email);
        if(findUser !== -1){
            const response = await bcrypt.compare(data.password, users[findUser]["password"]);
            if (response) {
                return {id: users[findUser]["id"],message: "SUCCESS"};
              } else {
                return {id: null,message: "INVALID_CREDENTIALS"};
              }
        }else{
            return {id: null,message: "NOT_EXIST"}
        }
    }else{
        return {id: null,message: "NOT_EXIST"}
    }
}