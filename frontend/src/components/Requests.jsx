import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [acceptedIds, setAcceptedIds] = useState([]);
  const [toastMsg, setToastMsg] = useState("");

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      setToastMsg(`Request ${status} successfully!`);
      setAcceptedIds((prev) => [...prev, _id]);
      setTimeout(() => {
        dispatch(removeRequest(_id));
        setToastMsg("");
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.connectionRequests));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-400">
          No requests at the moment. Stay connected!
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-base-content">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-primary">
          Incoming Requests
        </h1>
        <p className="text-sm text-base-content/70 mt-1">
          You have{" "}
          <span className="text-primary font-semibold">{requests.length}</span>{" "}
          request{requests.length > 1 && "s"}
        </p>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50">
          <div className="alert alert-success shadow-lg rounded-lg">
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* Request Cards */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoURL, age, gender, about } =
            request.fromUserId;

          const isFading = acceptedIds.includes(request._id);

          return (
            <div
              key={_id}
              className={`flex flex-col md:flex-row items-start md:items-center gap-4 bg-base-200 border border-base-300 rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 ease-in-out ${
                isFading ? "opacity-0 scale-95" : "opacity-100"
              }`}
            >
              <img
                alt="photo"
                className="w-16 h-16 rounded-full object-cover border border-base-300"
                src={photoURL}
              />
              <div className="text-left flex-1">
                <h2 className="text-lg font-bold text-primary">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-base-content/70">
                    {age} years • {gender}
                  </p>
                )}
                {about && (
                  <p className="text-sm text-base-content/90 mt-1">{about}</p>
                )}
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-md hover:scale-105 transition-transform"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-error text-error hover:bg-error hover:text-white transition duration-200 hover:scale-[1.03]"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
