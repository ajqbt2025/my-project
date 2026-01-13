import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createNotificationService } from "../../../services/operations/AdminService";

export default function CreateNotification() {
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await createNotificationService(data, token);
    reset();
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Notification</h2>
      <p className="text-sm text-richblack-300 mb-4">
        Homepage / dashboard par dikhane ke liye notification banayein
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* TITLE */}
        <div>
          <label className="form-label">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="form-input"
            placeholder="Enter notification title"
          />
          {errors.title && (
            <p className="text-red-400 text-xs mt-1">
              Title is required
            </p>
          )}
        </div>

        {/* MESSAGE */}
        <div>
          <label className="form-label">Message</label>
          <textarea
            rows="4"
            {...register("message", { required: true })}
            className="form-input resize-none"
            placeholder="Enter notification message"
          />
          {errors.message && (
            <p className="text-red-400 text-xs mt-1">
              Message is required
            </p>
          )}
        </div>

        {/* TYPE + VISIBILITY */}
        <div className="form-grid-2">
          <div>
            <label className="form-label">Type</label>
            <select
              {...register("type")}
              className="form-select"
            >
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
            </select>
          </div>

          <div>
            <label className="form-label">Visible To</label>
            <select
              {...register("visibleTo")}
              className="form-select"
            >
              <option value="all">All</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="form-submit-btn"
        >
          Create Notification
        </button>
      </form>
    </div>
  );
}
