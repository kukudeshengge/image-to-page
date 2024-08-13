import { QF } from '@dm/http_request'

function CreateFetch(prePath) {
    const fetch =  new QF(prePath, 100000)
    fetch.setHeads = async function (fromHead) {
        // const authorization = getLocal(LocalKeys.CHAT_TOKEN);
        // const platform = getLocal(LocalKeys.PLATFORM || '');
        // const env = getLocal(LocalKeys.ENV || '');
        return Object.assign(
            {
                // authorization: authorization,
                // platform,
                // env
            },
            fromHead
        );
    };
    return fetch;
}

export const fetch = CreateFetch('')
export const acFetch = CreateFetch('')
acFetch.code = 1
