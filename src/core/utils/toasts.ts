import { toast } from 'react-hot-toast'

export const successToast = (message?: string) =>
  toast.success(message ? message : 'با موفقیت انجام شد', { id: 'success' })
export const warningToast = () => toast('test', { style: { border: '2px solid orange', color: 'orange' } })
export const errorToast = (message?: string) => toast.error(message ? message : 'مشکلی پیش آمده است')

export const ToastMesssageHandler = (success: boolean, error: boolean) => {
  if (success) {
    return successToast()
  } else if (error) {
    return errorToast()
  }
}
