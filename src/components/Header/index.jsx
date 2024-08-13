import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { Avatar, Dropdown } from 'antd'
import useGetUserInfo from './hooks'

const cs = classNames.bind(styles)

const Header = () => {
  const { data } = useGetUserInfo()
  const items = [
    {
      key: '1',
      label: (
        <a target="_self" rel="noopener noreferrer" href="/login">
          退出登录
        </a>
      )
    }
  ]
  return (
    <div className={cs('header')}>
      {/*logo*/}
      <a className={cs('logo')} href="/"><h1>搭建H5页面</h1></a>
      <div className={cs('header-right')}>
        {
          data ? <div className={cs('avatar')}>
            <Dropdown
              menu={{ items }}
              placement="bottom"
            >
              <div className={cs('user-info')}>
                <Avatar
                  src={data.avatar}
                  shape="square"
                  size={40}
                />
                <span>{data.name}</span>
              </div>
            </Dropdown>
          </div> : null
        }
      </div>
    </div>
  )
}

export default Header
