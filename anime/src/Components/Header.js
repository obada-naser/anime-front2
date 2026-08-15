import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import "./Header.css";
import { withAuth0 } from '@auth0/auth0-react';
 class Header extends React.Component{


   scrollToTop = () => {
        window.scrollTo(0, 0);
    };

  
  render() {
     const { isAuthenticated } = this.props.auth0;
    const { user } = this.props.auth0;
    return(
        <center>
    <Navbar expand="lg" collapseOnSelect className="navBrand justify-content-center">
      <Container fluid className="d-flex flex-column align-items-center">
       <Navbar.Brand as={Link} to="/">
    <img
        src="./photos/anime-webapp logo.png"
        alt="My Anime List"
        className="header-logo"
    />
</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="me-auto">
            <Nav.Link as={Link}  to="/" onClick={this.scrollToTop}>Home</Nav.Link>
            <Nav.Link as={Link} to="/Anime" onClick={this.scrollToTop}>Anime</Nav.Link>
            <Nav.Link as={Link} to="/Manga" onClick={this.scrollToTop}>Manga</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
             { isAuthenticated && <NavDropdown.Item as={Link} to="/FavAnime" onClick={this.scrollToTop}>My Favorite Anime</NavDropdown.Item>}
             { isAuthenticated && <NavDropdown.Item  as={Link} to="/MangaFav" onClick={this.scrollToTop}>
                My Favorite Manga
              </NavDropdown.Item>}
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
             {isAuthenticated ? <Logout /> : <Login />}
             
        {isAuthenticated && <img src={user.picture} alt={user.name}  className="profile-picture"/>}
      
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </center>
    )
  }
}

export default withAuth0(Header);