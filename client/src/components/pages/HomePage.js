import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../Post";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/post")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);
  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}
