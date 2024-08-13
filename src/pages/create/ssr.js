import { addImage } from '../../api/image'
import useSWRMutation from 'swr/mutation'

export const useAddImage = () => {
  const { trigger, isMutating } = useSWRMutation('/addImage', (url, { arg }) => addImage(arg))
  return {
    trigger,
    isMutating
  }
}
