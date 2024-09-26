import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, createUserDoc } from "../../utils/firebase";

const SignUp = () => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    displayName: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const { displayName, lastname, email, password, confirmPassword, address } =
    signupData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { user } = await signup(email, password);
      await createUserDoc(user, { displayName, lastname, address });

      navigate("/login");
    } catch (error) {
      console.log("Error in registering user: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Create a DEV@Deakin Account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="displayName"
            placeholder="Name"
            required
            value={signupData.displayName}
            onChange={handleChange}
          />
          <input
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="lastname"
            placeholder="Last Name"
            required
            value={signupData.lastname}
            onChange={handleChange}
          />
          <input
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="email"
            placeholder="Email"
            type="email"
            required
            value={signupData.email}
            onChange={handleChange}
          />
          <input
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="password"
            placeholder="Password"
            type="password"
            required
            value={signupData.password}
            onChange={handleChange}
          />
          <input
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            required
            value={signupData.confirmPassword}
            onChange={handleChange}
          />
          <input
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="address"
            placeholder="Address"
            type="text"
            required
            value={signupData.address}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="p-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign Up
          </button>
          <Link to="/login" className="mt-4 text-indigo-600 hover:underline">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
