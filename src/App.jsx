import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchdatafromapi } from './utils/api'
import { useEffect } from 'react'
import { getApiConfiguration, getGenres } from './store/homeslice'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import Pagenotfound from './pages/404/Pagenotfound'
import SearchResult from './pages/searchresult/SearchResult'
import Explore from './pages/explore/Explore'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import {BrowserRouter,Route,Routes} from 'react-router-dom'


function App() {
  const dispatch = useDispatch()
  const { url}=useSelector((state)=>state.home)
  console.log(url)

  useEffect(() => {
    fetchApiconfig();
    generesCall()
  }, [])

  const fetchApiconfig = () => {
    fetchdatafromapi('/configuration').then((res) => {
      console.log(res)

      const url={
        backdrop: res.images.secure_base_url + 'original',
        poster:res.images.secure_base_url + 'original',
        profile:res.images.secure_base_url + 'original'
      }
      dispatch(getApiConfiguration(url))
    })   
  }

  const generesCall=async()=>{
    let promises=[]
    let endpoints=['tv','movie']
    let allgenres={};

    endpoints.forEach((url)=>{
      promises.push(fetchdatafromapi(`/genre/${url}/list`))
    })
    const data=await Promise.all(promises)
    console.log(data)
    data.map(({genres})=>{
      return genres.map((item)=>(allgenres[item.id]=item))
    })
    dispatch(getGenres(allgenres))
  }


  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route strict path="/" element={<Home/>}  />
        {<Route strict path="/:mediaType/:id" element={<Details/>}  />}
        <Route strict path="/search/:query" element={<SearchResult/>}  />
        <Route strict path="/explore/:mediaType" element={<Explore/>}  />
        <Route strict path="*" element={<Pagenotfound/>}  />

      </Routes>
      <Footer/>
    </BrowserRouter>

  )
}

export default App
