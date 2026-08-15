import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Row, Button, Col, Container } from 'react-bootstrap';
import UpdateModal from './UpdateModal';
import SynopsisModal from './SynopsisModal'
import "./FavAnime.css"
import { Link } from 'react-router-dom';

class FavAnime extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            animeFav: [],
            show: false,
            indexUpdate: 0,
            showModal:false

        }
    }

    //getting from the db:

    gettingAnime = () => {
        const { user } = this.props.auth0;
        
        let url = `${process.env.REACT_APP_SERVER_URL}/favGet?email=${user.email}`;

        //  let url = `http://localhost:3001/favGet?email=${user.email}`;

        axios.get(url).then(item => {
            this.setState({
                animeFav: item.data[0].anime,
            })
        })
            .catch()
    }


    componentDidMount = () => {
        setTimeout(() => {
            this.gettingAnime();

        }, 15)
    }


    //deleting Anime

    deleteAnime = (index) => {
        const { user } = this.props.auth0;


        let url = `${process.env.REACT_APP_SERVER_URL}/favDelete/${index}?email=${user.email}`;

        // let url = `http://localhost:3001/favDelete/${index}?email=${user.email}`;

        axios.delete(url).then(item => {
            this.setState({
                animeFav: item.data.anime
            })
        })
            .catch()
    }


    handleCloseUpdate = () => {
        this.setState({
            show: false
        })
    }
    handleClose=()=>{
        this.setState({
            showModal:false
        })
    }


    //synopsis
    showSynopsis=(index)=>{
        this.setState({
            synopsis: this.state.animeFav[index].synopsis,
      image_url: this.state.animeFav[index].image_url,
      title: this.state.animeFav[index].title,
      type: this.state.animeFav[index].type,
      episodes: this.state.animeFav[index].episodes,
      score: this.state.animeFav[index].score,
      rated: this.state.animeFav[index].rated,
      aired: this.state.animeFav[index].aired,

            showModal:true
        })
    }
   




    //updating Anime

    showUpdate = (index) => {
        this.setState({
            show: true,
            indexUpdate: index,
            image_url: this.state.animeFav[index].image_url,
            title: this.state.animeFav[index].title,
            synopsis: this.state.animeFav[index].synopsis,
            type: this.state.animeFav[index].type,
            episodes: this.state.animeFav[index].episodes,
            score: this.state.animeFav[index].score,
            rated: this.state.animeFav[index].rated,
            url: this.state.animeFav[index].url,
            aired:this.state.animeFav[index].aired



        })
    }

    //handling the update

    handleUpdate = (event) => {
        const { user } = this.props.auth0;

        event.preventDefault();
        let data = {
            email: user.email,
            image_url: event.target.image_url.value,
            title: event.target.title.value,
            synopsis: event.target.synopsis.value,
            type: event.target.type.value,
            episodes: event.target.episodes.value,
            score: event.target.score.value,
            rated: event.target.rated.value,
            aired: event.target.aired.value
        }

        let url = `${process.env.REACT_APP_SERVER_URL}/favUpdate/${this.state.indexUpdate}`

        // let url = `http://localhost:3001/favUpdate/${this.state.indexUpdate}`

        axios.put(url, data).then(item => {
            this.setState({
                animeFav: item.data,
                show: false
            })
        })
    }


    render() {
        return (

            <>

             {
          this.state.showModal &&
          <SynopsisModal
            showModal={this.state.showModal}
            handleClose={this.handleClose}
             synopsis={this.state.synopsis}
            image_url={this.state.image_url}
            title={this.state.title}
            type={this.state.type}
            episodes={this.state.episodes}
            score={this.state.score}
            rated={this.state.rated}
            aired={this.state.aired}
          />

        }
                {
                    this.state.show &&
                    (
                        <UpdateModal
                            show={this.state.show}
                            image_url={this.state.image_url}
                            title={this.state.title}
                            synopsis={this.state.synopsis}
                            type={this.state.type}
                            episodes={this.state.episodes}
                            score={this.state.score}
                            rated={this.state.rated}
                            aired={this.state.aired}

                            handleCloseUpdate={this.handleCloseUpdate}
                            handleUpdate={this.handleUpdate}
                        />
                    )
                }
                <div className='fav-container'> 

                <h1 className="headerFav">My Favorite Anime</h1>
                <hr style={{ border: "1px solid #BFA2D" }} />

                {
                    <Container>
                    <Row xs={1} sm={2} md={3} lg={4} className="justify-content-center g-4">{
                        this.state.animeFav.map((anime, idx) => {
                            return(
                            <Col key={idx} className="d-flex justify-content-center">
                                <Card className="cardAnime h-100">

                                    <Link to={anime.url}>
                                        <Card.Img variant="top" src={anime.image_url} className="animeImg" />
                                    </Link>

                                    <Card.Body className="cardBody d-flex flex-column">
                                        <Card.Title className="favTitle">{anime.title ?? 'N/A'}</Card.Title>

                                        <Card.Text>Anime Type: {anime.type ?? 'N/A'}</Card.Text>
                                        <Card.Text>Episodes: {anime.episodes ?? 'N/A'}</Card.Text>
                                        <Card.Text>Score: {anime.score ?? 'N/A'}</Card.Text>
                                        <Card.Text>Rated: {anime.rated ?? 'N/A'}</Card.Text>
                                        <div className="mt-auto d-flex flex-column gap-2">
                                        <Button variant="info" onClick={() => this.showSynopsis(idx)}>
                                                                          Show More..
                                                                        </Button>

                                                                        </div>
                                                                        <br/>
                                        <center>
                                            
                                            
                                            <Button variant="danger" className="deleteButton" onClick={() => { this.deleteAnime(idx) }}>Delete</Button>
                                            <Button variant="primary" className="updateButton" onClick={() => { this.showUpdate(idx) }}>Update</Button>
                                        </center>
                                    </Card.Body>
                                </Card>
                            </Col>
                            )
                        }
                        )
                    }
                    </Row>
                    </Container>
                }
</div>
            </>
        )
    }





}

export default withAuth0(FavAnime);