import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import Preview from '../Preview'
import { useQueryResourceList } from '../ImageText/hooks'
import Image from '../../../../../../components/Image'
import { Modal } from 'antd'
import { createStore } from '../../../../../../store/create'
import { observer } from 'mobx-react-lite'

const cs = classNames.bind(styles)

const OnePage = () => {
  const { workspace } = createStore
  const { data, isLoading } = useQueryResourceList({
    type: 'one-page'
  })
  // use template
  const onClick = (item) => {
    Modal.confirm({
      title: '确定使用该模板吗？',
      content: '使用模板会替换当前页面的数据',
      onOk: () => {
        createStore.echoTemplate(item.data)
        // workspace.loadFromJSON({
        //   filterStyle: 'none',
        //   canvasData: item.data
        // })
      }
    })
  }
  
  if (isLoading) return null
  
  return (<div className={cs('one-page')}>
    {data.map((item) => {
      return <Preview item={item} key={item._id}>
        <div onClick={() => onClick(item)}>
          <Image src={item.url}/>
        </div>
      </Preview>
    })}
  </div>)
}

export default observer(OnePage)
