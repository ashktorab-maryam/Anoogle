import { img_300, unavailable } from "../../config/config"
import styled from "styled-components"


const SingleContent =({
    id, 
    poster,
    title,
    date,
    media_type,
    vote_average
}) => {
    return (
        <Div>
            <Poster src={poster ? `${img_300}/${poster}` : unavailable} alt ={title}/>
            <Title>{title}</Title>
            <SubTitle>{media_type === "tv" ? "TV Series" : "Movie"}</SubTitle>
            <SubTitle>{date}</SubTitle>
        </Div>
    )
}
const Div = styled.div`
display: flex;
flex-direction:column;
width: 200px;
padding: 5px;
margin: 5px 0;
background-color: lightblue;
border-radius:10px;
position: relative;
cursor: pointer;
color: blue;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
:hover {
background-color: white;
}
@media (max-width: 550px) {
    width: 46%;
}
`;

const Poster = styled.img`
border-radius:10px;
`;

const Title = styled.b`
width:100%;
text-align: center;
font-size: 17px;
padding: 8px 0;
font-weight:bold;
`;

const SubTitle = styled.span`
display: flex;
justify-content: space-between;
padding-bottom: 3px;
padding: 0 2px;
`;

export default SingleContent