import { axiosClient } from "../utils";

export const cartApi = {
    addToCart: (data: any) => axiosClient.post('/carts', data),
    getDataCartByUser: (email?: string) => axiosClient.get(`/carts?populate[products][populate][0]=banner&filters[email][$eq]=${email}`)
}