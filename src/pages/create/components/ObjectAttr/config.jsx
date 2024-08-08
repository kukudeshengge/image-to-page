import Animation from "./components/Animation";
import Handle from "./components/Handle";
import Style from './components/Style'

export const tabCom = {
    0: Style,
    1: Animation,
    2: Handle
}

export const tabList = [
    {
        title: '样式',
        value: 0,
    },
    {
        title: '动画',
        value: 1
    },
    {
        title: '触发',
        value: 2
    },
]
