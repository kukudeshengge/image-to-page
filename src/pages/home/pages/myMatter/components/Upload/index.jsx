import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { Button, Upload } from 'antd'
import { observer } from 'mobx-react-lite'
import { matterStore } from '../../../../../../store/home/myMatter'
import { navUploadList } from '../../config'

const cs = classNames.bind(styles)

const UploadCom = () => {
  
  return (
    <div className={cs('upload')}>
      <div className={cs('upload-title')}>
        <span>上传素材</span>
        <img onClick={matterStore.closeUpload} src="https://ossprod.jrdaimao.com/file/1721030483235220.svg" alt=""/>
      </div>
      <div className={cs('upload-content')}>
        {
          navUploadList.map(item => {
            return <div>
              <img className={cs('type-logo')} src={item.icon} alt=""/>
              <div className={cs('upload-desc')}>
                <div>{item.title}</div>
                <p>{item.desc}</p>
                <Upload>
                  <Button
                    icon={<img width={16} height={16} src="https://ossprod.jrdaimao.com/file/1721031293149355.svg" alt=""/>}
                    type="primary">
                    选择文件
                  </Button>
                </Upload>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default observer(UploadCom)
