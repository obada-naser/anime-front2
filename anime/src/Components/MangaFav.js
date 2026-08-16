import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Row, Button, Col, Container } from 'react-bootstrap';
import UpdateModal from './UpdateModal';
import MangaSynopsis from './MangaSynopsis'
import "./MangaFav.css"
import { Link } from 'react-router-dom';

class MangaFav extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            mangaFav: [],
            show: false,
            indexUpdate: 0,
            showModal:false

        }
    }

    //getting from the db:

    gettingManga = () => {
        const { user } = this.props.auth0;

        let url = `${process.env.REACT_APP_SERVER_URL}/mangaGet?email=${user.email}`;
        
        // let url = `http://localhost:3001/mangaGet?email=${user.email}`;

        axios.get(url).then(item => {
            this.setState({
                mangaFav: item.data[0].manga,
            })
        })
            .catch()
    }


    componentDidMount = () => {
        setTimeout(() => {
            this.gettingManga();

        }, 15)
    }


    //deleting Anime

    deleteManga = (index) => {
        const { user } = this.props.auth0;


        let url = `${process.env.REACT_APP_SERVER_URL}/mangaDelete/${index}?email=${user.email}`;

        // let url = `http://localhost:3001/mangaDelete/${index}?email=${user.email}`;

        axios.delete(url).then(item => {
            this.setState({
                mangaFav: item.data.manga
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
            synopsis: this.state.mangaFav[index].synopsis,
      image_url: this.state.mangaFav[index].image_url,
      title: this.state.mangaFav[index].title,
      type: this.state.mangaFav[index].type,
      chapters: this.state.mangaFav[index].chapters,
      volumes: this.state.mangaFav[index].volumes,
      score: this.state.mangaFav[index].score,
      status: this.state.mangaFav[index].status,
      published: this.state.mangaFav[index].published,

            showModal:true
        })
    }
   




    //updating Anime

    showUpdate = (index) => {
        this.setState({
            show: true,
            indexUpdate: index,
            image_url: this.state.mangaFav[index].image_url,
            title: this.state.mangaFav[index].title,
            synopsis: this.state.mangaFav[index].synopsis,
            type: this.state.mangaFav[index].type,
             chapters: this.state.mangaFav[index].chapters,
            volumes: this.state.mangaFav[index].volumes,
            score: this.state.mangaFav[index].score,
           status: this.state.mangaFav[index].status,
            url: this.state.mangaFav[index].url,
            published: this.state.mangaFav[index].published,



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
            chapters: event.target.episodes.chapters,
            volumes: event.target.volumes.chapters,
            score: event.target.score.value,
            status: event.target.rated.status,
            published: event.target.published.value
        }

        let url = `${process.env.REACT_APP_SERVER_URL}/updateManga/${this.state.indexUpdate}`

        // let url = `http://localhost:3001/updateManga/${this.state.indexUpdate}`

        axios.put(url, data).then(item => {
            this.setState({
                mangaFav: item.data,
                show: false
            })
        })
    }


    render() {
        return (

            <>

             {
          this.state.showModal &&
          <MangaSynopsis
            showModal={this.state.showModal}
            handleClose={this.handleClose}
             synopsis={this.state.synopsis}
            image_url={this.state.image_url}
            title={this.state.title}
            type={this.state.type}
            chapters={this.state.chapters}
            volumes={this.state.volumes}
            score={this.state.score}
            status={this.state.status}
            published={this.state.published}
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
                             chapters={this.state.chapters}
                            volumes={this.state.volumes}
                            score={this.state.score}
                            status={this.state.status}
                             published={this.state.published}

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
                        this.state.mangaFav.map((manga, idx) => {
                            return(
                            <Col key={idx} className="d-flex justify-content-center">
                                <Card className="cardManga h-100">

                                    <Link to={manga.url}>
                                        <Card.Img variant="top" src={manga.image_url} className="animeImg" />
                                    </Link>

                                    <Card.Body className="cardBody d-flex flex-column">
                                        <Card.Title className="favTitle">{manga.title ?? 'N/A'}</Card.Title>

                                        <Card.Text>Manga Type: {manga.type ?? 'N/A'}</Card.Text>
                                        <Card.Text>Chapters: {manga.chapters ?? 'N/A'}</Card.Text>
                                        <Card.Text>Score: {manga.score ?? 'N/A'}</Card.Text>
                                        <Card.Text>Status: {manga.status ?? 'N/A'}</Card.Text>
                                        <div className="mt-auto d-flex flex-column gap-2">
                                        <Button variant="info" onClick={() => this.showSynopsis(idx)}>
                                                                          Show More..
                                                                        </Button>

                                                                        </div>
                                                                        <br/>
                                        <center>
                                            
                                            
                                            <Button variant="danger" className="deleteButton" onClick={() => { this.deleteManga(idx) }}>Delete</Button>
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

export default withAuth0(MangaFav);