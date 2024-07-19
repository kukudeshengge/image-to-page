import {
  BarLoader,
  BeatLoader,
  PulseLoader,
  RotateLoader,
  RiseLoader,
  ScaleLoader,
  SyncLoader,
  GridLoader
  
} from 'react-spinners'
import PageAttr from './components/PageAttr'
import CoverageList from './components/CoverageList'
import PageList from './components/PageList'

export const attrTabList = [
  {
    title: '页面设置',
    type: 0
  },
  {
    title: '图层管理',
    type: 1
  },
  {
    title: '页面管理',
    type: 2
  }
]

export const attrTabCom = {
  0: PageAttr,
  1: CoverageList,
  2: PageList
}

export const loadingList = [
  {
    type: 'BarLoader',
    com: BarLoader
  },
  {
    type: 'BeatLoader',
    com: BeatLoader
  },
  {
    type: 'GridLoader',
    com: GridLoader
  },
  {
    type: 'PulseLoader',
    com: PulseLoader
  },
  {
    type: 'RotateLoader',
    com: RotateLoader
  },
  {
    type: 'RiseLoader',
    com: RiseLoader
  },
  {
    type: 'ScaleLoader',
    com: ScaleLoader
  },
  {
    type: 'SyncLoader',
    com: SyncLoader
  }
]

export const bgColorList = [
  '#ffffff',
  '#000000',
  '#9ca0fd',
  '#ae0d87',
  '#2da813',
  '#23284f',
  '#a47a7a',
  '#d9e1d7',
  '#7e0ccc',
  '#dea323',
  '#22d7d7'
]

export const linearBgColorList = [
  {
    start: 'rgb(98, 98, 98)',
    end: 'rgb(0, 0, 0)'
  },
  {
    start: 'rgb(167,168,176)',
    end: 'rgb(110,118,128)'
  },
  {
    start: 'rgb(255, 116, 89)',
    end: 'rgb(159, 20, 0)'
  },
  {
    start: 'rgb(244, 219, 128)',
    end: 'rgb(244, 141, 82)'
  },
  {
    start: 'rgb(194, 246, 255)',
    end: 'rgb(56, 182, 190)'
  },
  {
    start: 'rgb(145, 241, 212)',
    end: 'rgb(16, 130, 153)'
  },
  {
    start: 'rgb(194, 139, 221)',
    end: 'rgb(135, 105, 167)'
  },
  {
    start: 'rgb(136, 81, 129)',
    end: 'rgb(72, 68, 81)'
  },
  {
    start: 'rgb(141, 205, 254)',
    end: 'rgb(47, 128, 237)'
  },
  {
    start: 'rgb(102, 160, 226)',
    end: 'rgb(86, 73, 197)'
  },
  {
    start: 'rgb(255, 227, 192)',
    end: 'rgb(226, 170, 98)'
  },
  {
    start: 'rgb(255, 218, 170)',
    end: 'rgb(219, 153, 69)'
  }
]

export const filterList = [
  {
    title: '原图',
    style: {
      filter: 'none'
    },
    type: 'normal'
  },
  {
    title: '胶片',
    style: {
      filter: 'brightness(112%) contrast(77%) saturate(150%) sepia(18%)'
    },
    type: 'jiaopian'
  },
  {
    title: '蓝调',
    style: {
      filter: 'contrast(75%) saturate(105%) hue-rotate(-35deg) sepia(18%) brightness(105%) grayscale(30%)'
    },
    type: 'landiao'
  },
  {
    title: '日系',
    style: {
      filter: 'contrast(99%) hue-rotate(-33deg) sepia(21%) brightness(91%)'
    },
    type: 'rixi'
  },
  {
    title: '午茶',
    style: {
      filter: 'hue-rotate(-11deg) saturate(226%) brightness(90%) contrast(120%) sepia(60%)'
    },
    type: 'wucha'
  },
  {
    title: '褪色',
    style: {
      filter: 'brightness(115%) contrast(80%) saturate(60%)'
    },
    type: 'tuise'
  },
  {
    title: '校园',
    style: {
      filter: 'brightness(140%) sepia(30%) saturate(85%) contrast(86%) invert(1%)'
    },
    type: 'xiaoyuan'
  },
  {
    title: '盛夏',
    style: {
      filter: 'brightness(108%) sepia(30%) saturate(85%) contrast(86%) invert(1%)'
    },
    type: 'shengxia'
  },
  {
    title: '黑白',
    style: {
      filter: 'brightness(105%) sepia(30%) saturate(185%) contrast(120%) grayscale(100%)'
    },
    type: 'heibai'
  },
  {
    title: '森林',
    style: {
      filter: 'saturate(100%) contrast(59%) brightness(106%) sepia(55%) hue-rotate(46deg)'
    },
    type: 'senlin'
  },
  {
    title: '玫瑰',
    style: {
      filter: 'contrast(67%) brightness(96%) saturate(157%) sepia(53%) hue-rotate(-33deg)'
    },
    type: 'meigui'
  },
  {
    title: '清新',
    style: {
      filter: 'brightness(124%) contrast(104%) saturate(108%)'
    },
    type: 'qingxin'
  },
  {
    title: '鲜明',
    style: {
      filter: 'brightness(120%) contrast(120%) saturate(132%)'
    },
    type: 'xianming'
  },
  {
    title: '鲜暖色',
    style: {
      filter: 'brightness(120%) contrast(120%) saturate(132%) hue-rotate(342deg)'
    },
    type: 'xiannuanse'
  },
  {
    title: '鲜冷色',
    style: {
      filter: 'brightness(120%) contrast(120%) saturate(132%) hue-rotate(-345.6deg)'
    },
    type: 'xianlengse'
  },
  {
    title: '轻胶片',
    style: {
      filter: 'brightness(112%) contrast(104%) saturate(92%) hue-rotate(14.4deg) blur(0.2px)'
    },
    type: 'qingjiaopian'
  },
  {
    title: '珍珠白',
    style: {
      filter: 'brightness(132%) contrast(92%) saturate(92%) hue-rotate(0deg) blur(0.1px)'
    },
    type: 'zhenzhubai'
  },
  {
    title: '强黑白',
    style: {
      filter: 'brightness(112%) contrast(140%) saturate(0%) hue-rotate(0deg) blur(0.1px)'
    },
    type: 'qiangheibai'
  },
  {
    title: '通透',
    style: {
      filter: 'brightness(99%) sepia(40%) grayscale(30%) contrast(120%) saturate(145%)'
    },
    type: 'tongtou'
  },
  {
    title: '暗淡',
    style: {
      filter: 'saturate(160%) brightness(82%) contrast(140%) grayscale(35%)'
    },
    type: 'andan'
  },
  {
    title: '暗红',
    style: {
      filter: 'saturate(163%) brightness(94%) contrast(120%) grayscale(40%)'
    },
    type: 'anhong'
  },
  {
    title: '柔和',
    style: {
      filter: 'saturate(140%) brightness(120%) contrast(120%) grayscale(60%)'
    },
    type: 'rouhe'
  },
  {
    title: '暖色',
    style: {
      filter: 'saturate(106%) brightness(95%) contrast(135%) grayscale(10%)'
    },
    type: 'nuanse'
  },
  {
    title: '哑光',
    style: {
      filter: 'saturate(136%) brightness(100%) contrast(100%) sepia(19%) grayscale(30%)'
    },
    type: 'yaguang'
  },
  {
    title: '富士',
    style: {
      filter: 'saturate(140%) brightness(92%) contrast(140%) grayscale(30%)'
    },
    type: 'fushi'
  },
  {
    title: '佳能',
    style: {
      filter: 'saturate(196%) brightness(97%) contrast(121%) grayscale(47%)'
    },
    type: 'jianeng'
  },
  {
    title: '工业',
    style: {
      filter: 'saturate(130%) brightness(93%) contrast(121%) sepia(40%) grayscale(30%)'
    },
    type: 'gongye'
  },
]
