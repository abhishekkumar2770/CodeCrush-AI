import axios from "../utils/axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get("/user/feed");
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="pt-24 pb-16 px-4 bg-base-100 min-h-screen text-base-content flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-pink-400 text-transparent bg-clip-text text-center">
        Connect with fellow developers. Collaborate and grow together. 🚀
      </h1>

      {/* Stack or Empty Message */}
      {feed && feed.length > 0 ? (
        <div className="relative w-[350px] h-[520px]">
          {feed.map((user, index) => {
            const position = feed.length - index;
            const offset = index * 6;
            const scale = 1 - index * 0.02;
            const blur = index > 0 ? Math.min(index * 0.5, 2) : 0;
            const isTop = index === 0;

            return (
              <div
                key={user._id}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out ${isTop ? "z-30" : "z-10 pointer-events-none"
                  }`}
                style={{
                  transform: `scale(${scale}) translateY(${offset}px)`,
                  filter: `blur(${blur}px)`,
                  opacity: index > 2 ? 0 : 1,
                }}
              >
                <div className="rounded-xl shadow-xl overflow-hidden bg-base-200 border border-base-300">
                  <UserCard user={user} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="bg-base-200 p-8 rounded-xl shadow-xl text-center max-w-md">
            <h2 className="text-2xl font-bold text-primary mb-2">
              You’ve reached the end for now! 🔄
            </h2>
            <p className="text-base text-base-content/80">
              Check back later to discover more awesome developers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
