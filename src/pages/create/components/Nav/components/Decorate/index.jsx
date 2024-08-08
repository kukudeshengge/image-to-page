import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { shapeList } from './config'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../../store/create'

const cs = classNames.bind(styles)

const Decorate = () => {
  const { workspace } = createStore
  const onClick = (type, item) => {
    if (type === 'line') {
      workspace.add.addLine(item)
    } else if (type === 'path') {
      workspace.add.addPath(item)
    }
  }
  return (
    <div className={cs('shape-wrap')}>
      <div className={cs('shape-list')}>
        {
          shapeList.map((pItem, i) => {
            return <div className={cs('shape-item')} key={i}>
              <div className={cs('shape-wrap-title')}>{pItem.title}</div>
              <div className={cs('shape-wrap-list')}>
                {
                  pItem.children.map((item, j) => {
                    const SvgCom = pItem.type === 'line' ? LineSvg : PathSvg
                    return <div onClick={() => onClick(pItem.type, item)} key={j}>
                      <SvgCom item={item}/>
                    </div>
                  })
                }
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
  
  function LineSvg (props) {
    const { item } = props
    return <svg overflow="hidden" width="100%" height="100%">
      <path
        className={cs('line-path')}
        d={item.path}
        stroke="#1261ff"
        fill="none"
        strokeWidth="1"
        strokeDasharray={item.style === 'solid' ? '0, 0' : '4, 1'}
      >
      </path>
    </svg>
  }
  
  function PathSvg (props) {
    const { item } = props
    return <svg overflow="visible" width="40" height="40">
      <g
        transform={`scale(${40 / item.viewBox[0]}, ${40 / item.viewBox[1]}) translate(0,0) matrix(1,0,0,1,0,0)`}
      >
        <path
          className={cs('shape-path"')}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="butt"
          strokeMiterlimit="8"
          fill={item.outlined ? '#1261ff' : 'transparent'}
          stroke={item.outlined ? 'transparent' : '#1261ff'}
          strokeWidth="1"
          d={item.path}
        ></path>
      </g>
    </svg>
  }
}

export default observer(Decorate)
