import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Modal, Button } from "react-bootstrap";
import "./UpdateModal.css";

class UpdateModal extends React.Component{
    render(){
        return(

            <div>
                 <Modal show={this.props.show} onHide={this.props.handleCloseUpdate} animation={true}>
          
          <Modal.Header closeButton>
            <Modal.Title className="updateTitle">Anime Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          
            <Form onSubmit={this.props.handleUpdate}>
              <Form.Group className="updateForm" controlId="formBasicEmail">
                <Form.Label>Image</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter Image" 
                defaultValue={this.props.image_url}
                name="image_url"
                />
              
              </Form.Group>

              <Form.Group className="updateForm" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter Title" 
                defaultValue={this.props.title}
                name="title"
                />
              
              </Form.Group>

              <Form.Group className="updateForm" controlId="formBasicEmail">
                <Form.Label>Synopsis</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter Synopsis" 
                defaultValue={this.props.synopsis}
                name="synopsis"
                />
              
              </Form.Group>


              <Form.Group className="updateForm" controlId="formBasicEmail">
                <Form.Label>Type</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter type" 
                defaultValue={this.props.type}
                name="type"
                />
              
              </Form.Group>

              <Form.Group className="updateForm" controlId="formBasicEmail">
                <Form.Label>Episodes</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter episodes" 
                defaultValue={this.props.episodes}
                name="episodes"
                />
              
              </Form.Group>

              <Form.Group className="updateForm" controlId="formBasicEmail">
                <Form.Label>Score</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter score" 
                defaultValue={this.props.score}
                name="score"
                />
              
              </Form.Group>

              <Form.Group className="updateForm" controlId="formBasicEmail">
                <Form.Label>Rated</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter rating" 
                defaultValue={this.props.rated}
                name="rated"
                />
              
              </Form.Group>

              <Form.Group className="updateForm" controlId="formBasicEmail">
                <Form.Label>Released Date</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter rating" 
                defaultValue={this.props.aired}
                name="rated"
                />
              
              </Form.Group>
          
              <Button variant="primary" type="submit" className="saveChanges">
                Save changes
              </Button>
            </Form>


           
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleCloseUpdate}>
              Close
            </Button>
          
          </Modal.Footer>
        
        </Modal>
            </div>
        )
    }
}

export default UpdateModal;