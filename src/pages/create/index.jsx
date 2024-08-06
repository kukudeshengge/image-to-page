import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import {useNavigate} from 'react-router-dom'
import {Button} from 'antd'
import {tools} from './config'
import Nav from './components/Nav'
import Draw from './components/Draw'
import Attr from './components/Attr'
import {observer} from 'mobx-react-lite'
import {createStore} from '../../store/create'
import DownloadPage from './components/DownloadPage'
import ObjectAttr from "./components/ObjectAttr";

const cs = classNames.bind(styles)

const Create = () => {
    const {workspace} = createStore
    const nav = useNavigate()
    const goBack = () => {
        nav(-1)
    }
    const addObject = item => {
        const name = `add${item.type[0].toUpperCase() + item.type.slice(1)}`
        const func = workspace.add[name]
        if (!func) return
        func()
    }
    return (
        <div className={cs('create')}>
            <div className={cs('header')}>
                <div className={cs('back')} onClick={goBack}>
                    <img draggable={false} src="https://ossprod.jrdaimao.com/file/1721035943933168.svg" alt=""/>
                    <img draggable={false} src="https://ossprod.jrdaimao.com/file/1721036074203577.svg" alt=""/>
                    <span>返回</span>
                </div>
                <div className={cs('header-center')}>
                    {
                        tools.map(item => {
                            return <div onClick={() => addObject(item)} key={item.type}>
                                <img draggable={false} src={item.icon} alt=""/>
                                <img draggable={false} src={item.activeIcon} alt=""/>
                                <span>{item.title}</span>
                            </div>
                        })
                    }
                </div>
                <div className={cs('buttons')}>
                    <Button>预览</Button>
                    <Button type="primary">保存</Button>
                    <Button type="primary">发布</Button>
                </div>
            </div>
            <div className={cs('content')}>
                <Nav/>
                <Draw/>
                <Attr/>
            </div>
            {/*<DownloadPage/>*/}
            <ObjectAttr/>
        </div>
    )
}

export default observer(Create)
