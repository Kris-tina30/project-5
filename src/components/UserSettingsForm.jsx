import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import DailyNorma from "./DailyNorma";

const MAX_CHAR_VALIDATION = 50;
const MAX_CHAR_WATER_VALIDATION = 15;
const MIN_CHAR_VALIDATION = 3;

const schema = yup.object().shape({
  avatar: yup.mixed().required("Avatar is required"),
  gender: yup.string().required("Gender is required"),
  name: yup
    .string()
    .min(
      MIN_CHAR_VALIDATION,
      `Your name must be more than ${MIN_CHAR_VALIDATION} characters!`
    )
    .max(
      MAX_CHAR_VALIDATION,
      `Your name must be less than ${MAX_CHAR_VALIDATION} characters!`
    )
    .required("Name is required"),
  email: yup
    .string()
    .email("You must enter valid email address!")
    .required("Email is required"),
  weight: yup.number().positive("Weight must be a positive number"),
  activeTime: yup.number().positive("Active time must be a positive number"),

  waterIntake: yup
    .number()
    .positive("Water intake must be a positive number")

    .max(
      MAX_CHAR_WATER_VALIDATION,
      `Emount of water intake must not be a greater than ${MAX_CHAR_WATER_VALIDATION} number!`
    )
    .required("Water intake is required"),
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
      formData.append("weight", data.weight);
      formData.append("activeTime", data.activeTime);
      formData.append("waterIntake", data.waterIntake);

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
      <button type="button" onClick={onClose}>
        <svg>
          <use href=""></use>
        </svg>
      </button>
      <div className="modal-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Your photo</p>
          <div className="form-group">
            <label>Upload a photo</label>
            <input
              type="file"
              {...register("avatar")}
              onChange={handleAvatarChange}
            />
            {errors.avatar && <p>{errors.avatar.message}</p>}
            {preview && <img src={preview} alt="Avatar Preview" />}
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
            <input type="text" {...register("name")} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <p>Outdated password:</p>
            <label>Password</label>

            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
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
