import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoURL, skills } =
    user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card w-96 bg-base-200 p-7 text-base-content border border-base-300 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
      {/* Profile Image */}
      <figure className="px-6 pt-6">
        <div className="relative w-full h-40 overflow-hidden rounded-xl border border-base-300">
          <img
            src={photoURL}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body px-6 py-5 space-y-4">
        {/* Name */}
        <h2 className="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {firstName} {lastName}
        </h2>

        {/* Age & Gender */}
        {(age || gender) && (
          <div>
            <h3 className="text-xs font-semibold text-base-content/60 uppercase tracking-wide mb-1">
              Basic Info
            </h3>
            <p className="text-sm text-base-content/70">
              {age && `${age} years`}
            </p>
            <p className="text-sm text-base-content/70">{gender}</p>
          </div>
        )}

        {/* About */}
        {about && (
          <div>
            <h3 className="text-xs font-semibold text-base-content/60 uppercase tracking-wide mb-1">
              About
            </h3>
            <p className="text-sm text-base-content/80 leading-relaxed">
              {about}
            </p>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-base-content/60 uppercase tracking-wide mb-1">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:scale-105 transition-transform"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-between mt-6">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-error text-error hover:bg-error hover:text-white transition duration-200 hover:scale-[1.03]"
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-md hover:scale-[1.05] transition-transform"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
