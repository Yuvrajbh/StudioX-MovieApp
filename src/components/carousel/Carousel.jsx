import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyloadimage/Img";
import PosterFallback from "../../assets/no-poster.png";
import './style.scss'
import CircleRating from "../circularrating/Circlerating";
import Genres from "../genres/Genres";
const Carousel = ({data,loading,endpoint ,title}) => {
    const {url}=useSelector((state)=>state.home)
    const navigate=useNavigate()
    const carouselcontainer=useRef()

    const skitem=()=>{
        return(
        <div className="skeletonItem">
            <div className="posterblock skeleton"></div>
                <div className="textblock ">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
                
            </div>
        </div>)
    }

    const navigation=(dir)=>{
      const container=carouselcontainer.current;

      const scrollamount=dir==='left'?container.scrollLeft-(container.offsetWidth+20):container.scrollLeft+(container.offsetWidth+20)

      container.scrollTo({
        left:scrollamount,
        behavior:'smooth'
      })
    }
  return (
    <div className="carousel">
    
    <ContentWrapper>
    {title && <div className="carouselTitle">{title}</div> }
        <BsFillArrowLeftCircleFill className="carouselleftnav arrow" onClick={()=>navigation('left')}/>
        <BsFillArrowRightCircleFill className="carouselrightnav arrow" onClick={()=>navigation('right')}/>

        {!loading ? (
            <div className="carouselitems" ref={carouselcontainer}>

            {data?.map((item)=>{
                const posterUrl=item.poster_path?url.poster +item.poster_path:PosterFallback
                return(
                    <div key={item.id} className="carouselitem" onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                    <div className="posterblock">
                    <Img src={posterUrl}/>
                    <CircleRating rating={item.vote_average.toFixed(1)}/>
                    <Genres className='genres' data={item.genre_ids.slice(0,1)}/>

                    </div>
                    <div className="textblock">
                    <span className="title">
                    {item.title || item.name}
                    </span>
                    <span className="date">
                    {dayjs(item.release_Date).format("MMM D, YYYY")}
                    </span>
                       
                    </div>

                    </div>
                )
            })}

            </div>
        ):(
            <div className="loadingskeklton">
                {skitem()}
                {skitem()}
                {skitem()}
                {skitem()} 
                 {skitem()} 
                  {skitem()}

            </div>
        )}
    </ContentWrapper>

      
    </div>
  )
}

export default Carousel
