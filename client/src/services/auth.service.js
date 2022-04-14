import {axiosService} from './axios.service';
import {urls} from '../config/urls';


export const authService = {
    auth: (user) => axiosService.post(`${urls.auth}`, user).then(value => value.data),
    createUser: (user) => axiosService.post(`${urls.users}`, user).then(value => value.data),
    activateUser: (token) => axiosService.get(`${urls.auth}/activate/${token}`).then(value => value.data),
    getUserById: (id, token) => axiosService.get(
        `${urls.users}/${id}`,
        {headers: {Authorization: `Bearer ${token}`}}
    ).then(value => value.data)
}
