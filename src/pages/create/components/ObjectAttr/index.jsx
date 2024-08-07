import React, {useEffect, useRef} from 'react';
import styles from './index.module.less'
import classNames from "classnames/bind";
import {tabCom, tabList} from "./config";
import {observer} from 'mobx-react-lite';
import {createStore} from "../../../../store/create";
import IScroll from 'iscroll'

const cs = classNames.bind(styles)

const MoveWrap = () => {
    const {comSettingActiveKey, showComSetting} = createStore
    const scroll = useRef(null)
    const moveEl = useRef(null)
    const moveing = useRef(false)
    const diffX = useRef(0)
    const diffY = useRef(0)

    const changeKey = item => {
        createStore.comSettingActiveKey = item.value
        setTimeout(() => scroll.current.refresh())
    }

    useEffect(() => {
        if (!showComSetting) return
        scroll.current = new IScroll('#object-attr-scroll', {
            mouseWheel: true,
            scrollbars: true,
            preventDefault: false
        })
        const defaultX = sessionStorage.getItem('ObjectAttrX')
        const defaultY = sessionStorage.getItem('ObjectAttrY')
        if (defaultX && defaultY) {
            moveEl.current.style.left = defaultX
            moveEl.current.style.top = defaultY
        }
        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
        return () => {
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
        }
    }, [showComSetting])

    const mouseMove = (e) => {
        if (!moveing.current) return
        let x = e.clientX - diffX.current
        let y = e.clientY - diffY.current
        if (y < 60) {
            y = 60
        } else if (y > window.innerHeight - moveEl.current.offsetHeight - 4) {
            y = window.innerHeight - moveEl.current.offsetHeight - 4
        }
        if (x < 4) {
            x = 4
        } else if (x > window.innerWidth - moveEl.current.offsetWidth - 4) {
            x = x > window.innerWidth - moveEl.current.offsetWidth - 4
        }
        moveEl.current.style.left = `${x}px`
        moveEl.current.style.top = `${y}px`
    }
    const mouseUp = () => {
        moveing.current = false
        sessionStorage.setItem('ObjectAttrX', moveEl.current.style.left)
        sessionStorage.setItem('ObjectAttrY', moveEl.current.style.top)
    }
    const mouseDown = (e) => {
        diffX.current = e.clientX - moveEl.current.offsetLeft
        diffY.current = e.clientY - moveEl.current.offsetTop
        moveing.current = true
    }
    const close = () => {
        createStore.showComSetting = false
    }
    const Com = tabCom[comSettingActiveKey]
    if (!showComSetting) return null
    return (
        <div className={cs('move-wrap')} ref={moveEl}>
            <div className={cs('move-wrap-title')} onMouseDown={mouseDown}>
                <span>组件设置</span>
                <img onClick={close} src="https://ossprod.jrdaimao.com/file/1722406824491386.svg" alt=""/>
            </div>
            <div className={cs('tab')}>
                {
                    tabList.map(item => {
                        return <div
                            onClick={() => changeKey(item)}
                            key={item.value}
                            className={cs({active: comSettingActiveKey === item.value})}
                        >
                            {item.title}
                        </div>
                    })
                }
            </div>
            <div className={cs('content')} id='object-attr-scroll'>
                <div>
                    {Com && <Com/>}
                </div>
            </div>
        </div>
    );
};

export default observer(MoveWrap);
