import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { Collapse, Tooltip } from 'antd'
import { createStore } from '../../../../../../store/create'
import { observer } from 'mobx-react-lite'

const cs = classNames.bind(styles)

export const getFn = (str, workspace) => {
  let func = null
  str.split('.').forEach(key => {
    func = func ? func[key] : workspace[key]
  })
  return func
}

const GroupButton = (props) => {
  const {list} = props
  const { workspace } = createStore
  const onClick = (item) => {
    const func = getFn(item.fn, workspace)
    func && func()
  }
  return (
    <div className={cs('group-button')}>
      {
        list.map((item, index) => {
          return <Tooltip title={item.title} key={index}>
            <div onClick={() => onClick(item)} className={cs('item')}>
              <img src={item.image} alt=""/>
            </div>
          </Tooltip>
        })
      }
    </div>
  )
}

export const CustomCollapse = (props) => {
  return <Collapse {...props} className={cs('custom-collapse')} />
}

export default observer(GroupButton)
