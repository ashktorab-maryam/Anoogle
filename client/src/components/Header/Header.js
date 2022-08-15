import styled from "styled-components"

const Header = () => {
    return (
            <HeaderS onClick={() => window.scroll(0, 0)}>Anoogle</HeaderS>
    )
}

const HeaderS = styled.span`
width: 100%;
cursor: pointer;
position: fixed;
display: flex;
justify-content: center;
text-transform:uppercase;
background-color: lightblue;
font: 5vw;
padding: 15px;
color: blue;
z-index: 100;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export default Header