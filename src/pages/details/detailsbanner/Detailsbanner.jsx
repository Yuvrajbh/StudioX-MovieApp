import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import Img from '../../../components/lazyloadimage/Img';
import PosterFallback from "../../../assets/no-poster.png";
import CircleRating from '../../../components/circularrating/Circlerating';
import { Playbtn } from './Playbtn'
import Videopopup from '../../../components/videopopup/Videopopup';


const Detailsbanner = ({video,crew}) => {
    const { mediaType, id } = useParams()
    console.log(mediaType)
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const { url } = useSelector((state) => state.home)

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const[show, setShow]=useState(false)
    const[videoId, setVideoId]=useState(null)

    const _genres = data?.genres?.map((g) => g.id)
    const directors=crew?.filter((f)=>f.job==="Director")
    const writers=crew?.filter((f)=>f.job==="Writer"||"Story").slice(0,10)

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdropimg">
                                <Img src={url.backdrop + data?.backdrop_path} />
                            </div>
                            <div className="opacity-layer">
                            </div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img className='posterImg' src={url.backdrop + data.poster_path} />
                                        ) : (
                                            { PosterFallback }
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.title || data.name}(${dayjs(data.release_data).format('YYYY')})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <Genres data={_genres} />
                                        <div className="row">
                                            <CircleRating rating={data.vote_average.toFixed(1)} />
                                            <div className="playbtn" onClick={()=>{
                                                setShow(true)
                                                setVideoId(video.key)
                                            }}>
                                                <Playbtn  />
                                                <span className="text">Watch a Glimpse</span>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="decription">
                                                {data?.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                            {data?.status&&(
                                                <div className="infoItem">
                                                    <span className="text bold">Status : </span>
                                                    <div className="text">{data?.status} </div>
                                                </div>
                                            )}
                                            {data?.release_date&&(
                                                <div className="infoItem">
                                                    <span className="text bold">Release Date : </span>
                                                    <div className="text">{dayjs(data?.release_date).format("MMM DD , YYYY")} </div>
                                                </div>
                                            )}
                                            {data?.runtime&&(
                                                <div className="infoItem">
                                                    <span className="text bold">Runtime : </span>
                                                    <div className="text">{toHoursAndMinutes(data?.runtime)} </div>
                                                </div>
                                            )}
                                        </div>

                                        {directors?.length>0 &&(
                                            <div className="info">
                                                <span className="text bold">Directors:</span>
                                                <span className="text">
                                                    {directors?.map((d,i)=>(
                                                     
                                                        <span key={i}>
                                                            {d.name}
                                                            {directors?.length-1!==i && " , "}
                                                        </span>
                                                     
                                                    ))}
                                                    </span>
                                              
                                            </div>
                                        )}
                                        {writers?.length>0 &&(
                                            <div className="info">
                                                <span className="text bold">Writers:</span>
                                                <span className="text">
                                                    {writers?.map((d,i)=>(
                                                       
                                                        <span key={i}>
                                                            {d.name}
                                                            {writers?.length-1!==i && " , "}
                                                        </span>
                                                       
                                                    ))}
                                                    </span>
                                              
                                            </div>
                                        )}
                                    </div>

                                </div>
                                <Videopopup
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                    show={show}
                                    setShow={setShow}
                                />
                            </ContentWrapper>

                        </React.Fragment>
                    )

                    }
                </>

            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default Detailsbanner
