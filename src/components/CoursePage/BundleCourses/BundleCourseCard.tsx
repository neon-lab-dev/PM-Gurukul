/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ShoppingCart,
  Clock,
  Star,
  Tag,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { TBundleCourse } from "../../../types/bundleCourse.types";
import { useMakePaymentMutation } from "../../../redux/Features/Payment/paymentApi";
import { useState } from "react";
import Modal from "../../Reusable/Modal/Modal";
import { IMAGES } from "../../../assets";
import axios from "axios";
import { backendBaseUrl } from "../../../redux/Api/baseApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { TLoggedInUser } from "../../../types/user.types";

interface BundleCourseCardProps {
  bundle: TBundleCourse;
}

const BundleCourseCard: React.FC<BundleCourseCardProps> = ({ bundle }) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [isConfirmPurchaseModalOpen, setIsConfirmPurchaseModalOpen] =
    useState<boolean>(false);
  const calculateDiscountPercentage = () => {
    return Math.round(
      ((bundle.basePrice - bundle.discountedPrice) / bundle.basePrice) * 100
    );
  };

  const [makePayment] = useMakePaymentMutation();

  const [loading, setLoading] = useState(false);
  const gst = (bundle.discountedPrice * 18) / 100;
  const totalAmount = bundle.discountedPrice + gst;

  const cartItems = {
    orderType: "bundleCourse",
    courseIds: bundle?.courseIds?.map((item) => item._id),
    title : bundle.title,
    price : bundle.discountedPrice
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const keyData = await axios.get(`${backendBaseUrl}/api/v1/getKey`);

      const response = await makePayment({ amount: Number(totalAmount) });

      const options = {
        key: keyData?.data?.key, // Razorpay key_id
        amount: response?.data?.order?.amount,
        currency: "INR",
        name: "PMGURUKKUL",
        description: "Test Transaction",
        image: "https://i.ibb.co/yBPFg2BJ/pmgurukul-favicon.png",
        order_id: response?.data?.order?.id, // the order id
        callback_url: `${backendBaseUrl}/api/v1/paymentVerification`, // Here backend url will be added
        prefill: {
          name: user?.name,
          email: user?.email,
          userId: user?._id,
        },
        theme: {
          color: "#051539",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();

      localStorage.setItem("bundleOrderedCourses", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Thumbnail and Tags */}
          <div className="lg:w-2/5 relative">
            <div className="relative h-64 lg:h-full overflow-hidden">
              {/* Discount Badge */}
              {bundle.discountedPrice < bundle.basePrice && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                    <Tag size={14} />
                    <span>Save {calculateDiscountPercentage()}%</span>
                  </div>
                </div>
              )}

              <img
                src={bundle?.thumbnail?.url}
                alt={bundle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:bg-gradient-to-t lg:from-black/60 lg:to-transparent" />

              {/* Course Count Overlay */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {bundle.courseIds.slice(0, 3).map((course: any) => (
                      <div
                        key={course._id}
                        className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                      >
                        <img
                          src={course?.poster?.url}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {bundle.courseIds.length > 3 && (
                      <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          +{bundle.courseIds.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-bold text-gray-900 block">
                      {bundle?.courseIds?.length}
                    </span>
                    <span className="text-sm text-gray-600">Courses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="lg:w-3/5 p-6 lg:p-8">
            <div className="flex flex-col h-full">
              {/* Header Section */}
              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                    Bundle
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {bundle.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-2 lg:line-clamp-3 text-sm lg:text-base">
                  {bundle.description}
                </p>
              </div>

              {/* Middle Section - Courses & Stats */}
              <div className="flex-grow">
                {/* Courses List */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                    <span>Included Courses</span>
                    <ChevronRight size={16} />
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {bundle.courseIds.slice(0, 4).map((course) => (
                      <div
                        key={course._id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={course?.poster?.url}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-medium text-gray-900 truncate">
                            {course.title}
                          </h5>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs font-semibold text-gray-700">
                              ₹{course.discountedPrice}
                            </span>
                            {course.rating && (
                              <div className="flex items-center gap-1">
                                <Star
                                  size={12}
                                  className="text-yellow-400 fill-current"
                                />
                                <span className="text-xs text-gray-500">
                                  {course.rating}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <CheckCircle
                          size={16}
                          className="text-green-500 flex-shrink-0"
                        />
                      </div>
                    ))}
                  </div>
                  {bundle.courseIds.length > 4 && (
                    <div className="mt-3 text-center">
                      <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                        + View {bundle.courseIds.length - 4} more courses
                      </button>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Clock size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Access</span>
                      <p className="text-sm font-semibold text-gray-900">
                        Lifetime
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Star size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Average Rating
                      </span>
                      <p className="text-sm font-semibold text-gray-900">
                        4.8/5.0
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Section - Pricing & CTA */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Pricing */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <div className="text-3xl lg:text-4xl font-bold text-gray-900">
                        ₹{bundle.discountedPrice.toFixed(2)}
                      </div>
                      {bundle.discountedPrice < bundle.basePrice && (
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xl text-gray-500 line-through">
                              ₹{bundle.basePrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      One-time payment • Lifetime access • 7-day money-back
                      guarantee
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="lg:w-auto">
                    <button
                      onClick={() => setIsConfirmPurchaseModalOpen(true)}
                      className="w-full lg:w-auto min-w-[200px] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 px-5 rounded flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                    >
                      <ShoppingCart size={22} />
                      Buy Now
                      <span className="hidden lg:inline">
                        • ₹{bundle.discountedPrice.toFixed(2)}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment confirm modal */}
      <Modal
        isModalOpen={isConfirmPurchaseModalOpen}
        setIsModalOpen={setIsConfirmPurchaseModalOpen}
      >
        <div className=" w-full xl:w-[500px] flex flex-col gap-6 bg-white rounded-2xl border border-neutral-75 p-5">
          {/* Heading */}
          <div className="flex items-center justify-between">
            <h1 className="heading6 text-sm">Item Total</h1>
            <div className="flex items-center gap-[6px]">
              <h1 className="heading6 text-sm">
                ₹{bundle.discountedPrice.toFixed(2)}
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="heading6 text-sm">GST 18%</h1>
            <div className="flex items-center gap-[6px]">
              <h1 className="heading6 text-sm">₹{gst.toFixed(2)}</h1>
            </div>
          </div>

          <hr className="border border-neutral-60" />

          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading6">To Pay </h1>
            </div>
            <div>
              <h1 className="heading6">₹{totalAmount.toFixed(2)}</h1>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleCheckout}
              className={`bg-primary-gradient-light px-5 py-[10px] text-primary-10 font-semibold leading-6 rounded-[10px] shadow-primary-shadow w-full ${
                loading ? "cursor-not-allowed" : ""
              } `}
              disabled={loading}
            >
              {loading ? "Loading..." : "Proceed to Payment"}
            </button>

            <div className="flex items-center justify-center gap-4">
              <img
                src={IMAGES.securePayment}
                alt="secure-payment"
                className=""
              />
              <img src={IMAGES.razorpay} alt="razorpay" className="" />
              <img src={IMAGES.secureSSL} alt="secure-payment" className="" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BundleCourseCard;
