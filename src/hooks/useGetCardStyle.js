import { useUpdate } from 'ahooks'
import { useCallback, useEffect } from 'react'

const useGetCardStyle = () => {
  const update = useUpdate()
  
  useEffect(() => {
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
    }
  })
  
  const getItemStyle = useCallback((index, cardWidth = 250) => {
    const w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 250
    const m = 15
    const t = Math.ceil((w + m) / (cardWidth + m))
    const rowLen = Math.max(4, t)
    
    return {
      width: `calc((100% - ${(rowLen - 1) * m}px) / ${rowLen})`,
      marginRight: (index + 1) % rowLen ? `${m}px` : '0',
      marginBottom: m
    }
  }, [])
  
  return {
    getItemStyle
  }
}

export default useGetCardStyle
