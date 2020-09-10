import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UrlPage from "./pages/UrlPage";
import DatabasePage from "./pages/DatabasePage";
import SignupPage from "./pages/SignUpPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ConfirmPage from "./pages/ConfirmPage";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/createUrl">
          <UrlPage />
        </Route>
        <Route path="/database">
          <DatabasePage />
        </Route>
        <Route path="/signUp">
          <SignupPage />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPasswordPage />
        </Route>
        <Route path="/newPassword/:token">
          <NewPasswordPage />
        </Route>
        <Route path="/confirm">
          <ConfirmPage />
        </Route>
      </Switch>
    </div>
  );
}
