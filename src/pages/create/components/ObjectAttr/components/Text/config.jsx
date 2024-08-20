import styles from './index.module.less'
import classNames from 'classnames/bind'
import { Slider, Tooltip } from 'antd'

const cs = classNames.bind(styles)

export const textFormatList = [
  {
    title: '标题1',
    id: 0,
    style: {
      fontWeight: 700,
      fontSize: 18
    }
  },
  {
    title: '标题2',
    id: 1,
    style: {
      fontWeight: 600,
      fontSize: 16
    }
  },
  {
    title: '标题3',
    id: 2,
    style: {
      fontWeight: 500,
      fontSize: 16
    }
  },
  {
    title: '正文',
    id: 3,
    style: {
      fontWeight: 500,
      fontSize: 14
    }
  }
]

const alignList = [
  {
    title: '左对齐',
    image: 'https://ossprod.jrdaimao.com/file/1722910884719362.svg',
    selectedImage: 'https://ossprod.jrdaimao.com/file/1722930520857452.svg',
    type: 'left',
    leave: 2
  },
  {
    title: '居中对齐',
    image: 'https://ossprod.jrdaimao.com/file/1722930699599354.svg',
    selectedImage: 'https://ossprod.jrdaimao.com/file/1722930536114554.svg',
    type: 'justify-center',
    leave: 2
  },
  {
    title: '右对齐',
    image: 'https://ossprod.jrdaimao.com/file/1722910937194273.svg',
    selectedImage: 'https://ossprod.jrdaimao.com/file/1722930546282604.svg',
    type: 'right',
    leave: 2
  }
]

export const textFastHandleList = [
  {
    title: '加粗',
    type: 'weight',
    image: 'https://ossprod.jrdaimao.com/file/1722853212066674.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1722929490859526.svg'
  },
  {
    title: '斜体',
    type: 'italic',
    image: 'https://ossprod.jrdaimao.com/file/172285322046417.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1722929500239927.svg'
  },
  {
    title: '下划线',
    type: 'underline',
    image: 'https://ossprod.jrdaimao.com/file/1722853227215429.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1722929509703255.svg'
  },
  {
    title: '删除线',
    type: 'linethrough',
    image: 'https://ossprod.jrdaimao.com/file/1722853233547868.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1722929518387331.svg'
  },
  {
    title: '对齐方式',
    type: 'align',
    image: 'https://ossprod.jrdaimao.com/file/1722930699599354.svg',
    renderContent: ({ onChange, getFastHandleActive }) => {
      return <div
        onClick={e => e.stopPropagation()}
        className={cs('align-fix')}
      >
        {
          alignList.map(item => {
            const active = getFastHandleActive(item)
            return <Tooltip
              key={item.type}
              title={item.title}
              placement={'top'}
            >
              <div
                onClick={() => onChange(item.type)}
                key={item.type}
              >
                <img src={active ? item.selectedImage : item.image} alt=""/>
              </div>
            </Tooltip>
          })
        }
      </div>
    }
  },
  {
    title: '行间距',
    type: 'colSpace',
    image: 'https://ossprod.jrdaimao.com/file/1722853254133296.svg',
    renderContent: ({ onChange, getFastHandleActive }) => {
      const value = getFastHandleActive({ type: 'colSpace' })
      const onChangeComplete = (e) => {
        onChange('colSpace', e)
      }
      return <div
        onClick={e => e.stopPropagation()}
        className={cs('space-fix')}
      >
        <span>行间距</span>
        <Slider
          defaultValue={value}
          onChangeComplete={onChangeComplete}
          style={{ width: 100 }}
          min={0}
          step={0.1}
          max={3}
        />
      </div>
    }
  },
  {
    title: '字间距',
    type: 'textSpace',
    image: 'https://ossprod.jrdaimao.com/file/1722853259992800.svg',
    renderContent: ({ onChange, getFastHandleActive }) => {
      const value = getFastHandleActive({ type: 'textSpace' })
      const onChangeComplete = (e) => {
        onChange('textSpace', e * 2)
      }
      return <div
        onClick={e => e.stopPropagation()}
        className={cs('space-fix')}
      >
        <span>字间距</span>
        <Slider
          defaultValue={value}
          onChangeComplete={onChangeComplete}
          style={{ width: 100 }}
          min={0}
          step={1}
          max={100}
        />
      </div>
    }
  },
  {
    title: '清除样式',
    type: 'clear',
    image: 'https://ossprod.jrdaimao.com/file/1722853966926531.svg'
  }
]

export const fontSizeList = Array.from({ length: 20 }).map((item, index) => {
  const value = 10 + index * 2
  return {
    label: `${value}px`,
    value
  }
})
