import axios from "axios";
import { useEffect } from "react";
import Post from "../Post";

export default function HomePage() {
  useEffect(() => {
    axios.get("http://localhost:3001/post").then((response) => {
      response.json().then((posts) => {
        console.log(posts);
      });
    });
  }, []);
  return (
    <>
      <Post />
      <Post />
      <Post />
    </>
  );
}
