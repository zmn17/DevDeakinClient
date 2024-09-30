import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, resendVerificationEmail } from "../../utils/firebase"; // Include resendVerificationEmail

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [resendMessage, setResendMessage] = useState(null); // For showing resend verification message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = await login(loginData.email, loginData.password);
      if (userCredentials) {
        navigate("/homepage");
      }
    } catch (error) {
      if (error.message === "Please verify your email before logging in.") {
        setResendMessage(
          "Your email is not verified. Would you like to resend the verification email?",
        );
      } else {
        setError("Invalid email or password. Please try again.");
      }
      console.log("Error logging in user: ", error);
    }
  };

  const handleResendVerification = async () => {
    try {
      const user = await login(loginData.email, loginData.password);
      await resendVerificationEmail(user.user);
      setResendMessage("Verification email resent. Please check your inbox.");
    } catch (error) {
      setError("Unable to resend verification email. Please try again later.");
      console.log("Error resending verification email: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              label="Email"
              name="email"
              placeholder="Email"
              type="email"
              required
              value={loginData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
              required
              value={loginData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <div className="mt-2 text-center text-red-500">{error}</div>
          )}
          {resendMessage && (
            <div className="mt-2 text-center text-blue-500">
              {resendMessage}
              <button
                type="button"
                onClick={handleResendVerification}
                className="ml-2 text-blue-600 underline"
              >
                Resend Verification Email
              </button>
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-blue-500 hover:underline">
            Don't have an account! Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
