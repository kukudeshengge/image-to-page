import useSWR from 'swr'
import { getUserInfo } from '../../api/user'

const useGetUserInfo = () => {
  const { data } = useSWR('getUserInfo', () => getUserInfo(), {
    onSuccess: data => {
      localStorage.setItem('role', data.role)
    }
  })
  return {
    data
  }
}

export default useGetUserInfo
