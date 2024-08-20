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
import { useSetState } from 'ahooks'
import useAttr from '../../../../hooks/useAttr'
import { orderList, alignList } from '../GroupButton/config'
import GroupButton, { CustomCollapse } from '../GroupButton'
import { hideLoading, showLoading } from '../../../../../../utils/msgLoading'
import Outline from '../Outline'
import Shadow from '../Shadow'
import Position from '../Position'

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
    key: 'pos',
    label: '位置和角度',
    children: <Position/>
  }
]

const Text = () => {
  const { selectObjects, comScroll } = createStore
  const [showFixType, setShowFixType] = useState(null)
  const [state, setState] = useSetState({
    fontFamily: undefined,
    fontSize: undefined,
    fill: '',
    opacity: '',
    fontWeight: '',
    fontStyle: '',
    underline: '',
    linethrough: '',
    charSpacing: 0,
    lineHeight: 0,
    openCollapseKeys: ['']
  })
  const { setAttr } = useAttr()
  const { data } = useFontList()
  const { runChange } = useChangeFontFamily()
  
  useEffect(() => {
    if (!selectObjects) return
    const activeObject = selectObjects[0]
    setState({
      fontFamily: activeObject.fontFamily === 'serif' ? undefined : activeObject.fontFamily,
      fontSize: activeObject.fontSize,
      fill: activeObject.fill,
      opacity: 100 - activeObject.opacity * 100,
      fontWeight: activeObject.fontWeight,
      fontStyle: activeObject.fontStyle,
      underline: activeObject.underline,
      linethrough: activeObject.linethrough,
      textAlign: activeObject.textAlign,
      charSpacing: activeObject.charSpacing,
      lineHeight: activeObject.lineHeight,
      openCollapseKeys: activeObject.openCollapseKeys || ['align', 'order']
    })
    setTimeout(() => comScroll?.refresh())
  }, [selectObjects])
  
  const onClick = (e, item) => {
    e.stopPropagation()
    if (item.renderContent) {
      setShowFixType(item.type)
      return
    }
    setShowFixType(null)
    switch (item.type) {
      case 'weight':
        const fontWeight = state.fontWeight === 'bold' || state.fontWeight > 500 ? 'normal' : 'bold'
        asyncEditAttr({ fontWeight })
        break
      case 'italic':
        const fontStyle = state.fontStyle === 'normal' ? 'italic' : 'normal'
        asyncEditAttr({ fontStyle })
        break
      case 'underline':
        asyncEditAttr({ underline: !state.underline })
        break
      case 'linethrough':
        asyncEditAttr({ linethrough: !state.linethrough })
        break
      case 'clear':
        asyncEditAttr({
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
        asyncEditAttr({ textAlign: 'left' })
        break
      case 'justify-center':
        asyncEditAttr({ textAlign: 'justify-center' })
        break
      case 'right':
        asyncEditAttr({ textAlign: 'right' })
        break
      case 'textSpace':
        asyncEditAttr({ charSpacing: value })
        break
      case 'colSpace':
        asyncEditAttr({ lineHeight: value })
        break
      default:
        return false
    }
  }
  
  // 修改属性
  const asyncEditAttr = (value) => {
    setAttr(value)
    setState(value)
    createStore.modifiedCanvas()
  }
  
  // 修改字体样式
  const onStyleChange = async (e, options) => {
    showLoading('正在切换字体')
    setState({ fontFamily: e })
    await runChange(options.otherOptions)
    hideLoading()
  }
  
  // 修改字体size
  const onSizeChange = e => {
    asyncEditAttr({ fontSize: e })
  }
  
  const onSizeClickChange = (type) => {
    let size = selectObjects[0].fontSize
    if (type === 'add') {
      size += 2
    } else {
      size = size - 2 < 10 ? 10 : size - 2
    }
    asyncEditAttr({ fontSize: size })
  }
  
  // 颜色
  const onColorChange = e => {
    const fill = e.hex
    asyncEditAttr({ fill })
  }
  
  // 标题
  const onSetTitleChange = item => {
    asyncEditAttr(item.style)
  }
  
  // 透明度
  const onOpacityChange = e => {
    setAttr({ opacity: 1 - e / 100 })
    setState({ opacity: e })
    createStore.modifiedCanvas()
  }
  
  const onWrapClick = () => {
    setShowFixType(null)
  }
  
  const getFastHandleActive = (item) => {
    switch (item.type) {
      case 'weight':
        return state.fontWeight > 500 || state.fontWeight === 'bold'
      case 'italic':
        return state.fontStyle === 'italic'
      case 'underline':
        return state.underline
      case 'linethrough':
        return state.linethrough
      case 'left':
        return state.textAlign === 'left'
      case 'justify-center':
        return state.textAlign === 'justify-center'
      case 'right':
        return state.textAlign === 'right'
      case 'textSpace':
        return state.charSpacing
      case 'colSpace':
        return state.lineHeight
      default:
        return false
    }
  }
  const onCollapseChange = (e) => {
    asyncEditAttr({ openCollapseKeys: e })
    setTimeout(() => comScroll.refresh(), 300)
  }
  
  if (!state.fontSize) return null
  
  return (
    <div className={cs('text-attr')} onClick={onWrapClick}>
      <div className={cs('item-wrap')}>
        <div className={cs('title')}>字体样式</div>
        <Select
          value={state.fontFamily}
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
            value={state.fontSize}
            onChange={onSizeChange}
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
        <PopoverColor color={state.fill} onChange={onColorChange} placement={'left'}>
          <div className={cs('color-wrap')}>
            <div style={{ background: state.fill }} className={cs('color-view')}/>
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
              onClick={() => onSetTitleChange(item)}
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
          defaultValue={state.opacity}
          onChangeComplete={onOpacityChange}
          min={0}
          max={100}
          style={{ width: 165 }}
        />
      </div>
      <CustomCollapse
        onChange={onCollapseChange}
        activeKey={state.openCollapseKeys}
        items={items}
      />
    </div>
  )
}

export default observer(Text)
