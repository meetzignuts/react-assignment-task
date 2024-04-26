export const storeUser = (data) => {
    let users = localStorage.getItem('users');
    if(users){
        users = JSON.parse(users);
        users.push({
            id: users.length+1,
            ...data
        });
        localStorage.setItem('users', JSON.stringify(users));
    }else{
        localStorage.setItem('users', JSON.stringify([{id: 1,...data}]));
    }
}

export const getUserByEmail = (email) => {
    let users = localStorage.getItem('users');
    if(users){
        users = JSON.parse(users);
        return users.findIndex(user => user.email == email) != -1
    }else{
        return false;
    }
}