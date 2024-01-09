import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import '../style.scss'
import Switchtabs from '../../../components/switchtabs/Switchtabs'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {

    const [endpoint,setendpoint]=useState('day')

    const {data,loading}=useFetch(`/trending/all/${endpoint}`)


    const ontabchange=(tab)=>{
        setendpoint(tab==='Day'?'day':'week')

    }
  return (
    <div className='carouselSection'>
    <ContentWrapper>
    <span className="carouselTitle">Trending</span>
    <Switchtabs data={["Day","Week"]} ontabchange={ontabchange} />
    </ContentWrapper>
    <Carousel data={data?.results} loading={loading}/>
    
    </div>
  )
}

export default Trending
