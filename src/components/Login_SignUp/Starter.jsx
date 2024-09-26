import { Link } from "react-router-dom";

const Starter = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col text-center gap-10">
        <h1 className="text-3xl font-bold text-yellow-500">DEV@Deakin</h1>
        <div className="flex space-x-4">
          <Link
            to="/signup"
            className="px-5 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 hover:text-yellow-200 transition duration-200"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-5 py-1 text-white bg-green-500 rounded hover:bg-green-600 hover:text-white transition duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Starter;
