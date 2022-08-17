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
                        <StyledLink to={`/movies/${c.id}`}>
                        <SingleContent key={c.id}
                        id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name} 
                        date={c.first_air_date || c.release_date}
                        media_type={c.media_type}
                        vote_average={c.vote_average}/>
                        </StyledLink> 
                    ))
                }
            </TrendingS>
            {/* <Input type="number" value={page} onChange={(e)=>setPage(e.target.value)} min="1"/> */}
            {/* <CustomPagination setPage={setPage}/> */}
            <Div>
            <Button onClick={()=>setPage(page-1)} disabled={page<=1}>Previous</Button>
            <Span>{page}</Span>
            <Button onClick={()=>setPage(page+1)}>Next</Button>
            </Div>
        </div>
    );
};


const Div = styled.div`
margin-top: 20px;
text-align:center;
align-self:center;
object-fit: contain;
`;

const Span = styled.span`
font-size: 25px;
color: blue;
`;

const TrendingS = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`;
const Button = styled.button`
font-size: 20px;
background-color:blue;
border-radius: 15px;
padding: 5px 10px;
margin:10px;
border: none;
color: lightblue;
`;

const StyledLink = styled(Link)`
text-decoration: none;
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
