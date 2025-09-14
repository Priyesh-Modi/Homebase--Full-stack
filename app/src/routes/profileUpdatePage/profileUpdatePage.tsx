import React, { useContext, useState, FormEvent } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

interface User {
  id: string;
  username: string;
  email: string;
  name: string; // Ensure name is included
  avatar?: string;
}

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext) as {
    currentUser: User | null;
    updateUser: (user: User | null) => void;
  };

  const [error, setError] = useState<string>("");
  const [avatar, setAvatar] = useState<string[]>([]);

  const navigate = useNavigate();

  // Utility function to convert FormData to an object
  const getFormDataEntries = (formData: FormData): Record<string, string> => {
    const entries: Record<string, string> = {};
    formData.forEach((value, key) => {
      entries[key] = value.toString();
    });
    return entries;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      console.error("No current user found.");
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const { username, email, password } = getFormDataEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0] || currentUser.avatar,
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
      <div className="profileUpdatePage">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Update Profile</h1>
            <div className="item">
              <label htmlFor="username">Username</label>
              <input
                  id="username"
                  name="username"
                  type="text"
                  defaultValue={currentUser?.username || ""}
              />
            </div>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={currentUser?.email || ""}
              />
            </div>
            <div className="item">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" />
            </div>
            <button>Update</button>
            {error && <span className="error">{error}</span>}
          </form>
        </div>
        <div className="sideContainer">
          <img
              src={avatar[0] || currentUser?.avatar || "/noavatar.jpg"}
              alt="Avatar"
              className="avatar"
          />
          <UploadWidget
              uwConfig={{
                cloudName: "HomeBase",
                uploadPreset: "estate",
                multiple: false,
                maxImageFileSize: 2000000,
                folder: "avatars",
              }}
              setState={setAvatar}
              setPublicId={(publicId: string) =>
                  console.log("Public ID:", publicId)
              }
          />
        </div>
      </div>
  );
}

export default ProfileUpdatePage;
