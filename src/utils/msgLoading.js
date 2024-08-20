import { message } from 'antd'

export const showLoading = (text) => {
  message.open({
    type: 'loading',
    content: text,
    duration: 0
  })
}

export const hideLoading = () => {
  message.destroy()
}
