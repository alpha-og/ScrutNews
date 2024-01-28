import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/assets/constants";
import { Card, CardContent } from "./ui/card";
function TextSummarizationComponent() {
  const [inputLink, setInputLink] = useState("");
  const [summary, setSummary] = useState("");
  const [credibility, setCredibility] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setInputLink(event.target.value);
  };

  const summarizeText = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: inputLink }),
    };

    try {
      const response = await fetch(`${BASE_URL}summary`, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to summarize text");
      }

      setSummary(data.summary);
      setCredibility(data.cred);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSummary("");
      setCredibility("");
    }
  };

  return (
    <Card className="w-1/2 overflow-y-scroll">
      <CardContent className="flex flex-col gap-2 ">
        <div className="flex flex-row space-x-1">
          <Input
            type="text"
            placeholder="Enter URL"
            value={inputLink}
            onChange={handleChange}
          />
          <Button onClick={summarizeText}>Summarize</Button>
        </div>

        {summary && (
          <div className="h-full">
            <h2>Summary</h2>
            <p className="h-full overflow-y-scroll border">{summary}</p>
            <p className="overflow-y-scroll">Credibility: {credibility}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TextSummarizationComponent;
