/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../redux/Features/Payment/paymentApi";

const PaymentSuccessful = () => {
  const { paymentId } = useParams();
  const [orderedCourses, setOrderedCourses] = useState([]);
  // const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    const storedCourses = localStorage.getItem("orderedCourses");
    const courses = storedCourses ? JSON.parse(storedCourses) : [];
    setOrderedCourses(courses);
  }, []);

  useEffect(() => {
    const handlePushOrderedItems = async () => {
      try {
        const orderInfo = {
          courseId: orderedCourses,
        };
        await createOrder(orderInfo).unwrap();
        setSuccess(true);
        localStorage.removeItem("orderedCourses");
        localStorage.removeItem("cart");
      } catch (error) {
        console.error("Error placing order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderedCourses.length > 0) {
      handlePushOrderedItems();
    }
  }, [orderedCourses, createOrder]);

  if (loading) {
    return (
      <div className="flex flex-col items-center text-center mt-32">
        <p className="text-neutral-10 text-lg">Processing your payment...</p>
      </div>
    );
  }

  return success ? (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-8xl animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <h2 className="text-xl font-medium text-gray-800 mb-2">
          Payment id : {paymentId}
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your transaction has been successfully
          completed.
        </p>
        <Link
          to="/dashboard/my-courses"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition duration-300"
        >
          Go to Courses
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center text-center mt-32">
      <p className="text-red-500 text-lg">
        Failed to process your order. Please try again.
      </p>
    </div>
  );
};

export default PaymentSuccessful;
