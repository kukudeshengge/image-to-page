import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import classNames from 'classnames/bind'
import { Button, Checkbox, InputNumber, message, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../../store/create'
import { createAnimate, list } from './config'
import IScroll from 'iscroll'

const cs = classNames.bind(styles)

const Animation = () => {
  const { selectObjects, workspace } = createStore
  const [animationList, setAnimationList] = useState([])
  const [showSelect, setShowSelect] = useState(false)
  const animateing = useRef(false)
  const cacheEditId = useRef(null)
  const animationScroll = useRef(null)
  
  useEffect(() => {
    const el = document.querySelector('#object-attr-scroll')
    const wrap = document.querySelector('#animation-wrap')
    wrap.style.height = `${el.clientHeight}px`
    animationScroll.current = new IScroll('#animation-list-wrap', {
      mouseWheel: true,
      scrollbars: true,
      preventDefault: false
    })
    let scroll = new IScroll('#animation-select-list-wrap', {
      mouseWheel: true,
      scrollbars: true,
      preventDefault: false
    })
    // return () => {
    //   animationScroll.current.destroy()
    //   scroll.destroy()
    //   scroll = null
    // }
  }, [])
  
  useEffect(() => {
    animateing.current = false
    const activeObject = selectObjects[0]
    if (!activeObject) return
    setAnimationList(activeObject.animateList || [])
    setTimeout(() => animationScroll.current?.refresh())
  }, [selectObjects])
  
  const onChange = (key, value, id) => {
    setAnimationList(prevState => {
      const item = prevState.find(item => item.id === id)
      if (!item) return prevState
      item[key] = value
      return [...prevState]
    })
    createStore.modifiedCanvas()
  }
  
  const previewAnimation = item => {
    if (animateing.current) return
    animateing.current = true
    workspace.animation.carryAnimations(undefined, item, () => {
      animateing.current = false
    })
  }
  
  const asyncAnimateList = (list) => {
    const activeObject = selectObjects[0]
    activeObject.animateList = list
    setAnimationList(list)
    createStore.modifiedCanvas()
  }
  
  const deleteAnimate = (item) => {
    const newList = animationList.filter(v => v.id !== item.id)
    asyncAnimateList(newList)
    setTimeout(() => animationScroll.current.refresh())
  }
  
  // 新增或选择动画
  const selectAnimate = (item) => {
    if (cacheEditId.current) {
      const index = animationList.findIndex(v => v.id === cacheEditId.current)
      if (index > -1) {
        const newList = [...animationList]
        newList[index] = createAnimate(item.key)
        asyncAnimateList(newList)
      }
    } else {
      const newList = [...animationList, createAnimate(item.key)]
      asyncAnimateList(newList)
      setTimeout(() => animationScroll.current.refresh())
    }
    cacheEditId.current = null
    setShowSelect(false)
  }
  const back = () => {
    cacheEditId.current = null
    setShowSelect(false)
  }
  const addAnimate = () => {
    if (animationList.length >= 5) {
      return message.warning('每个组件最多添加5个动画')
    }
    setShowSelect(true)
  }
  
  const contentStyle = { transform: `translateX(${showSelect ? '-50%' : 0})` }
  return <div className={cs('animation-wrap')} id="animation-wrap">
    <div className={cs('animation-content')} style={contentStyle}>
      <div className={cs('animation')}>
        <div className={cs('add-buttons')}>
          <Button onClick={addAnimate} type="primary">添加动画</Button>
          <Button onClick={() => previewAnimation()}>预览动画</Button>
        </div>
        <div id="animation-list-wrap" className={cs('animation-list-wrap')}>
          <div className={cs('animation-list')}>
            {animationList.map((item, index) => {
              return <div key={item.id} className={cs('animation-item')}>
                <div className={cs('animation-item-title')}>
                  <div>
                    <span>动画{index + 1}</span>
                    <span onClick={() => {
                      cacheEditId.current = item.id
                      setShowSelect(true)
                    }
                    }>
                    <i>{item.name}</i>
                      <img src="https://ossprod.jrdaimao.com/file/1722415726616437.svg" alt=""/>
                      <img src="https://ossprod.jrdaimao.com/file/172241573319047.svg" alt=""/>
                  </span>
                  </div>
                  <div>
                    <Tooltip title="预览" placement="top">
                    <span onClick={() => previewAnimation(item)}>
                      <img src="https://ossprod.jrdaimao.com/file/1722416383496609.svg" alt=""/>
                      <img src="https://ossprod.jrdaimao.com/file/1722416372157351.svg" alt=""/>
                    </span>
                    </Tooltip>
                    <Tooltip title="删除" placement="top">
                    <span onClick={() => deleteAnimate(item)}>
                      <img src="https://ossprod.jrdaimao.com/file/1722416589947825.svg" alt=""/>
                      <img src="https://ossprod.jrdaimao.com/file/1722416599451846.svg" alt=""/>
                    </span>
                    </Tooltip>
                  </div>
                </div>
                <div className={styles.inputItem}>
                  <div>
                    <span>时间</span>
                    <InputNumber
                      max={10}
                      value={item.time}
                      onChange={(e) => onChange('time', e, item.id)}
                      addonAfter="秒"
                      controls={false}
                    />
                  </div>
                  <div>
                    <span>延迟</span>
                    <InputNumber
                      max={10}
                      value={item.delay}
                      onChange={(e) => onChange('delay', e, item.id)}
                      addonAfter="秒"
                      controls={false}
                    />
                  </div>
                </div>
                <div className={styles.inputItem}>
                  <div>
                    <span>次数</span>
                    <InputNumber
                      max={10}
                      value={item.count}
                      onChange={(e) => onChange('count', e, item.id)}
                      addonAfter="次"
                      controls={false}
                    />
                  </div>
                  <div
                    className={cs('loop-button')}
                    onClick={() => onChange('loop', !item.loop, item.id)}
                  >
                    <Checkbox checked={item.loop}>循环播放</Checkbox>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
      <div className={cs('animation-select')}>
        <div className={cs('animation-select-back')}>
          <span onClick={back}>
            <img src="https://ossprod.jrdaimao.com/file/1721035943933168.svg" alt=""/>
            <img src="https://ossprod.jrdaimao.com/file/1721036074203577.svg" alt=""/>
            <span>返回</span>
          </span>
        </div>
        <div id="animation-select-list-wrap" className={cs('animation-select-list-wrap')}>
          <div className={cs('animation-select-list')}>
            {list.map((item, index) => {
              return <div onClick={() => selectAnimate(item)} key={index}>
                <img src={item.image} alt=""/>
                <img src={item.selectImage} alt=""/>
                <span>{item.name}</span>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default observer(Animation)
