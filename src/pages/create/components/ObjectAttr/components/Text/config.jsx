import styles from './index.module.less'
import classNames from "classnames/bind";
import {Slider, Tooltip} from "antd";

const cs = classNames.bind(styles)

export const textFormatList = [
    {
        title: '标题1',
        id: 0,
        style: {
            fontWeight: 700,
            fontSize: 18
        }
    },
    {
        title: '标题2',
        id: 1,
        style: {
            fontWeight: 600,
            fontSize: 16
        }
    },
    {
        title: '标题3',
        id: 2,
        style: {
            fontWeight: 500,
            fontSize: 16
        }
    },
    {
        title: '正文',
        id: 3,
        style: {
            fontWeight: 400,
            fontSize: 14
        }
    }
]


const alignList = [
    {
        title: '左对齐',
        image: 'https://ossprod.jrdaimao.com/file/1722910884719362.svg',
        selectedImage: 'https://ossprod.jrdaimao.com/file/1722911299958221.svg',
        type: 'left'
    },
    {
        title: '居中对齐',
        image: 'https://ossprod.jrdaimao.com/file/1722910922139861.svg',
        selectedImage: 'https://ossprod.jrdaimao.com/file/1722911314260985.svg',
        type: 'center'
    },
    {
        title: '右对齐',
        image: 'https://ossprod.jrdaimao.com/file/1722910937194273.svg',
        selectedImage: 'https://ossprod.jrdaimao.com/file/1722911322746407.svg',
        type: 'right'
    }
]

export const textFastHandleList = [
    {
        title: '加粗',
        type: 'weight',
        image: 'https://ossprod.jrdaimao.com/file/1722853212066674.svg'
    },
    {
        title: '斜体',
        type: 'italic',
        image: 'https://ossprod.jrdaimao.com/file/172285322046417.svg'
    },
    {
        title: '下划线',
        type: 'underline',
        image: 'https://ossprod.jrdaimao.com/file/1722853227215429.svg'
    },
    {
        title: '删除线',
        type: 'line-through',
        image: 'https://ossprod.jrdaimao.com/file/1722853233547868.svg'
    },
    {
        title: '对齐方式',
        type: 'align',
        image: 'https://ossprod.jrdaimao.com/file/1722853242080528.svg',
        renderContent: () => <div className={cs('align-fix')}>
            {
                alignList.map(item => {
                    return <Tooltip key={item.type} title={item.title} placement={"top"}>
                        <div key={item.type}>
                            <img src={item.image} alt=""/>
                        </div>
                    </Tooltip>
                })
            }
        </div>
    },
    {
        title: '行间距',
        type: 'colSpace',
        image: 'https://ossprod.jrdaimao.com/file/1722853254133296.svg',
        renderContent: () => <div className={cs('space-fix')}>
            <span>行间距</span><Slider style={{width: 100}} min={0} step={0.1} max={3}/>
        </div>
    },
    {
        title: '字间距',
        type: 'textSpace',
        image: 'https://ossprod.jrdaimao.com/file/1722853259992800.svg',
        renderContent: () => <div className={cs('space-fix')}>
            <span>字间距</span><Slider style={{width: 100}} min={0} step={1} max={100}/>
        </div>
    },
    {
        title: '清除样式',
        type: 'clear',
        image: 'https://ossprod.jrdaimao.com/file/1722853966926531.svg'
    },
]
