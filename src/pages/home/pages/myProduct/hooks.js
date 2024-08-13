import { imageList } from '../../../../api/image'
import useSWR from 'swr'

export const useImageList = () => {
  const { data, isLoading } = useSWR(imageList.name, () => imageList())
  return {
    isLoading,
    data: data ? ['add', ...data] : []
  }
}
