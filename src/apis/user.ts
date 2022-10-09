import { FormValue } from '@/types/user'
import { get } from './http'

export const login = async (params: FormValue) => {
  const { data, status } = await get({ url: 'user/login', params })
  localStorage.setItem('APP_TOKEN', data as string)
  return status
}
