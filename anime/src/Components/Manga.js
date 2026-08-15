import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button, Row, Form, Container, Col } from 'react-bootstrap';
import './Manga.css';
import { Item } from "better-react-carousel";
import MangaSynopsis from "./MangaSynopsis";
import { withAuth0 } from '@auth0/auth0-react';

// import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Manga extends React.Component {
  constructor(props) {
    super(props);

    // const cachedArr = localStorage.getItem(.mangaArr_last');
    // console.log('cachedArr from localStorage:', cachedArr);
    // const parsedArr = cachedArr ? JSON.parse(cachedArr) : [];
    // console.log('parsedArr length:', parsedArr.length);

    this.state = {
      mangaArr: [],
      mangaFiltered: [],
      postArr: [],
      // show: parsedArr.length > 0 ? true : false,
      show: false,
      filterRated: false,
      showModal: false,
      mangaFav: [],
      page: 1,
      hasNextPage: false,
      lastVisiblePage: 1




    }
  }

  

  mangaApi = (event) => {
    event.preventDefault();
    this.searchQuery = event.target.manga.value;

    this.searchManga(this.searchQuery, 1);

  }


  searchManga = (searchQuery, page) => {

    const url = `http://localhost:3001/searchManga?searchQuery=${searchQuery}&page=${page}`;

    axios.get(url).then(item => {

      this.setState({
        mangaArr: item.data.data,
        show: true,
        page: page,
        hasNextPage: item.data.pagination.has_next_page,
        lastVisiblePage:item.data.pagination.last_visible_page
      })

    })
      .catch(err => {
        console.log(err);

      })
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }



  getPaginationPages = (currentPage, lastVisiblePage) => {
    const pages = [];

    if (lastVisiblePage <= 7) {
        for (let i = 1; i <= lastVisiblePage; i++) {
            pages.push(i);
        }
        return pages;
    }

    pages.push(1);

    if (currentPage > 4) {
        pages.push("...");
    }

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(lastVisiblePage - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (currentPage < lastVisiblePage - 3) {
        pages.push("...");
    }

    pages.push(lastVisiblePage);

    return pages;
};

  handlePageChange=(searchQuery,page)=>{
    this.setState({page},()=>{
      this.searchManga(searchQuery,page);

    })
  }



//   animeFilteredApi = (event) => {
//     event.preventDefault();
//     let searchQuery = event.target.anime.value;

//     let url = `http://localhost:3001/searchSfw?searchQuery=${searchQuery}`;


//     axios.get(url).then(Item => {
//       this.setState({
//     mangaArr: Item.data,
//         show: true,


//       })

//     })
//       .catch(err => {
//         console.log(err);

//       }

//       )
//   }


  favManga = (index) => {

    const { user } = this.props.auth0;

    let favData = {
      email: user.email,
      mal_id:this.state.mangaArr[index].mal_id,
      image_url: this.state.mangaArr[index].image_url,
      title: this.state.mangaArr[index].title,
      synopsis: this.state.mangaArr[index].synopsis,
      type: this.state.mangaArr[index].type,
      chapters: this.state.mangaArr[index].chapters,
      volumes: this.state.mangaArr[index].volumes,
      score: this.state.mangaArr[index].score,
      status: this.state.mangaArr[index].status,
      url: this.state.mangaArr[index].url,
      published:this.state.mangaArr[index].published
    }

    let url = `http://localhost:3001/favManga`
    axios.post(url, favData).then(item => {
      this.setState({
        mangaFav: item.data
      })

    })
      .catch()
  }


  handleClose = () => {
    this.setState({
      showModal: false,
    })
  }

  showSynopsis = (index) => {
    this.setState({
      synopsis: this.state.mangaArr[index].synopsis,
      image_url: this.state.mangaArr[index].image_url,
      title: this.state.mangaArr[index].title,
      type: this.state.mangaArr[index].type,
      chapters: this.state.mangaArr[index].chapters,
      volumes: this.state.mangaArr[index].volumes,
      score: this.state.mangaArr[index].score,
      status: this.state.mangaArr[index].status,
      published: this.state.mangaArr[index].published,

      showModal: true
    })

  }

  filterSfw = (event, checked) => {
    if (checked === true) {

      return this.mangaFilteredApi(event)

    }
    else {
      return this.mangaApi(event)
    }
  }


  render() {

    const { isAuthenticated } = this.props.auth0;

    return (

      <>
        <div className="form-container">
          <br />
          <br />
          <br />
          <center>
            {/* nothing searched yet */}
            {!this.state.show && (
              <h1 className="Intro"> Enjoy searching your favorite Manga here</h1>
            )}

          </center>
          <br />
          <br />
          <br />
          {
            <Form onSubmit={(event) => this.mangaApi(event)} className="mangaSubmit">
              <Form.Group className="mangaForm" controlId="formBasicEmail">
                <Form.Label className="mangaLabel">Manga Name</Form.Label>
                <Form.Control type="text" placeholder="Search your manga here" name="manga" className="searchBar" />
              
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="SFW only" onChange={(e

                ) => this.animeApi(e)} />
              </Form.Group> */}
              <Button variant="primary" size="medium" type="submit" >
                Search
              </Button>
            </Form>
          }

        </div>


        <br />
        <br />
        <br />
        {console.log(this.state.filterRated)}
        {console.log(this.state.mangaArr)

        }
        {console.log(this.state.showModal)}

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
        <center>


          {/* searched but no results */}
          {this.state.show && this.state.mangaArr.length === 0 && (
            <h2>No results found</h2>
          )}

          {



            this.state.show && this.state.mangaArr.length !== 0 && (
              <Container>
                <Row xs={1} sm={2} md={3} lg={4} className="justify-content-center g-4">
                  {this.state.mangaArr.map((manga, idx) => (
                    <Col key={idx} className="d-flex justify-content-center">
                      <Card className="cardManga h-100">

                        <Link to={manga.url}>
                          <Card.Img variant="top" src={manga.image_url} className="mangaImg" />
                        </Link>

                        <Card.Body className="cardBody d-flex flex-column">
                          <Card.Title className="mangaTitle">{manga.title ?? 'N/A'}</Card.Title>
                          {/* 
                          <Card.Text>Anime Type: {anime.type ?? 'N/A'}</Card.Text>
                          <Card.Text>Episodes: {anime.episodes ?? 'N/A'}</Card.Text>
                          <Card.Text>Score: {anime.score ?? 'N/A'}</Card.Text>
                          <Card.Text>Rated: {anime.rated ?? 'N/A'}</Card.Text>


                          <Card.Text>Released Date: {anime.aired ?? 'N/A'}</Card.Text> */}


                          <div className="mt-auto d-flex flex-column gap-2">
                            <Button variant="info" onClick={() => this.showSynopsis(idx)}>
                              Show More..
                            </Button>
                            {isAuthenticated && <Button variant="primary" onClick={() => { this.favManga(idx) }}>Add to Favorite</Button>}
                          </div>

                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            )

            // this.state.show && this.state.mangaArr.length !== 0 ? (
            //   <Row xs={2} md={5}>{


            //     this.state.mangaArr.map((anime, idx) => {
            //       return (

            //         <Card className="cardAnime">
            //           <a href={anime.url}>
            //             <Card.Img variant="top" src={anime.image_url} className="animeImg" />
            //           </a>
            //           <Card.Body className="cardBody">
            //             <Card.Title>{
            //               anime.title}</Card.Title>
            //             {/* <Card.Text>
            //               {anime.synopsis}
            //             </Card.Text> */}



            //             <Card.Text>
            //               <p>Anime Type: {
            //                 anime.type === null ?
            //                   "N/A"
            //                   : anime.type

            //               }</p>
            //             </Card.Text>

            //             <Card.Text>
            //               <p>Episodes: {
            //                 anime.episodes === null ?
            //                   "N/A"
            //                   : anime.episodes
            //               }</p>
            //             </Card.Text>

            //             <Card.Text>
            //               <p>Score: {
            //                 anime.score === null ?
            //                   "N/A"
            //                   : anime.score}</p>
            //             </Card.Text>

            //             <Card.Text>
            //               <p>Rated: {
            //                 anime.rated === null ?
            //                   "N/A"
            //                   : anime.rated}</p>
            //             </Card.Text>
            //             <Button variant="info" onClick={()=>{this.showSynopsis(idx)}}>Show More..</Button>
            //             <br />
            //             <br />

            //             <Button variant="primary">Add to Favorite</Button>


            //           </Card.Body>

            //         </Card>
            //       )
            //     }
            //     )
            //   }
            //   </Row>
            // )
            //   : <h1>No results</h1>
          }


        </center>


        <center>

          {
            this.state.show && this.state.mangaArr.length !== 0 && (
              <nav aria-label="..." className={"paginationNav"}>
                <ul className="pagination">
                  <li className={`page-item ${this.state.page === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => { this.searchAnime(this.searchQuery, this.state.page - 1) }} disabled={(this.state.page === 1)}>Previous</button>
                  </li>
                  {console.log(this.state.lastVisiblePage)
                  }
                  {
                  this.getPaginationPages(this.state.page,this.state.lastVisiblePage).map((page,index)=>
                    (
                      page==="..." ? (
                        <span key={index}>...</span>
                      ):(
                  <li className="page-item active">
                    <button className={`page-link ${page === this.state.page ? "active" : ""} `}
                    key={page}
                    onClick={()=>{this.handlePageChange(this.searchQuery,page)}}
                   
                     >{page}

                    </button>
                  </li>
                      )
                    ))
                  
  }

                  <li className={`page-item ${this.state.hasNextPage === false ? "disabled" : ""}`}>


                    <button className="page-link" onClick={() => { this.searchAnime(this.searchQuery, this.state.page + 1) }} disabled={this.state.hasNextPage === false} >Next</button>

                  </li>
                </ul>
              </nav>
            )
          }
        </center>






      </>

    )

  }
}

export default withAuth0(Manga);

