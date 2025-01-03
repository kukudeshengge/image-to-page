import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import imageTextStyles from '../ImageText/index.module.less'
import styles from './index.module.less'
import { wordartList } from './config'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../../store/create'
import Image from '../../../../../../components/Image'
import { useQueryResourceList } from '../ImageText/hooks'
import { hideLoading, showLoading } from '../../../../../../utils/msgLoading'

const cs = classNames.bind(styles)

const Wordart = () => {
  const { workspace, leftNavScroll } = createStore
  const { data } = useQueryResourceList({
    type: 'hot-text'
  })
  
  useEffect(() => {
    leftNavScroll.refresh()
  }, [data])
  
  const onClick = (item) => {
    switch (item.type) {
      case 'h1':
        workspace.add.addText({ text: '双击编辑标题', fontWeight: 600, fontSize: 16 })
        break
      case 'h2':
        workspace.add.addText({ text: '双击编辑副标题', fontWeight: 600, fontSize: 14 })
        break
      case 'middleText':
        workspace.add.addText()
        break
      case 'verticalText':
        workspace.add.addVerticalText()
        break
      case 'hollowOutText':
        workspace.add.addText({
          text: '双击编辑文字',
          fontWeight: 400,
          fontSize: 28,
          scaleX: 0.5,
          scaleY: 0.5,
          fill: '',
          stroke: '#000000',
          strokeWidth: 1
        })
        break
      case 'arcText':
        // workspace.add.addArcText()
        break
      default:
        return false
    }
  }
  
  const addHotText = async (item) => {
    showLoading('正在使用文字')
    await workspace.add.jsonGroupToObject(item.data)
    hideLoading()
  }
  
  return (
    <div className={cs('word-dart')}>
      <div className={cs('text-wrap')}>
        <div className={cs('text-title')}>基础</div>
        <div className={cs('text-list')}>
          {
            wordartList.map((item, index) => {
              return <div onClick={() => onClick(item)} key={index}>
                <img src={item.image} alt=""/>
                <img src={item.selectImage} alt=""/>
                <span>{item.title}</span>
              </div>
            })
          }
        </div>
      </div>
      <div className={cs('text-wrap')}>
        <div className={cs('text-title')}>推荐</div>
        <div className={cs('hot-list')}>
          {
            data?.map((item) => {
              return <div onClick={() => addHotText(item)} className={imageTextStyles.shapeItem} key={item._id}>
                <Image src={item.url}/>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default observer(Wordart)
