import { useMutation } from '@tanstack/react-query'
import methods from '../../interceptor/interceptor'

export const NewOrderByClient = async (data: any) => {
    return await methods.post(`${process.env.NEXT_PUBLIC_API_URL}/Order/NewOrderByClient`, data)
}

export const NewOrderByWaiter = async (data: any) => {
    return await methods.post(`${process.env.NEXT_PUBLIC_API_URL}/Order/NewOrderByWaiter`, data)
}

export const useNewOrderByClient = () =>
    useMutation(['NewOrderByClient'], NewOrderByClient)

export const useNewOrderByWaiter = () =>
    useMutation(['NewOrderByWaiter'], NewOrderByWaiter)
