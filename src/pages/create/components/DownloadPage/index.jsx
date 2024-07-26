import React from 'react'
import styles from './index.module.less'
import classNames from 'classnames/bind'
import { Modal, Radio } from 'antd'

const cs = classNames.bind(styles)

const DownloadPage = () => {
  return (
    <Modal width={700} footer={null} open={true} title='下载当前页面'>
      <div className={cs('down-load-page')}>
        <Radio.Group optionType="button">
          <Radio value={0}>导出图片</Radio>
          <Radio value={1}>导出SVG</Radio>
          <Radio value={2}>导出PDF</Radio>
        </Radio.Group>
      </div>
    </Modal>
  )
}

export default DownloadPage
