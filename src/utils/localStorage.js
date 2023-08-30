export const addUserToLocalStorage = (user) =>{
    localStorage.setItem('user',JSON.stringify(user));
    // local storage mai string mai hi store hota hai
};

export const removeUserFromStorage = () =>{
    localStorage.removeItem('user');
}


export const getUserFromLocalStorage = () =>{
    const result = localStorage.getItem('user');
    const user = result? JSON.parse(result):null;
    return user;
}