import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Header } from "../../constants";

const stripePromise = loadStripe("your-publishable-key-here");

const Payment = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="py-4 pb-10 text-white bg-gray-800 shadow-md">
        <Header />
      </div>

      <div className="flex items-center justify-center flex-grow p-4">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-center">
            Payment | Checkout
          </h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
