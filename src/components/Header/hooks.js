import useSWR from 'swr'
import { getUserInfo } from '../../api/user'

const useGetUserInfo = () => {
  const { data } = useSWR('getUserInfo', () => getUserInfo())
  return {
    data
  }
}

export default useGetUserInfo
