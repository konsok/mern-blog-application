import React, { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // async function register(ev) {
  //   ev.preventDefault();
  //   const response = await fetch("http://localhost:3001/register", {
  //     method: "POST",
  //     body: JSON.stringify({ username, password }),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   if (response.status === 200) {
  //     alert("registration successful");
  //   } else {
  //     alert("registration failed");
  //   }
  // }
  //   przy uzyciu axios

  async function register(ev) {
    ev.preventDefault();
    try {
      await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
      alert("Successfully registered");
    } catch (error) {
      alert("Failed to register");
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
