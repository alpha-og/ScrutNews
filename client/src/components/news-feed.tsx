import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import InfiniteScroll from "react-infinite-scroll-component";
import { BASE_URL } from "@/assets/constants";
import { CiImageOff } from "react-icons/ci";

type responseData = {
  ai_region?: "ONLY AVAILABLE IN CORPORATE PLANS";
  ai_tag?: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS";
  article_id: string;
  category: string[];
  content?: "ONLY AVAILABLE IN PAID PLANS";
  country: string[];
  creator: string[];
  cred: "NotMeasurable";
  description: null | string;
  image_url: string;
  keywords: null | string[];
  language: "english";
  link: string;
  pubDate: string;
  sentiment?: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS";
  sentiment_stats?: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS";
  source_id: string;
  source_priority: number;
  source_url: string;
  title: string;
  video_url: null | string;
};

export default function NewsFeed() {
  const [newsData, setNewsData] = useState<responseData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  async function getNewsData() {
    setLoading(true);
    try {
      const resp = await axios.get(`${BASE_URL}news?page=${page}`);
      setNewsData((prevData) => [...prevData, ...resp.data]);
      setPage((prevPage) => prevPage + 1);
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
    
      <Card className="w-full flex flex-col h-2/6 ">
        <CardTitle className="text-lg text-center border ">News Feed</CardTitle>
        <div className="h-[calc(100vh-4rem)] overflow-y-scroll">
          <InfiniteScroll
            dataLength={newsData.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            className="flex flex-col gap-2"
          >
            {newsData.map((newsItem, index) => (
              <a
                href={newsItem.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <Card className="flex gap-2 items-center w-max h-24">
                  {newsItem ? (
                    <img
                      className="flex-shrink-1 w-12 h-12"
                      src={newsItem.image_url}
                    />
                  ) : (
                    <CiImageOff />
                  )}
                  <div className="flex flex-col w-[36rem]">
                    <CardTitle className="my-3">{newsItem.title}</CardTitle>
                    <CardDescription className="truncate">
                      {newsItem.description}
                    </CardDescription>
                  </div>
                </Card>
              </a>
            ))}
          </InfiniteScroll>
        </div>
      </Card>
    
  );
}

