import { queryResourceList } from '../../../../../../api/image'
import useSWR from 'swr'

export const useQueryResourceList = (options = {}) => {
  const params = {
    type: options.type
  }
  const { data, isLoading } = useSWR(`queryResourceList-${options.type}`, () => queryResourceList(params), options)
  
  return {
    data,
    isLoading,
  }
}
