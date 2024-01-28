import NewsFeed from "@/components/news-feed";
import Summarizer from "@/components/Summarizer";

export default function News() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="absolute w-8/12 h-[36rem] mt-12 p-2 flex flex-row gap-2">
        <NewsFeed />
        <Summarizer />
      </div>
    </div>
  );
}
