import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  // Setting the defalut props 
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  // setting the props type
  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };

  // function for capitalize first letter
  caplitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

// setting a constructor
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    // setting up the page title
    document.title = `${this.caplitalizeFirstLetter(
      this.props.category
    )} - KHABAR`;
  }

  // updating news according to user actions
  async updateNews(pageNo) {
    // setting up the progress bar 
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize} `;
    this.setState({ loading: true });
    // fetching up the data in json 
    let data = await fetch(url);
    this.props.setProgress(30)
    // parsing the json file
    let parsedData = await data.json();
    this.props.setProgress(50)

    console.log(parsedData);
    
    // setState according to parsed data
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,

    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4bfdc145224f48c6aea4289af89c7155&pageSize=${this.props.pageSize} `
    // this.setState({ loading: true })
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // console.log(parsedData)
    // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

    this.updateNews();
  }

  // handlePrevClick = async () => {
  //   // console.log('prev clicked')
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4bfdc145224f48c6aea4289af89c7155&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
  //   // this.setState({loading:true})

  //   // let data = await fetch(url)
  //   // let parsedData = await data.json()
  //   // console.log(parsedData)
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false

  //   // })

  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   // console.log('Next clicked')
  //   //   if (!(this.state.page+1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

  //   //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4bfdc145224f48c6aea4289af89c7155&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
  //   //         this.setState({loading:true})
  //   //         let data = await fetch(url)
  //   //         let parsedData = await data.json()
  //   //         console.log(parsedData)
  //   //         this.setState({
  //   //           page: this.state.page + 1,
  //   //           articles: parsedData.articles,
  //   //           loading: false

  //   //     })

  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // }



// fetching data if it exist 
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize} `;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,

    });

  };

  render() {
    return (
      // Code for loading next and prev page

      // <div className='container my-3'>
      //   <h2 className='text-center'> KHABAR - Top    {this.caplitalizeFirstLetter(this.props.category)} Headlines </h2>
      //   {this.state.loading && <Spinner />}
      //   <div className='row'>
      //     {!this.state.loading && this.state.articles.map((elemet) => {
      //       return <div className='col-md-3' key={elemet.url}>
      //         <NewsItem title={elemet.title ? elemet.title.slice(0, 50) : ""} description={elemet.description ? elemet.description.slice(0, 70) : ''} imgUrl={elemet.urlToImage ? elemet.urlToImage : 'https://th.bing.com/th/id/OIP.K8urvQKqHarydD5ixvdQBAHaFI?pid=ImgDet&rs=1'} newsUrl={elemet.url ? elemet.url : ''} author={elemet.author} date={elemet.publishedAt} />
      //       </div>

      //     })}

      //     <div className="container d-flex justify-content-between ">
      //       <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} > &larr; Previous</button>
      //       <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} > Next &rarr; </button>

      //     </div>
      //   </div>
      // </div>

      <div className="container my-3">
        <h2 className="text-center">
          {" "}
          KHABAR - Top {this.caplitalizeFirstLetter(this.props.category)}{" "}
          Headlines{" "}
        </h2>
        {/* spinner will only run if this.state.loading is true else it will skip */}
        {this.state.loading && <Spinner />}

      {/* Setting up the infinite scroll */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          // This will call the fetchMoreData function everytime user hit to the bottom 
          next={this.fetchMoreData}
          // this will check if we have more data to fetch or not 
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">

            <div className="row">
              {this.state.articles.map((elemet, index) => {
                return (
                  <div className="col-md-3" key={index}>
                    <NewsItem
                      title={elemet.title ? elemet.title.slice(0, 50) : ""}
                      description={
                        elemet.description ? elemet.description.slice(0, 70) : ""
                      }
                      imgUrl={
                        elemet.urlToImage
                          ? elemet.urlToImage
                          : "https://th.bing.com/th/id/OIP.K8urvQKqHarydD5ixvdQBAHaFI?pid=ImgDet&rs=1"
                      }
                      newsUrl={elemet.url ? elemet.url : ""}
                      author={elemet.author}
                      date={elemet.publishedAt}
                    />
                  </div>

                );
              })}
            </div>
          </div>
        </InfiniteScroll>



        {/* // for previous and next button */}

        {/* <div className="container d-flex justify-content-between ">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;{" "}
          </button>
        </div> */}




      </div>
    );
  }
}

export default News;
