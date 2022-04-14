import {axiosService} from './axios.service';
import {urls} from '../config/urls';


export const carService = {
    getAll: (page = 1) => axiosService.get(`${urls.cars}?page=${page}`).then(value => value.data),
    getByParkId: (id, page = 1) => axiosService.get(`${urls.cars}?auto_park=${id}&page=${page}`).then(value => value.data),
    deleteById: (id, autoparkId) => axiosService.delete(`${urls.cars}/${id}/${autoparkId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(value => value.data)
}
