import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import DailyNorma from "./DailyNorma";

const schema = yup.object().shape({
  avatar: yup.mixed().required("Avatar is required"),
  gender: yup.string().required("Gender is required"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  weight: yup
    .number()
    .positive("Weight must be a positive number")
    .required("Weight is required"),
  activeTime: yup
    .number()
    .positive("Active time must be a positive number")
    .required("Active time is required"),
  waterIntake: yup
    .number()
    .positive("Water intake must be a positive number")
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

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <label>Email</label>
            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <DailyNorma />
          </div>
          <div className="form-group">
            <label>Your weight in kilograms:</label>
            <input type="number" {...register("weight")} />
            {errors.weight && <p>{errors.weight.message}</p>}
          </div>
          <div className="form-group">
            <label>The time of active participation in sports:</label>
            <input type="number" {...register("activeTime")} />
            {errors.activeTime && <p>{errors.activeTime.message}</p>}
          </div>

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSettingsModal;
