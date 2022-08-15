import axios from "axios";
import React from 'react';
import { useEffect, useState } from "react";
import styled from "styled-components"
import { useParams } from "react-router-dom";

const MovieDetails = () => {

    const [page,setPage] = useState(1);
    // const [content, setContent] = useState([]);
    const {movieId} = useParams()
    const [currentMovie, setCurrentMovie] = useState([]);
    const [status, setStatus] = React.useState("loading");



    const fetchMovies = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        console.log(data);

        setCurrentMovie(data);
    };

    useEffect(() => {
        fetchMovies()
        // .then (res => res.json())
        // .then (data => {
        //     console.log(data)
            // setCurrentMovie(data.results)
        //     setStatus("idle")
        // })
    }, [page])
    

    if (!currentMovie) <div>loading</div>
    return (<>
   
    <p>{currentMovie.overview}</p>
    </>)


};

const TrendingS = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`;

const Title = styled.span`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
margin-bottom: 10px;
color: gray;
font-size: 2vw;
@media (max-width: 1000px) {
    font-size: 6.4vw;
}
`;

export default MovieDetails;
