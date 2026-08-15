import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

import {
   BrowserRouter as Router,
  Routes,
  Route } from "react-router-dom"
// import { withAuth0 } from '@auth0/auth0-react';
import Anime from './Components/Anime';
import Manga from './Components/Manga';
import FavAnime from './Components/FavAnime';
import Home from './Components/Home';
import MangaFav from "./Components/MangaFav"
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {

  state={
    topAnime:[],
    newAnime:[],
    hotManga: [],
    topComedy: [],
  }

   setTopAnime = (data) => this.setState({ topAnime: data });
  setNewAnime = (data) => this.setState({ newAnime: data });
  setHotManga = (data) => this.setState({ hotManga: data });
  setTopComedy = (data) => this.setState({ topComedy: data });  

  render() {
    console.log('app', this.props);
    const { isAuthenticated } = this.props.auth0;
    return(
      <>
        <Router>
            <Header/>
            <Routes>
            {/* <Route exact path="/"> */}
                {/* TODO: if the user is logged in, render the `Home` component, if they are not, render the `Login` component */}
                {/* {isAuthenticated &&  */}
                {/* <Home/> */}
                {/* } */}
              {/* </Route> */}
              <Route path="/" element={ <Home/>} />
              <Route path="/Anime" element={ <Anime/>}/>
              <Route path="/Manga" element={ <Manga/>}/>
              <Route path="/FavAnime" element={isAuthenticated && <FavAnime/>}/>
              <Route path="/MangaFav" element={isAuthenticated && <MangaFav/>}/>
              {/* <Route exact path="/Anime">
                {isAuthenticated && <Anime/>}

              </Route>
              <Route exact path="/Manga">
                {isAuthenticated && <Manga/>}
              </Route>
              <Route exact path="/FavAnime">
                {isAuthenticated && <FavAnime/>}
              </Route> */}
            </Routes>
            <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
// export default App;