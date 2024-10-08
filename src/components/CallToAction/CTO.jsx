import { useState } from "react";
import axios from "axios";

const CTO = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://devdeakinserver.onrender.com/send-email",
        {
          email,
        },
      );
      setMessage(response.data.message);
      setColor("green");
      setEmail("");
    } catch (error) {
      console.error("There was an error sending the email!", error);
      setMessage("Failed to send email");
      setColor("red");
    }
  };

  return (
    <div className="flex items-center justify-between px-8 py-2 bg-[#251138] mt-8 gap-5">
      <h2 className="text-2xl text-white font-silk">&lt;/DEV@Deakin&gt;</h2>
      <h3 className="w-full text-2xl font-bold text-primary font-silk">
        SIGN UP FOR OUR DAILY INSIDER
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between w-full max-w-sm text-white gap-4 text-md font-poppins"
      >
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-2 bg-transparent border border-gray-400 rounded-sm search-shadow placeholder-opacity-50"
          required
        />
        <button
          type="submit"
          className="px-5 py-[.2rem] bg-green-500 hover:border hover:border-[#45ae00] transition-colors duration-300 ease-in-out hover:bg-transparent cursor-pointer text-md text-white rounded-md"
        >
          Subscribe
        </button>
      </form>
      <div className={`text-${color}`}>{message}</div>
    </div>
  );
};

export default CTO;
