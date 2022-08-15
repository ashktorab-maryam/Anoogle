import Header from "./components/Header/Header";
import styled from "styled-components"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trending from "./components/Pages/Trending/Trending";
import Movies from "./components/Pages/Movies/Movies";
import Search from "./components/Pages/Search/Search";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SignIn from "./components/Pages/SignIn/SignIn";
// import SimpleBottomNavigation from "./components/MainNav";

const App = () => {
return (
  <BrowserRouter>
    <Header/>
      <Main>
        <Routes>
          <Route exact path="/" element={<Trending/>}></Route>
          <Route exact path="/movies" element={<Movies/>}></Route>
          <Route exact path="/signin" element={<SignIn/>}></Route>
          <Route exact path="/movies/:movieId" element={<MovieDetails/>}></Route>
          <Route exact path="/search" element={<Search/>}></Route>
        </Routes>
      </Main>
      {/* <SimpleBottomNavigation/> */}
  </BrowserRouter>

);
}
const Main = styled.div`
  background: lightblue;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 70px;
`;

export default App;