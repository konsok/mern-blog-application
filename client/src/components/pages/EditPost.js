import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Editor from "../Editor";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Navigate to="/" />;

  function updatePost(ev) {
    ev.preventDefault();
  }

  return (
    <form onSubmit={updatePost} encType="multipart/form-data">
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button>Create Post</button>
    </form>
  );
}
