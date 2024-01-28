import 
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import InfiniteScroll from 'react-infinite-scroll-component';

function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  async function getNewsData() {
    setLoading(true);
    try {
      const resp = await axios.get(`http://192.168.0.56:8080/api/news?page=${page}`);
      setNewsData(prevData => [...prevData, ...resp.data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      setError("Failed to fetch news data. Please try again later.");
    }
    setLoading(false);
  }

  useEffect(() => {
    getNewsData();
  }, []);

  const fetchMoreData = () => {
    getNewsData();
  };

  return (
    <div className="w-full flex flex-wrap">
      <header className="News-header">
        <InfiniteScroll
          dataLength={newsData.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {newsData.map((newsItem, index) => (
            <Card className="flex justify-content-center w-full" key={index}>
              <a href={newsItem.url} target="_blank" rel="noopener noreferrer">                
                <div className='flex '>
                  <img className="flex-shrink-1 w-12 h-12" src={newsItem.image_url}/>
                  <div className='flex-grow-1'>
                    <CardTitle className="my-3">{newsItem.title}</CardTitle>
                    <CardDescription>
                      {newsItem.description}
                    </CardDescription>
                  </div>
                </div>
              </a>
            </Card>
          ))}
        </InfiniteScroll>
      </header>
    </div>
  );
}

export default News;
