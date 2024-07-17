import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { Radio, Slider, InputNumber, Row, Col } from 'antd'
import { bgColorList, linearBgColorList } from '../config'

const cs = classNames.bind(styles)

const PageAttr = () => {
  const [bgType, setBgType] = useState(0)
  const onBgTypeChange = (e) => {
    setBgType(e.target.value)
  }
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
          {
            bgColorList.map(color => {
              return <div style={{ background: color }} key={color}/>
            })
          }
        </div> : <div className={cs('linear-wrap')}>
          <div className={cs('linear-preview')}>
            <div><span style={{ background: 'rgb(255, 218, 170)' }}></span></div>
            <div><span style={{ background: 'rgb(219, 153, 69)' }}></span></div>
          </div>
          <Row align={'middle'} style={{ marginTop: 15 }}>
            <Col span={4}>
              <span className={cs('page-attr-share-title-text')}>角度</span>
            </Col>
            <Col span={12}>
              <Slider
                min={1}
                max={360}
                // onChange={onChange}
                // value={typeof inputValue === 'number' ? inputValue : 0}
              />
            </Col>
            <Col span={2}>
              <InputNumber
                controls={false}
                min={1}
                max={20}
                style={{ margin: '0 16px', width: '60px' }}
                // value={inputValue}
                // onChange={onChange}
              />
            </Col>
          </Row>
          <div className={cs('color-list')}>
            {
              linearBgColorList.map((item, index) => {
                const background = `linear-gradient(${item.start} 0%, ${item.end} 100%)`
                return <div style={{ background }} key={index}/>
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
          <InputNumber addonAfter="%" style={{ width: '100%' }} controls={false}/>
        </Col>
      </Row>
      <div className={cs('page-attr-share-title')} style={{ margin: '30px 0 20px 0' }}>
        <span className={cs('page-attr-share-title-text')}>页面滤镜</span>
      </div>
    </div>
  )
}

export default PageAttr
