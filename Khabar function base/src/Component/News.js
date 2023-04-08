import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=> {



  // function for capitalize first letter
  const caplitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

const [articles, setArticles] = useState([])
const [loading, setLoading] = useState(true)
const [page, setPage] = useState(1)
const [totalResult, setTotalResult] = useState(0)

 
    // setting up the page title
    document.title = `${caplitalizeFirstLetter(
      props.category
    )} - KHABAR`;


    
  // updating news according to user actions
  const updateNews = async(pageNo)=> {
    // setting up the progress bar 
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize} `;
    setLoading(true);
    // fetching up the data in json 
    let data = await fetch(url);
    props.setProgress(30)
    // parsing the json file
    let parsedData = await data.json();
    props.setProgress(50)

    console.log(parsedData);
    
    // setState according to parsed data

    setArticles(parsedData.articles)
    setTotalResult(parsedData.totalResults)
    setLoading(false)

    
    props.setProgress(100)
  }
useEffect(() => {
  updateNews();
  
}, [])



// fetching data if it exist 
  const fetchMoreData = async () => {
    setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize} `;
    let data = await fetch(url);

    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResult(parsedData.totalResults)
  };

  
    return (


      <div className="container my-3">
        <h2 className="text-center" style={{margin: "35px, 0px", marginTop: '90px'}} >
          {" "}
          KHABAR - Top {caplitalizeFirstLetter(props.category)}{" "}
          Headlines{" "}
        </h2>
        {/* spinner will only run if loading is true else it will skip */}
        {loading && <Spinner />}

      {/* Setting up the infinite scroll */}
        <InfiniteScroll
          dataLength={articles.length}
          // This will call the fetchMoreData function everytime user hit to the bottom 
          next={fetchMoreData}
          // this will check if we have more data to fetch or not 
          hasMore={articles.length !== totalResult}
          loader={<Spinner />}
        >
          <div className="container">

            <div className="row">
              {articles.map((elemet, index) => {
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




      </div>
    );
}
  // Setting the defalut props 
  News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  // setting the props type
News.propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };

export default News;
