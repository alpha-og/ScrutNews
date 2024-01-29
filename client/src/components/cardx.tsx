
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

  async function getNewsData() {
    setLoading(true);
    try {
      const resp = await axios.get("http://192.168.0.104:8080/fetch_news");
      setNewsData(resp.data);
    } catch (error) {
      setError("Failed to fetch news data. Please try again later.");
    }
    setLoading(false);
  } useEffect(() => {
    getNewsData();
  }, []);

  return (
    <div className="w-full flex flex-wrap">
      <header className="News-header">
      <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
        
         
            {newsData.map((newsItem, index) => (
              <Card className="flex justify-content-center w-full" key={index}>
                
              <a href={newsItem.url} target="_blank" rel="noopener noreferrer">                
                 <div className='flex '><img className="flex-shrink-1 w-12 h-12" src={newsItem.image_url}/>
                  <div className='flex-grow-1'><CardTitle className="my-3">{newsItem.title}</CardTitle>
                  
                  <CardDescription>
                  {newsItem.description}
                  </CardDescription>
                  </div></div>
              </a>
              </Card>
            
            ))}
         
        
      </header>
    </div>
  );
}

export default News;
