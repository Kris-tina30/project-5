import { React, useState } from "react";
// import { useSelector } from "react-redux";
import Logo from "./Logo";
import UserLogo from "./UserLogo";
import UserAuth from "./UserAuth";
import UserLogoModal from "./UserLogoModal";

const Header = () => {
  //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //   const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserLogoClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div>
      {/* <div>
        {" "}
        <Logo isAuthenticated={isAuthenticated} />
        {isAuthenticated ? (
          <>
            <UserLogo user={user} onClick={handleUserLogoClick} />
            {isModalOpen && (
              <UserLogoModal user={user} onClose={handleUserLogoClick} />
            )}
          </>
        ) : (
          <UserAuth />
        )}
      </div> */}

      <div>
        <a href="" lang="en">
          <img src="../images/logo.svg" alt="drop of water, tracker of water" />
        </a>
        <nav>
          <button type="button">
            Sign in
            <svg>
              <use href="../images/outline.svg"></use>
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
