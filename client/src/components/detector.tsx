import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { BASE_URL } from "@/assets/constants";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CgDanger } from "react-icons/cg";
import { LuCheck } from "react-icons/lu";
import { Card, CardContent } from "./ui/card";

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [isFake, setIsFake] = useState<boolean | null>(null);

  const detectFakeNews = () => {
    axios
      .post(BASE_URL, { text: query })
      .then((response) => {
        console.log(response);
        setIsFake(response.data.trust_value); // Update state with the result from the API
      })
      .catch((error) => {
        console.error("Error detecting fake news:", error);
        setIsFake(null); // Set state back to null in case of an error
      });
  };

  return (
    <Card className="w-[50%]">
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-row space-x-1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter news article or headline"
          />
          <Button onClick={detectFakeNews}>Detect</Button>
        </div>

        {isFake !== null && (
          <div className="">
            {!isFake ? (
              <Alert variant={"destructive"}>
                <div className="mb-1 flex flex-row items-center">
                  <CgDanger size={18} />
                  <AlertTitle className="pl-2">Warning</AlertTitle>
                </div>
                <AlertDescription>This news might be fake!</AlertDescription>
              </Alert>
            ) : (
              <Alert variant={"positive"}>
                <div className="mb-1 flex flex-row items-center">
                  <LuCheck size={18} />
                  <AlertTitle className="pl-2">Feedback</AlertTitle>
                </div>
                <AlertDescription>This news seems accurate</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
