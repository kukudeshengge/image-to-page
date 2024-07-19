import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { Radio, Slider, InputNumber, Row, Col, Button, Popover } from 'antd'
import { bgColorList, filterList, linearBgColorList } from '../config'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../store/create'
import { SketchPicker } from 'react-color'
import PopoverColor from './PopoverColor'

const cs = classNames.bind(styles)

const LinearPreview = observer((props) => {
  const { setLinearColor } = props
  const { rectColor } = createStore
  const getBorder = (value) => {
    return value ? 'solid 1px #ccc' : 'none'
  }
  const onChange = (key, e) => {
    const value = {
      start: rectColor.start || '#ffffff',
      end: rectColor.end || '#ffffff',
      [key]: e.hex
    }
    setLinearColor(value)
  }
  const border = getBorder(rectColor.type !== 'bg-linear')
  
  return <div
    className={cs('linear-preview')}
    style={{
      background: `linear-gradient(90deg, ${rectColor.start}, ${rectColor.end} 100%)`,
      border
    }}
  >
    <div style={{ border }}>
      <PopoverColor color={rectColor.start} onChange={(e) => onChange('start', e)}>
        <span style={{ background: rectColor.start }}></span>
      </PopoverColor>
    </div>
    <div style={{ border }}>
      <PopoverColor color={rectColor.end} onChange={(e) => onChange('end', e)}>
        <span style={{ background: rectColor.end }}></span>
      </PopoverColor>
    </div>
  </div>
})

const PageAttr = (props) => {
  const { attrScroll } = props
  const { workspace, pageAngle, rectColor, filterKey, showAllFilter } = createStore
  const disabledAngle = rectColor.type !== 'bg-linear'
  const [bgType, setBgType] = useState(0)
  const onBgTypeChange = (e) => {
    setBgType(e.target.value)
  }
  // 设置背景色
  const setNormalColor = (color) => {
    color = typeof color === 'string' ? color : color.hex
    createStore.rectColor = { type: 'bg', color }
    workspace.setRectAttr('fill', color).renderAll()
  }
  // 设置渐变背景色
  const setLinearColor = (item) => {
    createStore.pageAngle = 0
    createStore.rectColor = {
      type: 'bg-linear',
      start: item.start,
      end: item.end
    }
    workspace.setRectLinearColor({
      startColor: item.start,
      endColor: item.end,
      angle: 0
    })
  }
  // 设置透明度
  const onOpacityChange = (e) => {
    e = 1 - (e ? e / 100 : 0)
    workspace.setRectAttr('opacity', e).renderAll()
  }
  // 设置渐变角度
  const onAngleChange = (e) => {
    if (rectColor.type !== 'bg-linear') return
    createStore.pageAngle = e
    workspace.setRectLinearColor({
      startColor: rectColor.start,
      endColor: rectColor.end,
      angle: e
    })
  }
  // 修改滤镜
  const onFilterChange = (item) => {
    createStore.filterKey = item.type
    workspace.setRectFilter(item)
  }
  const onChangeShowAllFilter = () => {
    createStore.showAllFilter = !showAllFilter
    setTimeout(() => {
      attrScroll.refresh()
    })
  }
  const renderFilterList = showAllFilter ? filterList : filterList.slice(0, 6)
  
  return (
    <div className={cs('page-attr')}>
      <div className={cs('page-attr-share-title')}>
        <span className={cs('page-attr-share-title-text')}>背景颜色</span>
        <Radio.Group value={bgType} onChange={onBgTypeChange} optionType="button">
          <Radio value={0}>纯色</Radio>
          <Radio value={1}>渐变</Radio>
        </Radio.Group>
      </div>
      {
        bgType === 0 ? <div className={cs('color-list')}>
          <PopoverColor color={rectColor.color} onChange={setNormalColor}>
            <div>
              <img src="https://ossprod.jrdaimao.com/file/1721287073865238.svg" alt=""/>
            </div>
          </PopoverColor>
          {
            bgColorList.map(color => {
              const border = color.includes('fff') ? '1px solid rgb(216, 216, 216)' : 'none'
              return <div onClick={() => setNormalColor(color)} style={{ background: color, border }} key={color}/>
            })
          }
        </div> : <div className={cs('linear-wrap')}>
          <LinearPreview setLinearColor={setLinearColor}/>
          <Row align={'middle'} style={{ marginTop: 15 }}>
            <Col span={4}>
              <span className={cs('page-attr-share-title-text')}>角度</span>
            </Col>
            <Col span={12}>
              <Slider
                disabled={disabledAngle}
                tooltip={{ formatter: null }}
                min={0}
                max={360}
                onChange={onAngleChange}
                value={pageAngle || 0}
              />
            </Col>
            <Col span={2}>
              <InputNumber
                disabled={disabledAngle}
                controls={false}
                min={0}
                max={360}
                style={{ margin: '0 16px', width: '60px' }}
                value={pageAngle}
                onChange={onAngleChange}
              />
            </Col>
          </Row>
          <div className={cs('color-list')}>
            {
              linearBgColorList.map((item, index) => {
                const background = `linear-gradient(${item.start} 0%, ${item.end} 100%)`
                return <div onClick={() => setLinearColor(item)} style={{ background, border: 'none' }} key={index}/>
              })
            }
          </div>
        </div>
      }
      <Row align={'middle'} style={{ margin: '30px 0 20px 0' }}>
        <Col span={6}>
          <span className={cs('page-attr-share-title-text')}>透明度</span>
        </Col>
        <Col span={18}>
          <InputNumber
            defaultValue={0}
            onChange={onOpacityChange}
            min={0}
            max={100}
            addonAfter="%"
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
      <div className={cs('page-attr-share-title')} style={{ margin: '30px 0 20px 0' }}>
        <span className={cs('page-attr-share-title-text')}>页面滤镜</span>
      </div>
      <div className={cs('filter-list')}>
        {
          renderFilterList.map((item) => {
            return <div
              onClick={() => onFilterChange(item)}
              key={item.type}
              className={cs({ active: item.type === filterKey })}
            >
              <img draggable={false} style={item.style || {}} src="https://s.isdpp.com/images/F8JjW0fRl2VkdEHK" alt=""/>
              <span>{item.title}</span>
            </div>
          })
        }
      </div>
      <div className={cs('filter-list-more')} onClick={onChangeShowAllFilter}>
        <span>{showAllFilter ? '收起' : '展开'}</span>
        <img style={{ transform: `rotate(${showAllFilter ? 180 : 0}deg)` }}
             src="https://ossprod.jrdaimao.com/file/1721295810530478.svg" alt=""/>
      </div>
      <div className={cs('page-attr-share-title')} style={{ margin: '30px 0 20px 0' }}>
        <span className={cs('page-attr-share-title-text')}>页面音乐</span>
      </div>
      <div className={cs('audio-wrap')}>
        <Button
          icon={<img src="https://ossprod.jrdaimao.com/file/1721187497059765.svg" alt=""/>}
        >
          添加页面音乐
        </Button>
      </div>
    </div>
  )
}

export default observer(PageAttr)
