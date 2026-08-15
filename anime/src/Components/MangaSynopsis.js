import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from "react-bootstrap";
import './MangaSynopsis.css';

class MangaSynopsis extends React.Component {
  render() {

    return (
      <div>
        
        <Modal show={this.props.showModal} onHide={this.props.handleClose} scrollable >

          <Modal.Header closeButton className='headerFooter'>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          
          <Modal.Body className="modalBody">
            <div className="row">
              {/* Image column */}
              <div className="col-md-5 mb-3 mb-md-0">
                <img
                  src={this.props.image_url}
                  alt={this.props.title}
                  className="img-fluid"
                  
                />
                
              </div>

              {/* Synopsis column */}
              <div className="col-md-7">
                <div
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <div className='animeModal'>
                  <h6>Type: {this.props.type ?? 'N/A'}</h6>
                  <br/>
                  <h6>Chapters: {this.props.chapters ?? 'N/A'}</h6>
                  <br/>
                    <h6>Volumes: {this.props.volumes ?? 'N/A'}</h6>
                  <br/>
                    <h6>Score: {this.props.score ?? 'N/A'}</h6>
                  <br/>
                  <h6>Status: {this.props.status ?? 'N/A'}</h6>
                  <br/>
                  <h6>Published: {this.props.published ?? 'N/A'}</h6>
                  <br/>
                  </div>
                  <h6>Synopsis:</h6>

                  <p className="mb-0">{this.props.synopsis}</p>
                </div>
              </div>
            </div>
          </Modal.Body>
         
          
          <Modal.Footer className='headerFooter'>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>

          </Modal.Footer>

        </Modal>
      </div>
    )
  }

}
export default MangaSynopsis;