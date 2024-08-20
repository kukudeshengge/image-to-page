import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import Splitting from 'splitting'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../store/create'

const cs = classNames.bind(styles)

const PageLoading = () => {
  const { canvasLoading } = createStore
  
  useEffect(() => {
    Splitting({
      target: '#page-loading-container',
      by: 'items',
      matching: 'li'
    })
  }, [])
  
  return (
    <div className={cs('page-loading', { 'opacity-loading': !canvasLoading })}>
      <div className={cs('container')} id="page-loading-container">
        <ul>
          <li>搭</li>
          <li>建</li>
          <li>H</li>
          <li>5</li>
          <li>页</li>
          <li>面</li>
        </ul>
      </div>
    </div>
  )
}

export default observer(PageLoading)
