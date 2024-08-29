import { React, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   Link,
// useHistory
// } from "react-router-dom";
import UserLogoModal from "./UserLogoModal";

const Logo = () =>
  // { isAuthenticated }
  {
    //   const history = useHistory();
    //   const handleLogoClick = () => {
    //     if (isAuthenticated) {
    //       history.push("/home"); // Маршрут для авторизованого користувача
    //     } else {
    //       history.push("/"); // WelcomePage для неавторизованого користувача
    //     }
    //   };
    return (
      <div className="logo" onClick={handleLogoClick}>
        <img src="/path-to-logo.png" alt="App Logo" />
      </div>
    );
  };

export default Logo;
