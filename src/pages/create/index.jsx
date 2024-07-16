import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { tools } from './config'

const cs = classNames.bind(styles)

const Create = () => {
  const nav = useNavigate()
  const goBack = () => {
    nav(-1)
  }
  return (
    <div className={cs('preview')}>
      <div className={cs('header')}>
        <div className={cs('back')} onClick={goBack}>
          <img src="https://ossprod.jrdaimao.com/file/1721035943933168.svg" alt=""/>
          <img src="https://ossprod.jrdaimao.com/file/1721036074203577.svg" alt=""/>
          <span>返回</span>
        </div>
        <div className={cs('header-center')}>
          {
            tools.map(item => {
              return <div key={item.type}>
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
    </div>
  )
}

export default Create
