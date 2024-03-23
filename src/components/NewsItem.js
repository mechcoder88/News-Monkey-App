import React from 'react'

const NewsItem = (props) => {

    let { title, description, imgUrl, newsUrl, author, date, source } = props;

    return (
        <div className="my-3">
            <div className="card" >
                {/* Code for Displaying Source */}
                <span className="badge badge-danger" style={{ left: '90%', zIndex: 1 }}>{source}</span>

                <img src={!imgUrl ? "https://www.pngkit.com/png/full/852-8528250_free-news-studio-3d-design-and-breaking-news.png" : imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>

                    <p className="card-text"><small className="text-danger">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()} </small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">See More ....</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
