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
  '#e11919',
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
    start: 'rgb(255, 255, 255)',
    end: 'rgb(218, 218, 218)'
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
