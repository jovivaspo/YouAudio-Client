import React from 'react'
import {usePlayer} from '../hooks/usePlayer'

const CloseButton = () => {
    const {currentAudio ,resetAudio} = usePlayer()

    const handlerClose = () => {
        resetAudio({id:currentAudio.id})
    }

  return (
    <button onClick={handlerClose} className="hidden sm:absolute sm:top-2 right-2 sm:flex sm:bg-white ">Close</button>
  )
}

export default CloseButton