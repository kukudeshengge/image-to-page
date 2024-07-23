import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { Empty } from 'antd'

const cs = classNames.bind(styles)

const CoverageList = () => {
  const list = [1, 2, 3, 4]
  return (
    <div className={cs('coverage-list')}>
      {
        list.length === 0 ? <div style={{ marginTop: 100 }}>
          <Empty description="空空如也~"/>
        </div> : null
      }
      {
        list.map((item, index) => {
          return <div key={index} className={cs({ 'coverage-list-item': true, active: index === 2 })}>
            <span>图片{index + 1}</span>
            <span>
              <i>
                <img src="https://ossprod.jrdaimao.com/file/1690945206225980.svg" alt=""/>
                <img src="https://ossprod.jrdaimao.com/file/1690437893570728.svg" alt=""/>
              </i>
              <i>
                <img src="https://ossprod.jrdaimao.com/file/1690944574168632.svg" alt=""/>
                <img src="https://ossprod.jrdaimao.com/file/1690437902259961.svg" alt=""/>
              </i>
            </span>
          </div>
        })
      }
    </div>
  )
}

export default CoverageList
