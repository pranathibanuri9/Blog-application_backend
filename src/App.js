import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Alert } from "reactstrap";

import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Privateroute from "./components/Privateroute";
import Userdashboard from "./user-routers/Userdashboard";
import Profile from "./user-routers/Profile";
import PostPage from "./pages/PostPage";
import UserProvider from "./context/UserProvider";
import Categories from "./pages/Categories";
import UpdateBlog from "./pages/UpdateBlog";
import UpdateUser from "./pages/UpdateUser";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/services" element={<Services></Services>}></Route>
          <Route path="/posts/:postId" element={<PostPage></PostPage>}></Route>
          <Route
            path="/categories/:categoryId"
            element={<Categories></Categories>}
          ></Route>

          <Route path="/user" element={<Privateroute></Privateroute>}>
            <Route
              path="dashboard"
              element={<Userdashboard></Userdashboard>}
            ></Route>
            <Route path="profile/:userId" element={<Profile></Profile>}></Route>
            <Route
              path="update-blog/:blogId"
              element={<UpdateBlog></UpdateBlog>}
            ></Route>
            <Route
              path="update-user/:userId"
              element={<UpdateUser></UpdateUser>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
