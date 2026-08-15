import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
// import Carousel from 'better-react-carousel';
import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotAnime: [],
      topAiring: [],
      recentAnime: [],
      topManga: [],
      topComedyAnime: [],
      index: 0,
      cardsPerSlide: 5,

    };
  }


  formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  topAnime = () => {
    let url = `${process.env.REACT_APP_SERVER_URL}/topAnime`;
    // const cached = localStorage.getItem('hotAnime');
    //   if (cached) {
    //     this.setState({ hotAnime: JSON.parse(cached) });
    //     return;
    //   }

    // let url = `http://localhost:3001/topAnime`;
    axios.get(url).then((item) => {
      // localStorage.setItem('hotAnime', JSON.stringify(item.data));
      this.setState({
        hotAnime: item.data,

      });
    }).catch(error => console.error('Axios Error:', error.message));


  };

  airingAnime = () => {

    
    // let url = `http://localhost:3001/topAiring`

     let url = `${process.env.REACT_APP_SERVER_URL}/topAiring`

    axios.get(url).then((item) => {
      this.setState({
        topAiring: item.data,
      });

    }).catch(error => console.error('Axios Error:', error.message));
  }

  newAnime = () => {
    let url = `${process.env.REACT_APP_SERVER_URL}/recentAnime`;
    // const cached = localStorage.getItem('recentAnime');
    //   if (cached) {
    //     this.setState({ recentAnime: JSON.parse(cached) });
    //     return;
    //   }

    // let url = `http://localhost:3001/recentAnime`;
    axios.get(url).then((item) => {
      // localStorage.setItem('recentAnime', JSON.stringify(item.data));
      this.setState({
        recentAnime: item.data,
      });
    }).catch(error => console.error('Axios Error:', error.message));
  };

  hotManga = () => {
    let url = `${process.env.REACT_APP_SERVER_URL}/topManga`;
    //   const cached = localStorage.getItem('topManga');
    // if (cached) {
    //   this.setState({ topManga: JSON.parse(cached) });
    //   return;
    // }

    // let url = `http://localhost:3001/topManga`;
    axios.get(url).then((item) => {
      // localStorage.setItem('topManga', JSON.stringify(item.data));
      this.setState({
        topManga: item.data,
      });
    }).catch(error => console.error('Axios Error:', error.message));
  };



  topComedy = () => {
    let url=`${process.env.REACT_APP_SERVER_URL}/comedyAnime`;
    // const cached = localStorage.getItem('topComedyAnime');
    //   if (cached) {
    //     this.setState({ topComedyAnime: JSON.parse(cached) });
    //     return;
    //   }

    // let url = `http://localhost:3001/comedyAnime`;
    axios.get(url).then((item) => {
      // localStorage.setItem('topComedyAnime', JSON.stringify(item.data));
      this.setState({
        topComedyAnime: item.data,
      });
    }).catch(error => console.error('Axios Error:', error.message));
  };

  updateCardPerSlide = () => {
    let cards = 5;

    if (window.innerWidth < 576) {
      cards = 1;
    } else if (window.innerWidth < 768) {
      cards = 2;
    } else if (window.innerWidth < 992) {
      cards = 3;
    } else if (window.innerWidth < 1200) {
      cards = 4;
    }
    if (cards !== this.state.cardsPerSlide) {
      this.setState({
        cardsPerSlide: cards
      })
    }
  }

  //this used to refresh the cards whenever I opened ths site
  componentDidMount() {

    this.updateCardPerSlide();
    window.addEventListener("resize", this.updateCardPerSlide);
    setTimeout(() => {
      this.topAnime();
      this.newAnime();
      this.hotManga();
      this.airingAnime();
      this.topComedy();

    }, 0);
    console.log("helloo");
    console.log("how are you")
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateCardPerSlide);
  }



  chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // componentDidMount() {
  //   setTimeout(() => this.topAnime(), 0);
  //   setTimeout(() => this.newAnime(), 1000);  // Delay 1s
  //   setTimeout(()=>this.airingAnime(),2000)
  // setTimeout(() => this.hotManga(), 3000);
  // setTimeout(() => this.topComedy(), 4000);


  //   console.log("helloo");
  //   console.log("how are you");
  // };


  handleSelect = (selectIndex) => {
    this.setState({ index: selectIndex });
  };

  // const fetchWithRetry = async (apiFunction, retries = 3, delay = 1000) => {
  //   for (let i = 0; i < retries; i++) {
  //     try {
  //       return await apiFunction();
  //     } catch (error) {
  //       if (error.response?.status === 429 && i < retries - 1) {
  //         console.warn(`Rate limited! Retrying in ${delay}ms...`);
  //         await new Promise((res) => setTimeout(res, delay));
  //       } else {
  //         throw error; // Throw other errors immediately
  //       }
  //     }
  //   }
  // };

  // async componentDidMount() {
  //   await fetchWithRetry(this.topAnime);
  //   await fetchWithRetry(this.newAnime);
  //   await fetchWithRetry(this.hotManga);
  //   await fetchWithRetry(this.topComedy);
  // }
  // componentWillUnmount() {
  //   clearTimeout(this.timeout); // Clears timeout when unmounting
  // }

  render() {
    const { index } = this.state;
    const recentAnimeSlides = this.chunkArray(this.state.recentAnime, this.state.cardsPerSlide); //shows the number of cards depends on the size of the screen
    const topMangaSlides = this.chunkArray(this.state.topManga, this.state.cardsPerSlide) //shows the number of cards depends on the size of the screen
    const topComedySlides = this.chunkArray(this.state.topComedyAnime, this.state.cardsPerSlide)//shows the number of cards depends on the size of the screen
    const topAiringAnimeSlides = this.chunkArray(this.state.topAiring, this.state.cardsPerSlide) //shows the number of cards depends on the size of the screen
    return (
      <>
      {console.log("Origin:", window.location.origin)}
        {
          <center>

            <Carousel activeIndex={index} onSelect={this.handleSelect} loop className="hotAnime">
              {this.state.hotAnime.map((image) => {
                return (
                
                  <Carousel.Item>
                    
                    <a href={image.url}>


                      <h3 className="title">{image.title}</h3>


                      <img
                        className="images"
                        src={


                          image.image_url




                        }
                        alt={image.title}

                      />


                    </a>
                  </Carousel.Item>
                );
              })}
            </Carousel>

          </center>
        }

        <br />
        <br />
        <hr style={{ border: "1px solid #BFA2D" }} />
        

          <h2  className="homeTitle">Upcoming Anime</h2>
     
        <hr style={{ border: "1px solid #BFA2D" }} />
        <br />

        {


          <Carousel interval={3000} loop >
            {recentAnimeSlides.map((group, idx) => {
              return (

                <Carousel.Item key={idx}>
                  <div className="multi-slide">
                    {group.map((item, i) => {
                      return (

                        <div className="photo-item" key={i}>




                          <a href={item.url}>


                            <div className="image-container">
                              <img


                                src={


                                  item.image_url




                                }
                                alt={item.title}


                              />

                            </div>
                            <h5 className="recentAnime">{item.title}</h5>

                            {item.aired && (
                              <h6 className="recentDate">
                                Release Date: {item.aired}
                              </h6>
                            )}
                            <br />
                          </a>
                        </div>
                      )
                    })}
                  </div>



                </Carousel.Item>

              )
            })}
          </Carousel>


        };

        <br />
        <br />


        <h2 className="homeTitle">Airing Anime</h2>

        <hr style={{ border: "1px solid #BFA2D" }} />
        <br />

        {


          <Carousel interval={3000} loop>
            {topAiringAnimeSlides.map((group, idx) => {
              return (

                <Carousel.Item key={idx}>
                  <div className="multi-slide">
                    {group.map((item, i) => {
                      return (

                        <div className="photo-item" key={i}>




                          <a href={item.url}>

                            <div className="image-container">

                              <img


                                src={


                                  item.image_url




                                }
                                alt={item.title}


                              />
                            </div>


                            <h5 className="recentAnime">{item.title}</h5>

                            {item.aired && (
                              <h6 className="recentDate">
                                Released Date: {item.aired}
                              </h6>
                            )}

                            {item.episodes && (
                              <h6 className="recentDate">
                                Episodes: {item.episodes}
                              </h6>
                            )}



                            <br />
                          </a>
                        </div>
                      )
                    })}
                  </div>



                </Carousel.Item>

              )
            })}
          </Carousel>


        };





        <br />


        <h2 className="homeTitle">Top Manga</h2>
        <hr style={{ border: "1px solid #BFA2D" }} />
        <br />

        {


          <Carousel interval={3000} loop >
            {topMangaSlides.map((group, idx) => {
              return (


                <Carousel.Item key={idx}>
                  <div className="multi-slide">
                    {
                      group.map((item, i) => {
                        return (

                          <div className="photo-item" key={i}>
                            <a href={item.url}>
                              <div className="image-container">
                                <img


                                  src={


                                    item.image_url




                                  }
                                  alt={item.title}


                                />
                              </div>

                              <h5 className="recentAnime">{item.title}</h5>
                            </a>
                          </div>
                        )
                      }
                      )

                    }
                  </div>
                </Carousel.Item>

              )
            })}
          </Carousel>


        }
        <br />
        <br />




        <h2 className="homeTitle">Top Comedy</h2>
        <hr style={{ border: "1px solid #BFA2D" }} />
        <br />

        {


          <Carousel interval={3000} loop >
            {topComedySlides.map((group, idx) => {
              return (
                <Carousel.Item key={idx}>
                  <div className="multi-slide">
                    {
                      group.map((item, i) => {
                        return (
                          <div className="photo-item" key={i}>
                            <a href={item.url}>
                              <div className="image-container">
                                <img


                                  src={

                                    item.image_url

                                  }
                                  alt={item.title}


                                />
                              </div>

                              <h5 className="recentAnime">{item.title}</h5>
                            </a>
                          </div>
                        )
                      }
                      )

                    }
                  </div>
                </Carousel.Item>

              )
            })}
          </Carousel>


        }
        <br />
        <br />

      </>
    );
  }
}

export default withAuth0(Home);
// export default Home;

/*               
                 <Card style={{ width: "30rem" }} className="cards">
                   <Carousel cols={1} rows={1} gap={10} loop>
                     {this.state.topAnime.map((item) => {
                       return (
                         <Carousel.Item>
                           <Card.Header name="name" style={{color:'white'}}>{item.title}</Card.Header>
                          
                             <img
                               name="name"
                               className="d-block w-100"
                               alt={item.title}
                               src={item.image_url}
                              
                             />
                          
                         </Carousel.Item>
                       );
                     })}
                   </Carousel>
                 </Card> */
