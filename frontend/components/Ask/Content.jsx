import React from "react";
import styles from "./Content.module.css";
import QuestionCard from "./QuestionCard";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import TrendingToolsList from '@/components/ui/TrendingToolsList';


import { v4 as uuid } from "uuid";
const Content = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");


 
  React.useEffect(() => {
    
  }, []);
  


  return (
    <div className="gap-2">
      {/* <Label htmlFor="message">Recommendation Query title</Label> */}
      <p className=" text-muted-foreground text-bold">
        Recommendation Query title:
      </p>
      <Textarea placeholder="Type your message here." />
      <div className={styles.Content__postQuestion}>
       <button>
            ASK A PRODUCT RECOMMENDATION
          </button>
    </div>
    <div className="mt-3 text-orange-400">
          Some Related Products<b className="text-orange-400">👇</b>
    </div>
    <TrendingToolsList />

    </div>
    
);
};

export default Content;
