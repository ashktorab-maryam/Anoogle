import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SingleContent from "../../SingleContent/SingleContent";



const Search = (handleSelect) => {
    const [searchText, satSearchText] = useState('');
    const [content, satContent] = useState();
    const [numOfPages, setNumOfPages] = useState();
    const [type,setType] = useState(0);
    const [page,setPage] = useState(1);


    const fetchSearch = async() => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`
        );
            console.log(data)
        satContent(data.results)
        // setNumOfPages(data);
    }

    // useEffect(() => {
    //     window.scroll(0, 0);
    //     fetchSearch();
    // })

    return (
        <div>
    <Input
    type='text'
    placeholder="Search" 
    value={searchText}
    onChange={(ev) => satSearchText(ev.target.value)}
/>
    <Button onClick={fetchSearch}>search</Button>
            <TrendingS>
            {/* <p>{content[0].poster_path}</p> */}
                {
                    content && content.length>0 ?
                    content.map((c) => (
                        <SingleContent key={c.id}
                        id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name} 
                        date={c.first_air_date || c.release_date}
                        media_type={type ? "tv" : "movie"}
                        vote_average={c.vote_average}/>
                    ))
                    :
                    <h2>No Movies Found</h2>

                }
               
            </TrendingS>
            {/* <CustomPagination setPage={setPage}/> */}
        </div>
    );
};

const Input = styled.input`
margin-left: 35%;
border-radius: 5px;
border: 1px solid lightgrey;
width:300px;
height:35px;
&:hover {
    border: 1px solid blue;
}
`;

const Button = styled.button`
background-color: blue;
border-radius: 5px;
margin-left: 10px;
border: none;
padding: 10px 20px;
color: white;
`;

const TrendingS = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`;


export default Search

