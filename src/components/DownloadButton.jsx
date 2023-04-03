import fileDownload from 'js-file-download'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Globalcontext } from '../contexts/GlobalContext'
import api from '../api/api'

const DownloadButton = () => {
    const {setAlert} = useContext(Globalcontext)
    const id = useParams().id
  
   const handlerDownload = async () => {
    try{
     setAlert("Su descarga comenzará en breve")
      const response = await api.get(`/video/${id}`, {
        responseType: "blob",
      });
      if(response.error){
        console.log(response)
        return  setAlert("Error al descargar")
      }
      const blob = await response.data;
       return fileDownload(blob,`${id}.mp3`)
    }catch(error){
        console.log(error)
        setAlert("Error al descargar")
    }
   }
  return (
   <button onClick={handlerDownload} className="cursor-pointer border-2 border-gray-500 p-2 rounded-xl text-sm hover:text-blue-600 hover:border-blue-600">Descargar</button>
  )
}

export default DownloadButton