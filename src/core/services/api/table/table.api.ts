import { useQuery } from '@tanstack/react-query'
import methods from '../../interceptor/interceptor'

const GetAllTablesByWaiter = () => {
    return methods.get(`${process.env.NEXT_PUBLIC_API_URL}/Table/GetAllTablesByWaiter`)
}

export const useGetAllTablesByWaiter = () =>
    useQuery(['GetAllTablesByWaiter'], GetAllTablesByWaiter, {
        enabled: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
