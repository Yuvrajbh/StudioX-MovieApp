import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import '../style.scss'
import Switchtabs from '../../../components/switchtabs/Switchtabs'
import Carousel from '../../../components/carousel/Carousel'

const Popular = () => {

    const [endpoint,setendpoint]=useState('movie')

    const {data,loading}=useFetch(`/${endpoint}/popular`)


    const ontabchange=(tab)=>{
        setendpoint(tab==='Movies'?'movie':'tv')

    }
  return (
    <div className='carouselSection'>
    <ContentWrapper>
    <span className="carouselTitle">What's Popular</span>
    <Switchtabs data={["Movies","TV Shows"]} ontabchange={ontabchange} />
    </ContentWrapper>
    <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    
    </div>
  )
}

export default Popular
