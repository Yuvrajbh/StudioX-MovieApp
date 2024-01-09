import React from 'react'
import './style.scss'
import Herobanner from './herobanner/Herrobanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import Toprates from './toprated/Toprates'
import Upcone from './upcoming/Upcone'
import Onair from './onair/Onair'

const Home = () => {
  return (
    <div className='homepage'>
      <Herobanner/>
      <Trending/>
      <Popular/>
      <Toprates/>
      <Upcone/>
      <Onair/>
      {/* <div className="n"></div> */}
    </div>
  )
}

export default Home
