import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import ReactECharts from 'echarts-for-react'
import IScroll from 'iscroll'
import { useNavigate } from 'react-router-dom'
import { navFilterTagList } from './config'
import { Button, DatePicker } from 'antd'

const cs = classNames.bind(styles)

const DataView = () => {
  const nav = useNavigate()
  const [activeValue, setActiveValue] = useState('1')
  useEffect(() => {
    new IScroll('#data-view-content-scroll', {
      mouseWheel: true,
      scrollbars: true,
      click: true,
      preventDefault: false
    })
  }, [])
  const goBack = () => {
    nav(-1)
  }
  const changeActiveKey = (item) => {
    setActiveValue(item.value)
  }
  const option = {
    title: {
      text: '趋势图'
    },
    tooltip: {},
    legend: {
      data: ['销量', 'PV', 'UV']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
      },
      {
        name: 'PV',
        type: 'line',
        data: [1, 20, 22, 18, 36, 20]
      },
      {
        name: 'UV',
        type: 'line',
        data: [2, 10, 33, 43, 20, 90]
      }
    ]
  }
  return (
    <div className={cs('data-view')}>
      <div className={cs('header')}>
        <div onClick={goBack}>
          <img src="https://ossprod.jrdaimao.com/file/1721035943933168.svg" alt=""/>
          <img src="https://ossprod.jrdaimao.com/file/1721036074203577.svg" alt=""/>
          <span>返回</span>
        </div>
        <div className={cs('header-title')}>没法看翁麻烦额我发么我发空位</div>
      </div>
      <div className={cs('content')}>
        <div className={cs('filter-nav')}>
          <div className={cs('filter-nav-tag')}>
            {
              navFilterTagList.map(item => {
                return <span
                  onClick={() => changeActiveKey(item)}
                  className={cs({ active: activeValue === item.value })}
                  key={item.value}
                >
                  {item.title}
                </span>
              })
            }
          </div>
          <div>
            <DatePicker.RangePicker placeholder="请选择"/>
            <Button type="primary">查询</Button>
          </div>
        </div>
        <div className={cs('content-scroll')} id="data-view-content-scroll">
          <div>
            <div style={{ height: 25 }}></div>
            <div className={cs('card-wrap')}>
              <div>
                <div className={cs('card-item-title')}>
                  <span>新增浏览数(PV)</span>
                  <span>0</span>
                </div>
                <div className={cs('card-item-sum')}>总浏览数：0</div>
              </div>
              <div>
                <div className={cs('card-item-title')}>
                  <span>新增浏览数(PV)</span>
                  <span>0</span>
                </div>
                <div className={cs('card-item-sum')}>总浏览数：0</div>
              </div>
              <div>
                <div className={cs('card-item-title')}>
                  <span>新增浏览数(PV)</span>
                  <span>0</span>
                </div>
                <div className={cs('card-item-sum')}>总浏览数：0</div>
              </div>
            </div>
            <div className={cs('canvas-wrap')}>
              <ReactECharts
                option={option}
                style={{ height: 500 }}
              />
            </div>
            <div style={{ height: 25 }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataView
