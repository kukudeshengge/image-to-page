import { getImageDetail, saveImage } from '../../api/image'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'

export const useSaveImage = () => {
  const { trigger, isMutating } = useSWRMutation(saveImage.name, (key, { arg }) => saveImage(arg))
  return {
    trigger,
    isMutating
  }
}

export const useImageDetail = (params) => {
  const { data, isLoading } = useSWR(`${getImageDetail.name}-${params.id}`, () => getImageDetail(params))
  return {
    data,
    isLoading
  }
}
