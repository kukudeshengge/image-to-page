import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useNavigate, useParams } from 'react-router-dom'
import { useImageDetail } from '@/pages/create/hooks'
import { QRCode } from 'antd'
import PageLoading from '../../components/PageLoading'
import { getMiniQrCode } from '../../api/mini'
import IScroll from 'iscroll'
import { h5Url } from '../../config'
import Clipboard from 'clipboard'
import { message } from 'antd'
import { topicUrl } from '@/config'

const cs = classNames.bind(styles)

const Preview = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useImageDetail({ id })
  const [finish, setFinish] = useState(false)
  const [miniCodeUrl, setMiniCodeUrl] = useState('')
  const scroll = useRef(null)
  const iframe = useRef(null)
  const url = `${h5Url}/${id}`
  const wechatUrl = `${topicUrl}/page/jump/wxapp2?path=wish/pages/webView/index&url=${encodeURIComponent(h5Url)}`
  const goBack = () => nav('/')
  
  useEffect(() => {
    if (isLoading) return
    if (scroll.current) return
    scroll.current = new IScroll('#preview-content-scroll', {
      mouseWheel: true,
      scrollbars: true
    })
  }, [isLoading])
  
  useEffect(() => {
    new Clipboard('#copy-btn').on('success', () => {
      message.success('复制成功')
    }).on('error', (err) => {
      console.log(err)
      message.warning('复制失败')
    })
  }, [])
  
  useEffect(() => {
    initMiniQrCode()
  }, [])
  
  useEffect(() => {
    window.onmessage = e => {
      if (e && e.data.type === 'finish') {
        setFinish(true)
      }
    }
    return () => {
      window.onmessage = null
    }
  }, [])
  
  const initMiniQrCode = async () => {
    try {
      const res = await getMiniQrCode({
        url: h5Url
      }, 'wish/pages/webView/index')
      setMiniCodeUrl(res)
    } catch (err) {
    
    }
  }
  
  const prev = () => {
    iframe.current.contentWindow?.postMessage({ type: 'prev' }, '*')
  }
  
  const next = () => {
    iframe.current.contentWindow?.postMessage({ type: 'next' }, '*')
  }
  
  if (isLoading) {
    return <PageLoading/>
  }
  return (
    <div className={cs('preview')}>
      <div className={cs('header')}>
        <div onClick={goBack}>
          <img src="https://ossprod.jrdaimao.com/file/1721035943933168.svg" alt=""/>
          <img src="https://ossprod.jrdaimao.com/file/1721036074203577.svg" alt=""/>
          <span>返回</span>
        </div>
        <div className={cs('header-title')}>{data.name}</div>
      </div>
      <div className={cs('content-scroll')} id="preview-content-scroll">
        <div className={cs('content')}>
          <div className={cs('content-left')}></div>
          <div className={cs('content-center')}>
            <div className={cs('content-center-title')}>作品信息</div>
            <div className={cs('code-wrap')} style={{ display: 'block' }}>
              <div className={cs('message-item')}>
                <span>作品名称：</span>
                <span>{data.name}</span>
              </div>
              <div className={cs('message-item')}>
                <span>作品类型：</span>
                <span>{data.tag}</span>
              </div>
              <div className={cs('message-item')}>
                <span>作品状态：</span>
                <span>{data.statusTitle}</span>
              </div>
              <div className={cs('message-item')}>
                <span>生效日期：</span>
                <span>{data.startTime}{data.endTime ? ` ~ ${data.endTime}` : ''}</span>
              </div>
            </div>
            <div className={cs('content-center-title')}>在网页中推广</div>
            <div className={cs('code-wrap')}>
              <div className={cs('code-img-wrap')}>
                <QRCode size={120} value={url}/>
                <span>手机扫一扫</span>
              </div>
              <div className={cs('code-wrap-content')}>
                <div className={cs('code-url')}>
                  <span>{url}</span>
                  <span data-clipboard-text={url} id="copy-btn">复制链接</span>
                </div>
              </div>
            </div>
            <div className={cs('content-center-title')}>在微信小程序中推广</div>
            <div className={cs('code-wrap')}>
              <div className={cs('code-img-wrap')}>
                <img className={cs('mini-code-img')} src={miniCodeUrl} alt=""/>
                <span>微信扫一扫</span>
              </div>
              <div className={cs('code-wrap-content')}>
                <div className={cs('code-url')}>
                  <span>{wechatUrl}</span>
                  <span data-clipboard-text={wechatUrl} id="copy-btn">复制链接</span>
                </div>
              </div>
            </div>
            {/*<div className={cs('content-center-title')}>在支付宝小程序中推广</div>*/}
            {/*<div className={cs('empty-wrap')}>*/}
            {/*  <Empty description="敬请期待"/>*/}
            {/*</div>*/}
          </div>
          <div className={cs('content-right')}>
            <div className={cs('phone-wrap')}>
              <div className={cs('left')}>
                <div className={cs('phone')}>
                  <iframe ref={iframe} title="预览" src={url}/>
                </div>
              </div>
              <div className={cs('right')}>
                {
                  finish ? <>
                    <div onClick={prev}>上一页</div>
                    <div onClick={next}>下一页</div>
                  </> : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
