import { v4 as uuid } from 'uuid'

const DefaultValue = {
  time: 1,
  delay: 0,
  count: 1,
  loop: false
}

export const animateType = {
  fadeIn: {
    name: '淡入',
    animateName: 'fadeIn',
    easing: 'easeInQuad',
    image: 'https://ossprod.jrdaimao.com/file/1723013159219136.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723012794337348.svg'
  },
  leftToRight: {
    name: '向右移入',
    animateName: 'leftToRight',
    easing: 'easeOutQuad',
    image: 'https://ossprod.jrdaimao.com/file/1723013249717692.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/17230128203441.svg'
  },
  rightToLeft: {
    name: '向左移入',
    animateName: 'rightToLeft',
    easing: 'easeOutQuad',
    image: 'https://ossprod.jrdaimao.com/file/1723013394770325.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723013368851234.svg'
  },
  topToBottom: {
    name: '向下移入',
    animateName: 'topToBottom',
    easing: 'easeOutQuad',
    image: 'https://ossprod.jrdaimao.com/file/1723013447843661.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723013466318949.svg'
  },
  bottomToTop: {
    name: '向上移入',
    animateName: 'bottomToTop',
    easing: 'easeOutQuad',
    image: 'https://ossprod.jrdaimao.com/file/1723013478194636.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723013487291916.svg'
  },
  leftToRightBounce: {
    name: '向右弹入',
    animateName: 'leftToRight',
    easing: 'easeOutBounce',
    image: 'https://ossprod.jrdaimao.com/file/1723013865966292.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723013874065849.svg'
  },
  rightToLeftBounce: {
    name: '向左弹入',
    animateName: 'rightToLeft',
    easing: 'easeOutBounce',
    image: 'https://ossprod.jrdaimao.com/file/1723013881786236.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723013889666374.svg'
  },
  topToBottomBounce: {
    name: '向下弹入',
    animateName: 'topToBottom',
    easing: 'easeOutBounce',
    image: 'https://ossprod.jrdaimao.com/file/1723013909133522.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723013914790328.svg'
  },
  bottomToTopBounce: {
    name: '向上弹入',
    animateName: 'bottomToTop',
    easing: 'easeOutBounce',
    image: 'https://ossprod.jrdaimao.com/file/1723013922113155.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723013930017536.svg'
  },
  openToIn: {
    name: '翻开进入',
    animateName: 'openToIn',
    easing: 'easeOutBounce',
    image: 'https://ossprod.jrdaimao.com/file/1723022847879950.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723022857289223.svg'
  },
  centerPopup: {
    name: '中心弹出',
    animateName: 'scaleToBig',
    easing: 'easeOutBounce',
    image: 'https://ossprod.jrdaimao.com/file/1723024600010649.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723024517210652.svg'
  },
  centerScaleToBig: {
    name: '中心放大',
    animateName: 'scaleToBig',
    easing: 'easeOutQuad',
    image: 'https://ossprod.jrdaimao.com/file/1723024600010649.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723024517210652.svg'
  },
  centerScaleToSmall: {
    name: '缩小进入',
    animateName: 'scaleToSmall',
    easing: 'easeOutQuad',
    image: 'https://ossprod.jrdaimao.com/file/1723025202545529.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723025213336296.svg'
  },
  centerRotate: {
    name: '旋转进入',
    animateName: 'rotateTo',
    easing: 'easeOutQuad',
    image: 'https://ossprod.jrdaimao.com/file/172302557713521.svg',
    selectImage: 'https://ossprod.jrdaimao.com/file/1723025583623310.svg'
  }
}

export const createAnimate = (type) => {
  const options = animateType[type]
  const name = options.name
  const animateName = options.animateName
  const easing = options.easing
  return {
    ...DefaultValue,
    name,
    animateName,
    easing,
    id: uuid()
  }
}

export const list = Object.keys(animateType).reduce((prev, next) => {
  return [
    ...prev,
    {
      key: next,
      ...animateType[next]
    }
  ]
}, [])
