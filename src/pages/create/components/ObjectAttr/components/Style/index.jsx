import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../../store/create'
import { comEnum } from './config'

const Style = () => {
  const { selectObjects } = createStore
  const [objectType, setObjectType] = useState(null)
  
  useEffect(() => {
    setObjectType(selectObjects[0].type)
  }, [selectObjects])
  
  const Com = comEnum[objectType]
  return Com ? <Com/> : null
}

export default observer(Style)
