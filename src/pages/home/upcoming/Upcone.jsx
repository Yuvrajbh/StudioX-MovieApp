import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import '../style.scss'
import Switchtabs from '../../../components/switchtabs/Switchtabs'
import Carousel from '../../../components/carousel/Carousel'

const Upcone = () => {

    const [endpoint,setendpoint]=useState('movie')

   const {data,loading}=useFetch(`/${endpoint}/upcoming`||`/${endpoint}/on_the_air`)

    const ontabchange=(tab)=>{
        setendpoint(tab==='Movies'?'movie':'tv')

    }
  return (
    <div className='carouselSection'>
    <ContentWrapper>
    <span className="carouselTitle">Upcoming/New Movies</span>
    {/* <Switchtabs data={["Movies","TV Shows"]} ontabchange={ontabchange} /> */}
    </ContentWrapper>
    <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    
    </div>
  )
}

export default Upcone
