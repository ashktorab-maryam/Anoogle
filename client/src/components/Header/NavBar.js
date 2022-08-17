import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const NavBar = () => {
    const {currentUser} = useContext(UserContext)

return (
    <Wrapper>
    <Nav>
        <StyledLink to="/" onClick={() => window.scroll(0, 0)}>
            ANOOGLE
        </StyledLink>

        <NavLinksWrapper>
            <StyledNavLink to="/movies">Movies</StyledNavLink>
            <StyledNavLink to="/search">Search</StyledNavLink>
            {currentUser? <StyledLink to="/profile">Hey {currentUser.givenName}</StyledLink> :
            (<><StyledNavLink to="/signin">Sign In</StyledNavLink> 
            <StyledNavLink to="/signup">Sign Up</StyledNavLink>
            </>)
            }
        </NavLinksWrapper>
        

    </Nav>
    </Wrapper>
);
};


const Wrapper = styled.header`
box-shadow: 0 1px 2px rgb(0, 0, 0, 0.2);
position: sticky;
top: 0;
border: 1px solid #000000;
border-left: none;
border-right: none;
background-color: #FEFEFE;
padding: 0 0px;
z-index: 1000;
padding-right: 20px;
`;
const Nav = styled.nav`
height: 70px;
display: flex;
justify-content: space-between;
align-items: center;
`;


const NavLinksWrapper = styled.div`
margin-left: -280px;

`;

const StyledLink = styled(Link)`
font-size: 30px;
text-decoration: none;
`;

const StyledNavLink = styled(NavLink)`
text-decoration: none;
margin: 0 6rem;
font-size: 24px;
color: #383838;
transition: all 0.2s ease-in-out;

&:hover {
    color: #3978C9c2;
}

&.active {
    color: #3978C9c2;
    text-decoration: underline 4px #3978C9c2;
    text-underline-offset: 8px;
}
`;


export default NavBar;
