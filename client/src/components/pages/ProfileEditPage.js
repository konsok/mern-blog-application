import React, { useContext, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

export default function ProfileEditPage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = React.useState(false);
  const [password, setPassword] = React.useState(userInfo?.password);

  const id = userInfo?.id;
  // const username = userInfo?.username;c

  useEffect(() => {
    fetch(`http://localhost:3001/profile/${id}`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  async function changePassword(ev) {
    ev.preventDefault();
    const data = {
      password: password,
    };

    console.log(data);

    const response = await fetch(`http://localhost:3001/edit-profile/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/profile/${id}`} />;
  }

  return (
    <form className="register" onSubmit={changePassword}>
      <h1>Change Password:</h1>
      <input
        type="password"
        placeholder="new password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Update</button>
    </form>
  );
}
