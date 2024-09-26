import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded.
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      "your-client-secret",
      {
        payment_method: {
          card: cardElement,
        },
      },
    );

    if (error) {
      setError(error.message);
      setSuccess(null);
    } else {
      setError(null);
      setSuccess("Payment successful! Intent ID: " + paymentIntent.id);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
        >
          Pay
        </button>
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {success && <div className="mt-4 text-green-500">{success}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
