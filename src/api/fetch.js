import { QF } from '@dm/http_request'

function CreateFetch (prePath) {
  const fetch = new QF(prePath, 100000)
  fetch.setHeads = async function (fromHead) {
    const authorization = localStorage.getItem('authorization')
    const platform = 'saas-pc'
    // const env = getLocal(LocalKeys.ENV || '');
    return Object.assign(
      {
        authorization: authorization,
        platform
        // env
      },
      fromHead
    )
  }
  fetch.afterFetch = (res) => {
    if (res.code === 401) {
      window.location.replace('/login')
    }
  }
  return fetch
}

export const fetch = CreateFetch('')
export const acFetch = CreateFetch('')
acFetch.code = 1
