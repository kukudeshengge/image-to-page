import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'

const cs = classNames.bind(styles)

const CoverageList = () => {
  const list = new Array(20).fill({})
  return (
    <div className={cs('coverage-list')}>
      {
        list.map((item, index) => {
          return <div className={cs({ 'coverage-list-item': true, active: index === 2 })}>
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
