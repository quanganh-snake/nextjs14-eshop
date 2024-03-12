import { axiosClient } from "../utils";

export const cartApi = {
    addToCart: (data: any) => axiosClient.post('/carts', data),
    getDataCartByUser: (email?: string) => axiosClient.get(`/carts?populate[products][populate][0]=thumbnail&filters[email][$eq]=${email}`),
    delCartItem: (id: string | number) => axiosClient.delete(`/carts/${id}`),
}