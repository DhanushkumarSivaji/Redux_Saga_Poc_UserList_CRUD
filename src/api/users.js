import axios from 'axios';

export const getUsers = ( ) => {
    return axios.get('/users',{
        params: {
            limit:1000
        }
    });
}

export const createUser = ({firstName,lastName}) => {
    return axios.post('/users',{
        firstName,
        lastName
    });
}


export const deleteUser = (userId) => {
    return axios.delete(`/users/${userId}`);
};


export const updateUser = (user) => {
    console.log(user)
    return axios.put(`/users/${user.id}`,user);
}