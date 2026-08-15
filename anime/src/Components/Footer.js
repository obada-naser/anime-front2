import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css'

class Footer extends React.Component {
  render() {
    return(
        <div className='footerTop'>
     
      <Navbar collapseOnSelect className="Footer">
       
        <Navbar.Brand >
            <center>

            <h5 className="text-center">&copy; Anime </h5>
            <h6 className="text-center">By Obada Hamadneh LLC </h6>
            
            </center>   
            
            </Navbar.Brand>
      
      </Navbar>
      </div>
    );
  }
}

export default Footer;