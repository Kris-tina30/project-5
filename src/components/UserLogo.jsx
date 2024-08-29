import React from "react";

const UserLogo = ({ user, onClick }) => {
  const { name, email, avatar } = user;
  const userNameInitial = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();

  return (
    <div>
      <div className="user-logo" onClick={onClick}>
        {avatar ? (
          <img src={avatar} alt="User Avatar" />
        ) : (
          <div className="user-initial">{userNameInitial}</div>
        )}
        <span>{name || email}</span>
      </div>

      <div>
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
    </div>
  );
};

export default UserLogo;
