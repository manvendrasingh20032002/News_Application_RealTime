import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import NewsItem from '../Components/NewsItem'
 import InfiniteScroll from 'react-infinite-scroll-component';

export default function HomePage() {
  let [page, setPage] = useState(1)
  let [articles, setArticles] = useState([])
  let [totalResults, setTotalResults] = useState(0)
  let [allArticles, setAllArticles] = useState([])
  let [q, setQ] = useState("")
  let [language, setLanguage] = useState("")
  let [searchParams] = useSearchParams()

  async function getAPIData(q, langauge) {
    const query = q || "ALL";
    let category = "general";
    let filterText = "";
    
    const lowerQuery = query.toLowerCase().trim();
    if (lowerQuery === "politics" || lowerQuery === "crime" || lowerQuery === "education" || lowerQuery === "world" || lowerQuery === "india" || lowerQuery === "jokes" || lowerQuery === "all" || lowerQuery === "") {
      category = "general";
    } else if (lowerQuery === "science") {
      category = "science";
    } else if (lowerQuery === "technologys" || lowerQuery === "technology") {
      category = "technology";
    } else if (lowerQuery === "sports") {
      category = "sports";
    } else if (lowerQuery === "entertainment") {
      category = "entertainment";
    } else if (lowerQuery === "economics" || lowerQuery === "business") {
      category = "business";
    } else {
      category = "general";
      filterText = lowerQuery;
    }

    let country = "us";
    if (langauge === "hi") country = "in";
    else if (langauge === "en") country = "us";
    else if (langauge === "fr") country = "fr";
    else if (langauge === "es") country = "us";
    else if (langauge === "de") country = "us";

    try {
      let response = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${category}/${country}.json`)
      let data = await response.json()
      if (data && data.articles) {
        let fetchedArticles = data.articles.filter(article => article.title && article.url);

        if (filterText) {
          fetchedArticles = fetchedArticles.filter(article => 
            (article.title && article.title.toLowerCase().includes(filterText)) ||
            (article.description && article.description.toLowerCase().includes(filterText))
          );
        }

        setAllArticles(fetchedArticles)
        setTotalResults(fetchedArticles.length)
        setArticles(fetchedArticles.slice(0, 24))
        setPage(1)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchData() {
    const nextPage = page + 1;
    setPage(nextPage);
    const startIndex = (nextPage - 1) * 24;
    const endIndex = startIndex + 24;
    const nextArticles = allArticles.slice(startIndex, endIndex);
    setArticles(articles.concat(nextArticles));
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
