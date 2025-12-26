import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection, removeConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchConnections = async () => {
    try {
      dispatch(removeConnection());
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(connections.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-primary-content">
          No connections found. Try connecting with more developers!
        </h1>
      </div>
    );

  const filteredConnections = connections
    .filter((conn) => conn && conn.firstName && conn.lastName) // ✅ prevent nulls
    .filter((conn) => {
      const fullName = `${conn.firstName} ${conn.lastName}`.toLowerCase();
      const skillsString = conn.skills?.join(", ").toLowerCase() || "";
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        skillsString.includes(searchTerm.toLowerCase())
      );
    });

  if (connections.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-primary-content">
          No connections found. Try connecting with more developers!
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-base-content">
      {/* Title + Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-primary">
          Your Connections
        </h1>
        <p className="text-sm text-base-content/70 mt-1">
          You have{" "}
          <span className="text-primary font-semibold">
            {connections.length}
          </span>{" "}
          connection{connections.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by name or skill..."
          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Connection Cards */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {filteredConnections.length > 0 ? (
          filteredConnections.map((connection) => {
            const {
              _id,
              firstName,
              lastName,
              photoURL,
              age,
              gender,
              about,
              skills = [],
            } = connection;

            return (
              <div
                key={_id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-base-200 border border-base-300 rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-start gap-4">
                  <img
                    alt="photo"
                    className="w-16 h-16 rounded-full object-cover border border-base-300"
                    src={photoURL}
                  />
                  <div>
                    <h2 className="text-lg font-bold text-primary">
                      {firstName} {lastName}
                    </h2>
                    {age && gender && (
                      <p className="text-sm text-base-content/70">
                        {age} years • {gender}
                      </p>
                    )}
                    {about && (
                      <p className="text-sm text-base-content/90 mt-1 line-clamp-2">
                        {about}
                      </p>
                    )}
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/10 text-primary px-2 py-1 text-xs rounded-full"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 md:mt-0 md:self-start">
                  <Link to={`/chat/${_id}`}>
                    <button className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200">
                      💬 Chat
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-base-content/70">
            No matches found for "{searchTerm}"
          </p>
        )}
      </div>
    </div>
  );
};

export default Connections;
