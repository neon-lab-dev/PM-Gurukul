import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccessful = () => {
   const { paymentId } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-8xl animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <h2 className="text-xl font-medium text-gray-800 mb-2">Payment id : {paymentId}</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your transaction has been successfully completed.
        </p>
        <Link
          to="/courses"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition duration-300"
        >
          Go to Courses
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
