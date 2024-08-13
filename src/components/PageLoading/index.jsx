import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import Splitting from 'splitting'

const cs = classNames.bind(styles)

const PageLoading = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    Splitting({
      target: '#page-loading-container',
      by: 'items',
      matching: 'li'
    })
    setLoading(false)
  }, [])
  
  return (
    <div className={cs('page-loading')} style={{ opacity: loading ? 0 : 1 }}>
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

export default PageLoading
