import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  content,
  cover,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"https://localhost:3001/" + cover} alt="" />
        </Link>
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <span className="author">{author.username}</span>
          <time>{format(new Date(createdAt), "MMM do, yyyy HH:mm")}</time>
        </p>
        <p className="description">{summary}</p>
      </div>
    </div>
  );
}
