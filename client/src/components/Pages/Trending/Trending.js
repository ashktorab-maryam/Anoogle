import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../SingleContent/SingleContent";
import styled from "styled-components"
import CustomPagination from "../../Pagination/CustomPagination";

const Trending = () => {

    const [page,setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchTrending = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );

        console.log(data.results);

        setContent(data.results);
    };

    useEffect(() => {
        fetchTrending()
    }, [page])

    return (
        <div>
            <Title>Trendings</Title>
            <TrendingS>
                {
                    content && content.map((c) => (
                        <SingleContent key={c.id}
                        id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name} 
                        date={c.first_air_date || c.release_date}
                        media_type={c.media_type}
                        vote_average={c.vote_average}/>
                    ))
                }
            </TrendingS>
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
const Button = styled.button`
font-size: 20px;
background-color:blue;
border-radius: 15px;
padding: 5px 10px;
margin:10px;
border: none;
color: lightblue;
`;

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

export default Trending;
