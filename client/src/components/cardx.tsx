
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  
function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getNewsData() {
    setLoading(true);
    try {
      const resp = await axios.get("https://newsapi.org/v2/everything?q=trade&apiKey=b738ed2669c54125aae96fba7c1107d5&pageSize=10");
      setNewsData(resp.data.articles);
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
        
         
            {newsData.map((newsItem, index) => (
              <Card className="d-flex justify-content-center" key={index}>
                
              <a href={newsItem.url} target="_blank" rel="noopener noreferrer">                
                 <div className='flex '><img className="flex-shrink-1 w-12 h-12" src={newsItem.urlToImage}/>
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
