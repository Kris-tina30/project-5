import React from "react";

const Header = () => {
  return (
    <div>
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
