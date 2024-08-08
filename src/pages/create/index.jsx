import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { tools } from './config'
import Nav from './components/Nav'
import Draw from './components/Draw'
import Attr from './components/Attr'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../store/create'
import DownloadPage from './components/DownloadPage'
import ObjectAttr from './components/ObjectAttr'
import useSave from './hooks/useSave'

const cs = classNames.bind(styles)

const Create = () => {
  const { workspace } = createStore
  const { onPreview, onSave, onPublish } = useSave()
  const nav = useNavigate()
  const goBack = () => nav(-1)
  const addObject = item => {
    const func = workspace.add[item.type]
    if (!func) return
    func()
  }
  useEffect(() => {
    return () => {
      createStore.clearStore()
    }
  }, [])
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
          <Button onClick={() => onPreview}>预览</Button>
          <Button onClick={() => onSave()} type="primary">保存</Button>
          <Button onClick={() => onPublish()} type="primary">发布</Button>
        </div>
      </div>
      <div className={cs('content')}>
        <Nav/>
        <Draw/>
        <Attr/>
      </div>
      <DownloadPage/>
      <ObjectAttr/>
    </div>
  )
}

export default observer(Create)
