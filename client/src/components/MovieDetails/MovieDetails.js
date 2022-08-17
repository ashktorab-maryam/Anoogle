import axios from "axios";
import React from 'react';
import { useEffect, useState } from "react";
import styled from "styled-components"
import { useParams } from "react-router-dom";
import { img_300, unavailable } from "../../config/config";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const MovieDetails = () => {
    const [text, setText] = useState("");
    const handleSubmit = (event) => {
    event.preventDefault();
    setText(event.target[0].value);
    };

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
        
    const {
        currentUser
} = useContext(UserContext)



    useEffect(() => {
        fetchMovies()
    }, [page])
    

    if (!currentMovie) <div>loading</div>
    return (<><Div>
    <Img src={currentMovie.poster_path ? `${img_300}/${currentMovie.poster_path}` : unavailable} ></Img>
    <Text>{currentMovie.original_title} ({currentMovie.release_date})</Text>
    <Overview>{currentMovie.overview}</Overview>
    <Text>Original language: {currentMovie.original_language}</Text>
    <Text>Popularity: {currentMovie.popularity}</Text>
    <Text>Vote average: {currentMovie.vote_average}</Text>
    <Text>Vote count: {currentMovie.vote_count}</Text>
    <DivT>
    {currentUser?(<>
        <form onSubmit={handleSubmit}>
        <TextArea type="text" placeholder="Write Comments!" />
        <button type="submit">Comment</button></form>
        </>) : <p></p>}
        <h2>{text}</h2>
        </DivT>
    
    </Div>
    </>)


};

const Img = styled.img`
/* width: 80%;
align-items:center; */
align-self:center;
object-fit: contain;
border-radius:10px;
`;

const Div = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 100%;
width: 100%;
overflow-y: scroll;
scrollbar-width: none;
`;

const DivT = styled.div`
align-self:center;
object-fit: contain;
`;

const Text = styled.p`
align-self:center;
object-fit: contain;
border-radius:10px;
margin: 2px;
font-size:21px;
`;
const Overview = styled.p`
align-self:center;
object-fit: contain;
border-radius:10px;
font-size:25px;
text-align: center;
box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
padding: 10px;
border:2px solid gray;
`;

const TextArea = styled.textarea`
align-self:center;
object-fit: contain;
font-size:20px;
border:none;
font-family: Poppins, sans-serif;
width:500px;
`;

const Button = styled.button`

/* align-self:center;
object-fit: contain;
width:200px;
margin-Left: 40px;
font-size: 15px;
font-family: Poppins, sans-serif;
font-weight:bold;
color:white;
padding: 5px;
background-color: blue;
cursor: pointer;
border-radius: 10px;
border:none; */
`;

export default MovieDetails;
