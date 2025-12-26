import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-center text-base-content/70 px-4">
        <p className="text-lg font-medium">
          You need to log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 text-base-content">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center tracking-tight bg-gradient-to-r from-sky-400 to-pink-500 text-transparent bg-clip-text animate-fade-in">
          Your Developer Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300 transition hover:shadow-xl hover:border-primary duration-300">
          <EditProfile user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
