import React from "react";

const UserLogo = () => {
  return (
    <div>
      <button type="button">
        <p>{name}</p>
        <img src="../" alt="user avatar" />
        <svg>
          <use href=""></use>
        </svg>
      </button>

      <ul>
        <li>
          <button type="button">
            <svg>
              <use href=""></use>
            </svg>{" "}
            Setting
          </button>
        </li>
        <li>
          <button type="button">
            <svg>
              <use href=""></use>
            </svg>{" "}
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserLogo;
