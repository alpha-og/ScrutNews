import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function NewsTitleInput() {
  const [newsInput, setNewsInput] = useState("");
  const [isFake, setIsFake] = useState<boolean>(false);
  // const
  const detectFakeNews = () => {
    const isFakeNews = Math.random() < 0.5;
    setIsFake(isFakeNews);
  };

  return (
    <div className="fake-news-detector">
      <h1>Fake News Detector</h1>
      <Input
        value={newsInput}
        onChange={(e) => setNewsInput(e.target.value)}
        placeholder="Enter news article or headline"
      />
      <Button onClick={detectFakeNews}>Detect</Button>
      {isFake !== null && (
        <div className="result">
          {isFake ? (
            <p className="fake">This news might be fake!</p>
          ) : (
            <p className="legit">This news seems legitimate.</p>
          )}
        </div>
      )}
    </div>
  );
}

