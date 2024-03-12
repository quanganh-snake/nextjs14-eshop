import { axiosClient } from "@/utils";

export const productApi = {
    getLatestProducts: () => axiosClient.get('/products?populate=*'),
    getProductbyId: (id: number | string) => axiosClient.get(`/products/${id}?populate=*`),
    getProductByCategory: (category: string) => axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`),
}