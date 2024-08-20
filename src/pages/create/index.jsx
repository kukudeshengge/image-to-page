import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useNavigate, useParams } from 'react-router-dom'
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
import { useImageDetail } from './hooks'
import PageLoading from '../../components/PageLoading'
import EmptyImage from './components/EmptyImage'
import useGetUserInfo from '../../components/Header/hooks'
import Publish from './components/Publish'

const cs = classNames.bind(styles)

const Create = () => {
  const { workspace } = createStore
  const nav = useNavigate()
  const { id } = useParams()
  const { data: userInfo } = useGetUserInfo()
  const { onSave, uploadToTemplate } = useSave()
  const { data, isLoading } = useImageDetail({ id })
  
  useEffect(() => {
    createStore.id = id
    return () => {
      createStore.clearStore()
    }
  }, [])
  
  useEffect(() => {
    if (data && workspace) {
      createStore.setDetail(data)
    }
  }, [data, workspace])
  
  const addObject = item => {
    const func = workspace.add[item.type]
    func && func()
  }
  
  const onPreview = () => {
    onSave().then(() => {
      nav(`/preview/${id}`)
    })
  }
  
  const onPublish = () => {
    createStore.publishOpen = true
  }
  
  if (!data && !isLoading) {
    return <EmptyImage/>
  }
  return (
    <div className={cs('create')}>
      <div className={cs('header')}>
        <div className={cs('back')} onClick={() => nav(-1)}>
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
          {userInfo && userInfo.role === 'admin' ?
            <Button onClick={() => uploadToTemplate()}>保存模板</Button> : null}
          <Button onClick={onPreview}>预览</Button>
          <Button onClick={() => onSave()} type="primary">保存</Button>
          <Button onClick={onPublish} type="primary">发布</Button>
        </div>
      </div>
      <div className={cs('content')}>
        <Nav/>
        <Draw/>
        <Attr/>
      </div>
      <DownloadPage/>
      <ObjectAttr/>
      <Publish/>
      <PageLoading/>
    </div>
  )
}

export default observer(Create)
