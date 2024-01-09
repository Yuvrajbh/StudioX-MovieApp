import axios from 'axios';
const BASE_URL="https://api.themoviedb.org/3"
const TMBDB_token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzYzYWZhZDQ1MTFmOTU1Y2VhYmE2YmI5OWEyNGFiMiIsInN1YiI6IjY0YmZkODk5OGVlNDljMGZjY2IwOGU1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8WBH0Ub78PLnP3JIggefxGJKxYrwjrhdZDDtfUlKNE8'
// import.meta.env.VITE_APP_TMDB_KEY

const headers={
    Authorization:'bearer ' + TMBDB_token,
}

export const fetchdatafromapi=async(url,params)=>{

    try {
        const {data}= await axios.get(BASE_URL+url,{
            headers,params
        })
        return data;
        
    } catch (error) {

        console.log(error)
        return error
        
    }

}