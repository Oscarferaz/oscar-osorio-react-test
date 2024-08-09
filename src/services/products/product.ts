import { instance } from "@/axios/config"

export const newProduct = (data: FormData) => {
    return instance.post('/', data)
}