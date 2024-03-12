import axios from "axios"

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${apiKey}`
    }
})

