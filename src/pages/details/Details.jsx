import React from 'react'
import './style.scss'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Detailsbanner from './detailsbanner/Detailsbanner'
import Cast from './cast/Cast'
import Videosection from './videosection/Videosection'
import Similar from './carousels/Similar'
import Recommendations from './carousels/Recommendations'




const Details = () => {
  const{mediaType,id}=useParams()
  console.log(mediaType)
  const{data,loading}=useFetch(`/${mediaType}/${id}/videos`)
  const{data:credits,loading:creditsloading}=useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      <Detailsbanner video={data?.results?.[0]}  crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsloading} />
      <Videosection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendations mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details
