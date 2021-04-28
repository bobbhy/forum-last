import React, { useState, useEffect, initialState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./css/App.css";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/SignUp";
import userService from "./services/userService";
import Presentation from "./Components/Presentation/Presentation";
import ConfirmToken from "./Components/ConfirmationToken/ConfirmationToken";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import Profile from "./Components/Profile/Profile";
import Dashboard from "./Components/Dashboard/Dashboard";
import Notification from "./Components/Notification/Notification";
import Network from "./Components/Network/Network";
import Cv from "./Components/Profile/ShownProfile/Cv";
import Messages from "./Components/Messages/Messages";
import SinglePostMain from "./Components/Home/Feed/SinglePost/SinglePostMain";
import authHeader from "./services/authHeader";
import { useSelector, useDispatch } from 'react-redux';



function App() {
  const [user, setUser] = useState(initialState);
  const [image, setImage] = useState(initialState);
  const [role, setRole] = useState(initialState);


  useEffect(() => {
    async function getUserData() {
      await userService.getUserData().then((response) => {
        setUser(response?.data);
        setRole(response?.data?.roles[0]?.id);
        if (response?.data?.roles[0]?.id === 1) {
          setImage(response?.data?.cv?.image);
        } else if (response?.data?.roles[0]?.id === 3) {
          setImage(response?.data?.company?.companyImage);
        }
      }, (error) => {
        setUser(null)
      });
    }
    getUserData();
    async function getCurrentImage() {
      if (role === 1) {
        await userService.getCurrentImage().then((response) => {
          // setImage(`data:image/png;base64,${response?.data}`);
        });
      } else if (role === 3) {
        await userService.getCurrentCompanyImage().then((response) => {
          // setImage(`data:image/png;base64,${response?.data}`);
        });
      }
    }
    getCurrentImage();
  }, [role]);
  return (
    <div className="app">
      {/* Header */}
      {user?.roles[0]?.id === 2 && <Redirect to="/admin" />}
      {!(user?.roles[0]?.id === 2) && <Header image={image} user={user} />}
      {/* App Body */}
      <div className="app_body">
        <Switch>
          <Route exact path={"/"} component={Presentation} />
          <Route
            exact
            path={"/confirm"}
            component={() => (
              <ConfirmToken userinfo={user} user={user ? true : false} />
            )}
          />
          <Route
            exact
            path={"/login"}
            component={() => (
              <Login user={user ? true : false} userInfo={user} />
            )}
          />
          <Route
            exact
            path={"/register"}
            component={() => <SignUp user={user ? true : false} />}
          />
          {user === null ? (<><Route
            component={() => <Presentation />}
          /></>) : (user?.roles[0]?.id === 1 && user.cv.flag == false) || (user?.roles[0]?.id === 3 && user.company.flag == false) ? (<>
            <Route
              component={() => <Profile user={user} image={image} />}
            />
          </>) : (<>
            <Route
              exact
              path={"/home"}
              render={() => <Home image={image} user={user} />}
            />
            <Route
              exact
              path={"/profile"}
              component={() => <Profile user={user} image={image} />}
            />
            <Route exact path="/view/:id" component={Cv} />
            <Route exact path={"/post/:postId"} component={() => <SinglePostMain user={user} image={image} />} />
            <Route
              exact
              path="/admin"
              component={() => <Dashboard user={user} />}
            />
            <Route exact path="/MyNetwork" component={() => <Network user={user} />} />
            <Route
              exact
              path={"/Notifications"}
              component={() => <Notification user={user} image={image} />}
            />
            <Route
              exact
              path={"/Messages/:id?/"}
              component={() => <Messages user={user} />} />
          </>)}
        </Switch>
      </div>
    </div>
  );
}

export default App;
