import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../SingleContent/SingleContent";
import styled from "styled-components"
import { Link } from "react-router-dom";

const Movies = () => {
    
    const [page,setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchMovies = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
        );

        console.log(data.results);

        setContent(data.results);
    };

    useEffect(() => {
        fetchMovies
        ()
    }, [page])

    return (
        <div>
            <Title>Movies</Title>
            <TrendingS>
                {
                    content && content.map((c) => (
                        <Link to={`/movies/${c.id}`}>
                        <SingleContent key={c.id}
                        id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name} 
                        date={c.first_air_date || c.release_date}
                        media_type={c.media_type}
                        vote_average={c.vote_average}/>
                        </Link> 
                    ))
                }
            </TrendingS>
            {/* <CustomPagination setPage={setPage}/> */}
        </div>
    );
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

export default Movies;
