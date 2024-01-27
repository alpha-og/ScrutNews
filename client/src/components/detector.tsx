import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function NewsTitleInput() {
    const [newsInput, setNewsInput] = useState<string>("");
    const [isFake, setIsFake] = useState<boolean>(false);

    const detectFakeNews = () => {
        const isFakeNews = Math.random() < 0.5;
        setIsFake(isFakeNews);
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
                        <p className="fake text-red-800" >This news might be fake!</p>
                    ) : (
                        <p className="legit text-green-800">This news seems legitimate.</p>
                    )}
                </div>
            )}
        </div>
    );
}
