import SearchBar from "@/components/detector";
import News from "../components/news-feed";
export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <div>
        <h1 className="text-7xl font-semibold">ScrutNews</h1>
        <p className="text-center ">Scrutinize. News</p>
      </div>
      <SearchBar />
    </div>
  );
}
