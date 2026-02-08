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

  async function getAPIData(q, langauge) {
    let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&pageSize=24&language=${langauge}&sortBy=publishedAt&apiKey=6ebd28bfe2cf43818b8d10da03af90a3`)
    response = await response.json()
    if (response.status === "ok") {
      setArticles(response.articles)
      setTotalResults(response.totalResults)
    }
  }

  async function fetchData() {
    setPage(page + 1)
    let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&pageSize=24&page=${page}&language=${language}&sortBy=publishedAt&apiKey=6ebd28bfe2cf43818b8d10da03af90a3`)
    response = await response.json()
    if (response.status === "ok") {
      setArticles(articles.concat(response.articles))
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
