import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { tools } from './config'
import Nav from './components/Nav'
import Draw from './components/Draw'
import Attr from './components/Attr'
import { observer } from 'mobx-react-lite'
import { fabric } from 'fabric'
import { createStore } from '../../store/create'

const cs = classNames.bind(styles)

const Create = () => {
  const { canvas } = createStore
  const nav = useNavigate()
  const goBack = () => {
    nav(-1)
  }
  const tooClick = (item) => {
    const text = new fabric.IText('你好啊', {
      fontSize: 14,
      left: 250,
      top: 300
    })
    canvas.add(text)
    canvas.renderAll()
    createStore.modifiedCanvas()
  }
  return (
    <div className={cs('create')}>
      <div className={cs('header')}>
        <div className={cs('back')} onClick={goBack}>
          <img src="https://ossprod.jrdaimao.com/file/1721035943933168.svg" alt=""/>
          <img src="https://ossprod.jrdaimao.com/file/1721036074203577.svg" alt=""/>
          <span>返回</span>
        </div>
        <div className={cs('header-center')}>
          {
            tools.map(item => {
              return <div onClick={() => tooClick(item)} key={item.type}>
                <img src={item.icon} alt=""/>
                <img src={item.activeIcon} alt=""/>
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
    </div>
  )
}

export default observer(Create)
