import { instance } from "@/axios/config"

export const newProduct = (data: FormData) => {
    return instance.post('/', data)
}

export const getData = () => {
    return instance.get('/1')
}