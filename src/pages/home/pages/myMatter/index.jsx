import React, { useEffect, useMemo } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import IScroll from 'iscroll'
import MatterItem from './components/MatterItem'
import useGetCardStyle from '../../../../hooks/useGetCardStyle'
import { navList } from './config'
import { observer } from 'mobx-react-lite'
import { matterStore } from '@/store/home/myMatter'
import { Checkbox, Modal, Popover } from 'antd'
import Upload from './components/Upload'

const cs = classNames.bind(styles)

const MyMatter = () => {
  const { matterList, uploadVisible, activeTypeKey, batchMode, selectIds } = matterStore
  const { getItemStyle } = useGetCardStyle()
  
  const allChecked = useMemo(() => {
    return !!(selectIds.length && selectIds.length === matterList.length)
  }, [selectIds.length, matterList.length])
  
  const batchBtnStyle = useMemo(() => {
    return selectIds.length ? { cursor: 'pointer', color: '#333333' } : { cursor: 'default', color: '#bfbfbf' }
  }, [selectIds.length])
  
  useEffect(() => {
    new IScroll('#my-matter', {
      mouseWheel: true,
      scrollbars: true,
    })
    return () => {
      matterStore.resetStore()
    }
  }, [])
  const onChangeType = (item) => {
    matterStore.setActiveTypeKey(item.value)
  }
  const onChangeCheckAll = () => {
    matterStore.onChangeCheckAll(allChecked)
  }
  const deleteMatter = () => {
    if (selectIds.length === 0) return
    Modal.confirm({
      title: '确定删除该素材吗？',
      cancelText: '取消',
      okText: '确定',
      autoFocusButton: null,
      onOk: () => {
      
      }
    })
  }
  
  return (
    <div className={cs('my-matter')} id="my-matter">
      <div>
        <div style={{ height: 25 }}></div>
        <div className={cs('matter-type-list')}>
          <div className={cs('types')}>
            {
              navList.map(item => {
                return <div
                  className={cs({ active: item.value === activeTypeKey })}
                  key={item.value}
                  onClick={() => onChangeType(item)}
                >
                  {item.title}
                </div>
              })
            }
          </div>
          <div className={cs('buttons')}>
            <Popover open={uploadVisible} title="" content={<Upload/>} placement={'bottomRight'}>
              <div onClick={matterStore.openUpload} className={cs('upload-btn')}>上传素材</div>
            </Popover>
            {
              batchMode ? <div className={cs('batch-Handle')}>
                <Checkbox checked={allChecked} onChange={onChangeCheckAll}>全选</Checkbox>
                <span onClick={deleteMatter} style={batchBtnStyle}>删除</span>
                <span onClick={matterStore.closeBatchMode}>完成</span>
              </div> : <div onClick={matterStore.openBatchMode} className={cs('batch-btn')}>批量管理</div>
            }
          </div>
        </div>
        <div className={cs('matter-list')}>
          {
            matterList.map((item, index) => {
              const styles = getItemStyle(index, 200)
              return <MatterItem
                index={index}
                styles={styles}
                key={index}
              />
            })
          }
        </div>
        <div style={{ height: 25 }}></div>
      </div>
    </div>
  )
}

export default observer(MyMatter)
