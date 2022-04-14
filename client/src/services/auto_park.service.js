import {axiosService} from '.';
import {urls} from '../config/urls';


export const auto_parkService = {
    getAll: (page = 1) => axiosService.get(`${urls.auto_park}?page=${page}`).then(value => value.data),
    getById: (id) => axiosService.get(`${urls.auto_park}/${id}`).then(value => value.data),
    deleteById: (id) => axiosService.delete(`${urls.auto_park}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }
    ).then(value => value.data),
    create: (auto_park) => axiosService.post(`${urls.auto_park}`, auto_park,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }
    ).then(value => value.data),
    createCarByParkId: (id, car) => axiosService.post(`${urls.auto_park}/${id}/cars`, car,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }
    ).then(value => value.data)
}
