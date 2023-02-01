import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import { UserContextProvider } from "./components/UserContext";
import CreatePostPage from "./components/pages/CreatePostPage";
import PostPage from "./components/pages/PostPage";
import EditPost from "./components/pages/EditPost";
import Chat from "./components/Chat";
import ProfilePage from "./components/pages/ProfilePage";
import ProfileEditPage from "./components/pages/ProfileEditPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/edit-profile/:id" element={<ProfileEditPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
