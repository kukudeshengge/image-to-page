import ImageText from './components/ImageText'
import OnePage from './components/OnePage'
import Decorate from './components/Decorate'
import Wordart from './components/Wordart'

export const navList = [
  {
    title: '图文',
    type: 'image-text',
    icon: 'https://ossprod.jrdaimao.com/file/1721117850167489.svg',
    activeIcon: 'https://ossprod.jrdaimao.com/file/1721117996286371.svg'
  },
  {
    title: '单页',
    type: 'one-page',
    icon: 'https://ossprod.jrdaimao.com/file/1721118245611780.svg',
    activeIcon: 'https://ossprod.jrdaimao.com/file/1721118251795786.svg'
  },
  {
    title: '装饰',
    type: 'decorate',
    icon: 'https://ossprod.jrdaimao.com/file/1721118336393419.svg',
    activeIcon: 'https://ossprod.jrdaimao.com/file/1721118345581820.svg'
  },
  {
    title: '艺术字',
    type: 'wordart',
    icon: 'https://ossprod.jrdaimao.com/file/172111987923170.svg',
    activeIcon: 'https://ossprod.jrdaimao.com/file/1721119887666196.svg'
  }
]

export const ComEnum = {
  'image-text': ImageText,
  'one-page': OnePage,
  'decorate': Decorate,
  'wordart': Wordart
}

export const filterList = [
  {
    title: '推荐',
    value: 0
  },
  {
    title: '收藏',
    value: 1
  }
]
