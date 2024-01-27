import React, { useState } from 'react';
import './FakeNewsDetector.css'; 

function FakeNewsDetector() {
  const [newsInput, setNewsInput] = useState('');
  const [isFake, setIsFake] = useState(null);

  const detectFakeNews = () => {
    const isFakeNews = Math.random() < 0.5;
    setIsFake(isFakeNews);
  };

  return (
    <div className="fake-news-detector">
      <h1>Fake News Detector</h1>
      <input
        value={newsInput}
        onChange={(e) => setNewsInput(e.target.value)}
        placeholder="Enter news article or headline"
        
        
      />
      <button onClick={detectFakeNews}>Detect</button>
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

export default FakeNewsDetector;