import React, { useEffect, useState } from 'react';
import "./style.scss"
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchdatafromapi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

import noResults from '../../assets/no-results.png'
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/moviecard/Moviecard';


function SearchResult() {

  const [data, setdata] = useState(null)
  const [pagenum, setpagenum] = useState(1)
  const [loading, setloading] = useState(false)
  const { query } = useParams()

  const fetchIntialData = () => {
    setloading(true)
    fetchdatafromapi(`/search/multi?query=${query}&page=${pagenum}`).then((res) => {
      setdata(res)
      setpagenum((prev => prev + 1))
      setloading(false)
    }
    )
  }
  const fetchNextPageData = () => {
    fetchdatafromapi(`/search/multi?query=${query}&page=${pagenum}`).then((res) => {
      if (data?.results) {
        setdata({ ...data, results: [...data?.results, ...res.results] })
      }
      else {
        setdata(res)
      }
      setpagenum((prev => prev + 1))
    })
  }

  useEffect(() => {
    setpagenum(1)
    fetchIntialData()
  }, [query])



  return (
    <div className='searchResultsPage'>

      {loading && <Spinner initial={true}/>}
      {!loading &&(
        <ContentWrapper>
          {data?.results?.length>0 ? (

            <>
              <div className="pageTitle">
                {
                  `Search ${data?.total_results>1 ? "results" : "result"} of "${query}"`
                }
              </div>
              <InfiniteScroll
              className='content'
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pagenum<=data.total_pages}
              loader={<Spinner/>}
              
              >

                {data?.results.map((item,index)=>{

                  if(item.media_type==="person") return;

                  return(
                    <MovieCard key={index} data={item} fromSearch={true}/>
                  )

                })}
              </InfiniteScroll>
            </>

          ):(

            <span className="resultNotFound">
              Not Found
            </span>

          )
          }
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult
