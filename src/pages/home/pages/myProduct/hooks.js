import { deleteImage, imageList } from '../../../../api/image'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export const useImageList = (formParams) => {
  const { data, isLoading, isValidating, mutate } = useSWR([imageList.name, formParams], () => {
    const params = {
      name: formParams.name,
      startTime: formParams.time?.[0].format('YYYY-MM-DD'),
      endTime: formParams.time?.[1].format('YYYY-MM-DD')
    }
    return imageList(params)
  }, {
    dedupingInterval: 0,
    focusThrottleInterval: 0,
    revalidateOnMount: true
  })
  
  return {
    isLoading,
    mutate,
    data: data ? ['add', ...data] : []
  }
}

export const useImageDelete = () => {
  const { trigger, isMutating } = useSWRMutation(deleteImage.name, (key, { arg }) => deleteImage(arg))
  
  return {
    trigger,
    isMutating
  }
}
