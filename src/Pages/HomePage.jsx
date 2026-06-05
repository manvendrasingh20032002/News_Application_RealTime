import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import NewsItem from '../Components/NewsItem'
 import InfiniteScroll from 'react-infinite-scroll-component';

export default function HomePage() {
  let [page, setPage] = useState(1)
  let [articles, setArticles] = useState([])
  let [totalResults, setTotalResults] = useState(0)
  let [q, setQ] = useState("")
  let [language, setLanguage] = useState("")
  let [searchParams] = useSearchParams()

  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  async function getAPIData(q, langauge) {
    setPage(1)
    const apiKey = "6ebd28bfe2cf43818b8d10da03af90a3";
    const url = isLocalhost
      ? `https://newsapi.org/v2/everything?q=${q}&pageSize=24&language=${langauge}&sortBy=publishedAt&apiKey=${apiKey}`
      : `/api/news?q=${encodeURIComponent(q)}&pageSize=24&language=${langauge}`;

    try {
      let response = await fetch(url)
      let data = await response.json()
      if (data && data.status === "ok") {
        setArticles(data.articles || [])
        setTotalResults(data.totalResults || 0)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchData() {
    const nextPage = page + 1;
    setPage(nextPage);
    const apiKey = "6ebd28bfe2cf43818b8d10da03af90a3";
    const url = isLocalhost
      ? `https://newsapi.org/v2/everything?q=${q}&pageSize=24&page=${nextPage}&language=${language}&sortBy=publishedAt&apiKey=${apiKey}`
      : `/api/news?q=${encodeURIComponent(q)}&pageSize=24&page=${nextPage}&language=${language}`;

    try {
      let response = await fetch(url)
      let data = await response.json()
      if (data && data.status === "ok") {
        setArticles(articles.concat(data.articles || []))
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  }

  useEffect(() => {
    let q = searchParams.get("q") ?? "ALL"
    let language = searchParams.get("language") ?? "hi"
    setQ(q)
    setLanguage(language)
    getAPIData(q, language)
  }, [searchParams])

  return (
    <>
      <div className='container-fluid my-3'>
        <h5 className='text-center p-2 bg-primary text-light text-capitalize'>{q}News Articles</h5>
        <InfiniteScroll
          dataLength={articles.length}          // this is important field to render the next data
          next={fetchData}
          hasMore={articles.length < totalResults}
          loader={<div className="m-2 text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden alignItem-center">Loading.....</span>
            </div>
          </div>
          }
        >
          <div className='row'>
            {
              articles.map((item, index) => {
                return <NewsItem
                  key={index}
                  source={item.source?.name}
                  title={item.title}
                  description={item.description}
                  date={item.publishedAt}
                  pic={item.urlToImage}
                  url={item.url}
                />
              })
            }
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}
