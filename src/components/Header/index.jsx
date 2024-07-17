import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { Avatar, Dropdown } from 'antd'

const cs = classNames.bind(styles)

const Header = () => {
  const nav = useNavigate()
 
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          退出登录
        </a>
      )
    }
  ]
  return (
    <div className={cs('header')}>
      {/*logo*/}
      <a className={cs('logo')} href='/myProduct'><h1>搭建H5页面</h1></a>
      <div className={cs('header-right')}>
        <div className={cs('avatar')}>
          <Dropdown
            menu={{ items }}
            placement="bottom"
          >
            <div className={cs('user-info')}>
              <Avatar
                src="https://img2.baidu.com/it/u=2427333929,299356392&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"
                shape="square"
                size={40}
              />
              <span>纪永升</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Header
