import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
function TextSummarizationComponent() {
  const [inputLink, setInputLink] = useState('');
  const [summary, setSummary] = useState('');
  const [credibility, setCredibility] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setInputLink(event.target.value);
  };

  const summarizeText = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: inputLink })
    };

    try {
      const response = await fetch("http://192.168.0.56:8080/api/summary", requestOptions);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to summarize text');
      }
      
      setSummary(data.summary);
      setCredibility(data.cred);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSummary('');
      setCredibility('');
    }
  };

  return (
    <div>
        <Input
        type="text"
        placeholder="Enter URL"
        value={inputLink}
        onChange={handleChange}
      />
      <Button onClick={summarizeText}>Summarize</Button>
      {summary && (
        <div>
          <h2>Summary</h2>
          <p>{summary}</p>
          <p>Credibility: {credibility}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default TextSummarizationComponent;
