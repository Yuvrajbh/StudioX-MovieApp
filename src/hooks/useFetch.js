import { useState } from "react"
import { fetchdatafromapi } from "../utils/api"
import { useEffect } from "react"

const useFetch=(url)=>{
    const [data,setdata]=useState(null)
    const [loading,setloading]=useState(null)
    const [error,seterror]=useState(null)

    useEffect(()=>{
        setloading("loading...")
        setdata(null)
        seterror(null)

        fetchdatafromapi(url).then((res)=>{
            setloading(false)
        setdata(res)
        }).catch((err)=>{
            setloading(false)
            seterror('something went wrong')
        })
    },[url])

    return{data,loading,error}

}

export default useFetch;