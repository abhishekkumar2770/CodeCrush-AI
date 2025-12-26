import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "../utils/axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstname] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.post(
        "/profile/edit",
        { firstName, lastName, photoURL, age, gender, about, skills }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="min-h-screen pt-24 pb-10 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-base-content flex flex-col md:flex-row justify-center items-start gap-10">
        {/* Edit Profile Form */}
        <div className="bg-base-200 border border-base-300 rounded-xl shadow-lg p-8 w-full max-w-md h-full flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-6 text-primary text-center">
            Edit Your Profile
          </h2>
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="label-text">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="label-text">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Age */}
            <div>
              <label className="label-text">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="label-text">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="label-text">Gender</label>
              <div className="dropdown w-full">
                <label tabIndex={0} className="btn w-full">
                  {gender || "Select Gender"}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box w-full p-2 mt-2 shadow"
                >
                  <li>
                    <button onClick={() => setGender("Male")}>Male</button>
                  </li>
                  <li>
                    <button onClick={() => setGender("Female")}>Female</button>
                  </li>
                  <li>
                    <button onClick={() => setGender("Others")}>Others</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="label-text">Skills</label>
              <input
                type="text"
                value={skills.join(", ")}
                onChange={(e) =>
                  setSkills(e.target.value.split(",").map((s) => s.trim()))
                }
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-base-content/60 mt-1">
                Separate multiple skills with commas
              </p>
            </div>

            {/* About */}
            <div>
              <label className="label-text">About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us about yourself..."
                className="textarea textarea-bordered w-full p-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Save Button */}
            <button onClick={saveProfile} className="btn btn-primary w-full">
              Save Profile
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="hidden md:block">
          <UserCard
            user={{ firstName, lastName, photoURL, about, age, gender, skills }}
          />
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="alert alert-success shadow-lg rounded-lg">
            <span>✅ Profile saved successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
