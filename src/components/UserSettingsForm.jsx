import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const MAX_CHAR_VALIDATION = 64;
const MIN_CHAR_VALIDATION = 8;
const MAX_CHAR_NAME_VALIDATION = 32;

const Userschema = yup.object().shape({
  avatar: yup.mixed().required("Avatar is required"),
  gender: yup.string().required("Gender is required"),
  name: yup
    .string()
    .max(
      MAX_CHAR_NAME_VALIDATION,
      `Your name must be less than ${MAX_CHAR_NAME_VALIDATION} characters!`
    )
    .required("Name is required"),
  email: yup
    .string()
    .email("You must enter valid email address!")
    .required("Email is required"),
  currentPassword: yup
    .string()
    .min(
      MIN_CHAR_VALIDATION,
      `Your current password must be more than ${MIN_CHAR_VALIDATION} characters!`
    )
    .max(
      MAX_CHAR_VALIDATION,
      `Your current password must be less than ${MAX_CHAR_VALIDATION} characters!`
    )
    .required("current password is required"),
  newPassword: yup
    .string()
    .min(
      MIN_CHAR_VALIDATION,
      `Your new password must be more than ${MIN_CHAR_VALIDATION} characters!`
    )
    .max(
      MAX_CHAR_VALIDATION,
      `Your new password must be less than ${MAX_CHAR_VALIDATION} characters!`
    )
    .required("new password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const UserSettingsModal = ({ isOpen, onClose, onUpdate }) => {
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: "woman",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("avatar", data.avatar[0]);
      formData.append("gender", data.gender);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await axios.post("/api/user/update", formData);

      onUpdate(response.data);
      onClose();
      reset();
    } catch (error) {
      alert("Failed to update user data: " + error.message);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
  };
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Setting</h2>
      <button type="button" onClick={onClose}>
        x
        <svg>
          <use href=""></use>
        </svg>
      </button>
      <div className="modal-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Your photo</label>
          <div className="form-group">
            <input
              type="file"
              {...register("avatar")}
              onChange={handleAvatarChange}
            />
            {errors.avatar && <p>{errors.avatar.message}</p>}
            {preview && <img src={preview} alt="Avatar Preview" />}
            <button type="button" className={css.uploadButton}>
              Upload a photo
            </button>
          </div>

          <div className="form-group">
            <label>Your gender identity</label>
            <label>
              <input type="radio" value="woman" {...register("gender")} /> Woman
            </label>
            <label>
              <input type="radio" value="man" {...register("gender")} /> Man
            </label>
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          <div className="form-group">
            <label>Your name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <p>Outdated password:</p>
            <input
              type={showOutdatedPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className="form-group">
            <label>New Password:</label>

            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label>Repeat new password:</label>

            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserSettingsModal;
