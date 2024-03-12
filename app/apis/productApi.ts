import { axiosClient } from "@/utils";

export const productApi = {
    getLatestProducts: () => axiosClient.get('/products?populate=*')
}