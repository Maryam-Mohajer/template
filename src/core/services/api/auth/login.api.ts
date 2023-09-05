import { useMutation } from '@tanstack/react-query'
import methods from '../../interceptor/interceptor'

export const Accountlogin = async (data: any) => {
    return await methods.post(`${process.env.NEXT_PUBLIC_API_URL}/Account/Login`, data)
}

export const useAccountlogin = () =>
    useMutation(['accountlogin'], Accountlogin)
