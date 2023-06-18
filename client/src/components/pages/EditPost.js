import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
// import axios from "axios";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function EditPost() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [cover, setCoevr] = useState("");
  const [redirect, setRedirect] = useState(false);

  //   useEffect(() => {
  //     async function fetchPost() {
  //       const response = await axios.get(`https://localhost:3001/post/${id}`);
  //       setTitle(response.data.title);
  //       setSummary(response.data.summary);
  //       setContent(response.data.content);
  //     }
  //     fetchPost();
  //   });
  useEffect(() => {
    fetch("http://localhost:3001/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  //   async function updatePost(ev) {
  //     ev.preventDefault();
  //     const data = new FormData();
  //     data.set("title", title);
  //     data.set("summary", summary);
  //     data.set("content", content);
  //     data.set("id", id);
  //     if (files?.[0]) data.set("file", files?.[0]);

  //     await axios.put(`https://localhost:3001/post/${id}`, data, {
  //       credentials: "include",
  //     });
  //     setRedirect(true);
  //   }
  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:3001/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) return <Navigate to={`/post/${id}`} />;

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
      <ReactQuill
        value={content}
        onChange={(newValue) => setContent(newValue)}
        modules={modules}
        formats={formats}
      />
      <button>Update Post</button>
    </form>
  );
}
