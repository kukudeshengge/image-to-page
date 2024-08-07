import {v4 as uuid} from "uuid";

const DefaultValue = {
    time: 1,
    delay: 0,
    count: 1,
    loop: false
}

export const createFadeInAnimation = () => {
    return {
        ...DefaultValue,
        id: uuid(),
        name: '淡入',
        attr: 'opacity',
        start: 0,
        end: 1
    }
}

export const list = [
]
