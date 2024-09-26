import { useNavigate } from "react-router-dom";
import { Header } from "../../constants"; // Ensure Header is imported correctly

const Plans = () => {
  const navigate = useNavigate();

  const handlePremiumClick = () => {
    navigate("/payment");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="py-3 pb-10 text-white bg-gray-800 shadow-md">
        <Header />
      </div>

      {/* Main Content Section */}
      <div className="flex items-center justify-center flex-grow p-4">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-center">Pricing Plans</h1>
          <div className="p-4 mb-4 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-semibold">Free Plan</h2>
            <p className="mt-2">Basic features with no cost.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-semibold">Premium Plan</h2>
            <p className="mt-2">Customization features, analytics, and more!</p>
            <button
              onClick={handlePremiumClick}
              className="px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
            >
              Choose Premium Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
