import React from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import { useEffect, useState } from 'react';

import InfiniteScroll from "react-infinite-scroll-component"

import PropTypes from 'prop-types'

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.changeProgress(10); // Data Fetching is going to be started
        const Nurl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`;

        // Till The page Loads the Loading will be true
        setLoading(true);

        let data = await fetch(Nurl);

        props.changeProgress(30); // Data Fetching is Done

        let parsedData = await data.json(); // .json() parse the response as JSON

        props.changeProgress(70); // Data Parsing is Done
        console.log(parsedData);

        // Setting state
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.changeProgress(100); // All Data Loading is Done
    }

    const fetchMoreData = async () => {
        // ? Since "setPage(page+1)" is an asynchronous function, it is taking more time time to set the page. To cope up with this error, manual update of page is done in the "Nurl" & "setPage(page+1)" is shifted to next line so that it takes its time to update.

        const Nurl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pagesize}`;

        setPage(page + 1);

        let data = await fetch(Nurl);
        let parsedData = await data.json(); // .json() parse the response as JSON
        console.log(parsedData);

        // Setting state
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    }

    useEffect(() => {
        document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`;
        updateNews();
    }, []);

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>

            {/* Loading Gif Code */}
            {loading && <Spinner />}

            {/* Infinite Scroll Code */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container my-3">
                    <div className="row">
                        {articles.map((element, index) => {
                            return <div className="col-md-4" key={index}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}
News.defaultProps = {
    country: 'in',
    pagesize: 5,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
}

export default News
