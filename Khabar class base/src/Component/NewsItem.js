import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    let {title, description, imgUrl, newsUrl, date, author} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
          <img src={imgUrl} className="card-img-top" alt="..." style={{height:"12rem"}} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author=== null?'Unknown':author} <br/> On {new Date(date).toGMTString()}</small></p>

            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem