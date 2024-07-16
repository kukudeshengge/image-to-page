import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { Empty } from 'antd'

const cs = classNames.bind(styles)

const Preview = () => {
  const nav = useNavigate()
  const goBack = () => {
    nav(-1)
  }
  return (
    <div className={cs('preview')}>
      <div className={cs('header')}>
        <div onClick={goBack}>
          <img src="https://ossprod.jrdaimao.com/file/1721035943933168.svg" alt=""/>
          <img src="https://ossprod.jrdaimao.com/file/1721036074203577.svg" alt=""/>
          <span>返回</span>
        </div>
        <div className={cs('header-title')}>没法看翁麻烦额我发么我发空位</div>
      </div>
      <div className={cs('content')}>
        <div className={cs('content-left')}></div>
        <div className={cs('content-center')}>
          <div className={cs('content-center-title')}>在网页中推广</div>
          <div className={cs('code-wrap')}>
            <div className={cs('code-img-wrap')}>
              <img className={cs('code-img')}
                   src="https://q3.itc.cn/q_70/images03/20240519/1b4e7565b46241b68288ae482412a866.jpeg" alt=""/>
              <span>手机扫一扫</span>
            </div>
            <div>
              <div className={cs('code-url')}>
                <span>https://www.baodifjiwefjefe.com</span>
                <span>复制链接</span>
              </div>
            </div>
          </div>
          <div className={cs('content-center-title')}>在微信小程序中推广</div>
          <div className={cs('empty-wrap')}>
            <Empty description="敬请期待"/>
          </div>
          <div className={cs('content-center-title')}>在支付宝小程序中推广</div>
          <div className={cs('empty-wrap')}>
            <Empty description="敬请期待"/>
          </div>
        </div>
        <div className={cs('content-right')}>
          <div className={cs('phone-wrap')}>
            <div className={cs('left')}>
              <div className={cs('phone')}></div>
            </div>
            <div className={cs('right')}>
              <div>上一页</div>
              <div>下一页</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
