import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";

export default function NewsTitleInput() {
    const [newsInput, setNewsInput] = useState("");
    const [isFake, setIsFake] = useState(null);

    const detectFakeNews = () => {
        axios.post("http://192.168.246.104:8080/model", { text: newsInput })
            .then(response => {
                setIsFake(response.data.trust_value); // Update state with the result from the API
            })
            .catch(error => {
                console.error("Error detecting fake news:", error);
                setIsFake(null); // Set state back to null in case of an error
            });
    };

    return (
        <div className="flex flex-col max-w-lg border">
            <div className="flex flex-row space-x-1">
                <Input
                    value={newsInput}
                    onChange={(e) => setNewsInput(e.target.value)}
                    placeholder="Enter news article or headline"
                />
                <Button onClick={detectFakeNews}>Detect</Button>
            </div>
            {isFake !== null && (
                <div className="result">
                    {isFake ? (
                        <p className="fake text-red-800">This news might be fake!</p>
                    ) : (
                        <p className="legit text-green-800">This news seems legitimate.</p>
                    )}
                </div>
            )}
        </div>
    );
}

