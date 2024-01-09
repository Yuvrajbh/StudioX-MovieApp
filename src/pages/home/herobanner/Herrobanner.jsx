import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import useFetch from '../../../hooks/useFetch'
import { useEffect } from 'react'
import Img from '../../../components/lazyloadimage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'


const Herrobanner = () => {

  const navigate = useNavigate()
  const [background, setbackground] = useState("")
  const [query, setquery] = useState('')
  const { url } = useSelector((state) => state.home)
  const { data, loading } = useFetch("/movie/upcoming")

  useEffect(() => {

    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setbackground(bg)

  }, [data])

  const searchqueryhandler = (e) => {

    if (e.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`)

    }

  }

  return (

    <div className='herobanner'>
      {!loading && (
        <div className="backdropimg">
        <Img src={background} alt="" /></div>)}
      <div className="opacitylayer">

      </div>
      <ContentWrapper>
        <div className="herobannercontent">
          <span className="title">Welcome</span>
          <span className="subtitle">Millions of movies , TV shows and people to discover  . 
            Explore Now</span>

          <div className="searchcontent">
            <input type="text" placeholder='Search for your favourite Movie or TV show...'
              onChange={(e) => setquery(e.target.value)}
              onKeyUp={searchqueryhandler}

            />
            <button onClick={()=>
              navigate(`search/${query}`)
            }>Search</button>
          </div>
        </div>

      </ContentWrapper>


    </div>
  )
}

export default Herrobanner
