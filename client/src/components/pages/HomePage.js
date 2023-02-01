import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../Post";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:3001/post")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post, index) => <Post key={index} {...post} />)}
      <div className="chat-link">
        <Link className="chat-linked" to={"/chat"}>
          {" "}
          Visit our community chat!
        </Link>
      </div>
    </>
  );
}
