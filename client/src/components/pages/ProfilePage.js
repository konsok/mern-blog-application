import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = React.useState(false);

  //   const { id } = useParams();
  const id = userInfo?.id;

  useEffect(() => {
    fetch(`http://localhost:3001/profile/${id}`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  async function deleteUser() {
    const response = await fetch(`http://localhost:3001/profile/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      setUserInfo(null);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  const username = userInfo?.username;

  return (
    <div className="profile-page">
      <div className="profile-hello">Hello, {username}</div>
      <Link to={`/edit-profile/${id}`}>Edit profile</Link>
      <button onClick={deleteUser}>Delete Account</button>
    </div>
  );
}
