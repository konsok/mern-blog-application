import axios from "axios";
import { format } from "date-fns/esm";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/post/${id}`)
      .then((response) => setPostInfo(response.data))
      .catch((error) => console.error(error));
  }, []);

  if (!postInfo) return null;

  async function deletePost() {
    const response = await fetch(`http://localhost:3001/post/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) return <Navigate to={`/`} />;

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{format(new Date(postInfo.createdAt), "MMM do, yyyy HH:mm")}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            Edit
          </Link>
          <button className="delete-btn" onClick={deletePost}>
            Delete Post
          </button>
        </div>
      )}
      {userInfo.username === "admin" && (
        <div className="edit-row">
          <button className="delete-btn" onClick={deletePost}>
            Delete Post
          </button>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:3001/${postInfo.cover}`} alt="" />
      </div>
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
}
