import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import classNames from 'classnames/bind'
import { Select, Slider, Tooltip } from 'antd'
import PopoverColor from '../../../Attr/components/PopoverColor'
import { fontSizeList, textFastHandleList, textFormatList } from './config'
import { useFontList } from './fetch'
import useChangeFontFamily from '../../../../hooks/useChangeFontFamily'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../../store/create'
import { orderList, alignList } from '../GroupButton/config'
import GroupButton, { CustomCollapse } from '../GroupButton'
import { hideLoading, showLoading } from '../../../../../../utils/msgLoading'
import Outline from '../Outline'
import Shadow from '../Shadow'
import Position from '../Position'
import BgColor from '../BgColor'

const { Option } = Select
const cs = classNames.bind(styles)

const items = [
  {
    key: 'align',
    label: '对齐方式',
    children: <GroupButton list={alignList}/>
  },
  {
    key: 'order',
    label: '层级',
    children: <GroupButton list={orderList}/>
  },
  {
    key: 'outLine',
    label: '描边',
    children: <Outline/>
  },
  {
    key: 'shadow',
    label: '阴影',
    children: <Shadow/>
  },
  {
    key: 'bgColor',
    label: '背景颜色',
    children: <BgColor/>
  },
  {
    key: 'pos',
    label: '位置和角度',
    children: <Position/>
  }
]

const Text = () => {
  const { selectObjects, comScroll, getCurrentObjectAttr, objectAttrChange } = createStore
  const {
    fontFamily,
    fontSize,
    fill,
    fontWeight,
    fontStyle,
    underline,
    linethrough,
    charSpacing,
    lineHeight,
    textAlign,
    opacity,
    openCollapseKeys
  } = getCurrentObjectAttr(['fontFamily', 'fontSize', 'fill', 'fontWeight',
    'fontStyle', 'underline', 'linethrough', 'charSpacing', 'lineHeight', 'textAlign',
    'opacity', 'openCollapseKeys'])
  const [showFixType, setShowFixType] = useState(null)
  const { data } = useFontList()
  const { runChange } = useChangeFontFamily()
  
  useEffect(() => {
    setTimeout(() => comScroll?.refresh(), 300)
  }, [selectObjects])
  
  const onClick = (e, item) => {
    e.stopPropagation()
    if (item.renderContent) {
      return setShowFixType(item.type)
    }
    setShowFixType(null)
    switch (item.type) {
      case 'weight':
        const weight = fontWeight === 'bold' || fontWeight > 500 ? 'normal' : 'bold'
        objectAttrChange({ fontWeight: weight })
        break
      case 'italic':
        const style = fontStyle === 'normal' ? 'italic' : 'normal'
        objectAttrChange({ fontStyle: style })
        break
      case 'underline':
        const newUnderline = !underline
        objectAttrChange({ underline: newUnderline })
        break
      case 'linethrough':
        const newLineThrough = !linethrough
        objectAttrChange({ linethrough: newLineThrough })
        break
      case 'clear':
        objectAttrChange({
          fontWeight: 'normal',
          fontStyle: 'normal',
          underline: false,
          linethrough: false,
          textAlign: 'left',
          charSpacing: 0,
          lineHeight: 1.2
        })
        break
      default:
        return false
    }
  }
  
  const onSecondClick = (type, value) => {
    switch (type) {
      case 'left':
        return objectAttrChange({ textAlign: 'left' })
      case 'justify-center':
        return objectAttrChange({ textAlign: 'justify-center' })
      case 'right':
        return objectAttrChange({ textAlign: 'right' })
      case 'textSpace':
        return objectAttrChange({ charSpacing: value })
      case 'colSpace':
        return objectAttrChange({ lineHeight: value })
      default:
        return false
    }
  }
  
  // 修改字体样式
  const onStyleChange = async (e, options) => {
    showLoading('正在切换字体')
    await runChange(options.otherOptions)
    hideLoading()
  }
  
  const onSizeClickChange = (type) => {
    let size = fontSize
    if (type === 'add') {
      size += 2
    } else {
      size = size - 2 < 10 ? 10 : size - 2
    }
    objectAttrChange({ fontSize: size })
  }
  
  const onWrapClick = () => {
    setShowFixType(null)
  }
  
  const getFastHandleActive = (item) => {
    switch (item.type) {
      case 'weight':
        return fontWeight > 500 || fontWeight === 'bold'
      case 'italic':
        return fontStyle === 'italic'
      case 'underline':
        return underline
      case 'linethrough':
        return linethrough
      case 'left':
        return textAlign === 'left'
      case 'justify-center':
        return textAlign === 'justify-center'
      case 'right':
        return textAlign === 'right'
      case 'textSpace':
        return charSpacing
      case 'colSpace':
        return lineHeight
      default:
        return false
    }
  }
  
  return (
    <div className={cs('text-attr')} onClick={onWrapClick}>
      <div className={cs('item-wrap')}>
        <div className={cs('title')}>字体样式</div>
        <Select
          value={fontFamily === 'serif' ? undefined : fontFamily}
          onChange={onStyleChange}
          className={cs('select-style')}
          placeholder="请选择"
        >
          {
            data.map(item => {
              return <Option key={item.key} otherOptions={item} value={item.key}>
                <span>{item.fontlibName}</span>
              </Option>
            })
          }
        </Select>
      </div>
      <div className={cs('item-wrap')}>
        <div className={cs('title')}>字号</div>
        <div className={cs('size')}>
          <Select
            value={fontSize}
            onChange={(e) => objectAttrChange({ fontSize: e })}
            className={cs('select-size')}
            placeholder={'请选择'}
            options={fontSizeList}
          />
          <span
            onClick={() => onSizeClickChange('add')}
            className={cs('add-size-btn')}
          >
            <img src="https://ossprod.jrdaimao.com/file/1722846354324978.svg" alt=""/>
          </span>
          <span
            onClick={() => onSizeClickChange('minus')}
          >
            <img src="https://ossprod.jrdaimao.com/file/1722846367110765.svg" alt=""/>
          </span>
        </div>
      </div>
      <div className={cs('item-wrap')}>
        <div className={cs('title')}>文字颜色</div>
        <PopoverColor
          color={fill}
          onChange={(e) => objectAttrChange({ fill: e.hex })}
          placement={'left'}
        >
          <div className={cs('color-wrap')}>
            <div style={{ background: fill }} className={cs('color-view')}/>
            <div className={cs('color-icon')}>
              <img src="https://ossprod.jrdaimao.com/file/1722847203274287.svg" alt=""/>
            </div>
          </div>
        </PopoverColor>
      </div>
      <div className={cs('item-wrap', 'text-format-wrap')}>
        {
          textFormatList.map(item => {
            return <span
              onClick={() => objectAttrChange(item.style)}
              style={item.style}
              key={item.id}
            >
              {item.title}
            </span>
          })
        }
      </div>
      <div className={cs('item-wrap', 'fast-handle-wrap')}>
        {
          textFastHandleList.map(item => {
            const active = getFastHandleActive(item)
            return <div
              onClick={(e) => onClick(e, item)}
              key={item.type}
              className={cs('fast-handle-item')}
            >
              <Tooltip title={item.title} placement={'top'}>
                <img src={active && item.selectImage ? item.selectImage : item.image} alt=""/>
              </Tooltip>
              {
                item.renderContent && showFixType === item.type ?
                  <div className={cs('fast-handle-item-wrap')}>
                    {item.renderContent({ onChange: onSecondClick, getFastHandleActive })}
                  </div> : null
              }
            </div>
          })
        }
      </div>
      <div className={cs('item-wrap')}>
        <div className={cs('title')}>透明度</div>
        <Slider
          value={100 - opacity * 100}
          onChange={(e) => objectAttrChange({ opacity: 1 - e / 100 })}
          min={0}
          max={100}
          style={{ width: 165 }}
        />
      </div>
      <CustomCollapse
        onChange={(e) => objectAttrChange({ openCollapseKeys: e })}
        activeKey={openCollapseKeys || ['align', 'order']}
        items={items}
      />
    </div>
  )
}

export default observer(Text)
