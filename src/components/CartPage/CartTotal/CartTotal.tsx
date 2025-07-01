/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { IMAGES } from "../../../assets";
import { TCartData } from "../../../types/cartData.types";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { useState } from "react";
import { useMakePaymentMutation } from "../../../redux/Features/Payment/paymentApi";
import { useGetMeQuery } from "../../../redux/Features/User/userApi";
import { toast } from "sonner";

// Add Razorpay type to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

const CartTotal = ({ cartData }: { cartData: TCartData[] }) => {
  const { data: profile } = useGetMeQuery({});
  const purchasedCourses = profile?.user?.purchasedCourses || [];

  const discountedPriceTotal =
    cartData &&
    cartData?.reduce((acc, currVal) => acc + currVal.discountedPrice, 0);
  const gst = (discountedPriceTotal * 18) / 100;
  const user = useSelector(useCurrentUser) as any;

  const cartItems = cartData?.map((item) => item._id);
  const isPurchased = cartItems?.some((id) => purchasedCourses.includes(id));

  const [makePayment] = useMakePaymentMutation();

  const [loading, setLoading] = useState(false);

  const totalAmount = discountedPriceTotal + gst;
  const handleCheckout = async () => {
    if(cartItems?.length === 0) return toast.error("Cart is empty!");
    if (isPurchased)
      return toast.error(
        "Maybe you have already purchased some of these courses! Please check your purchased courses or remove it from cart to continue."
      );
    try {
      setLoading(true);
      const keyData = await axios.get("http://localhost:5000/api/v1/getKey");

      const response = await makePayment({ amount: Number(totalAmount) });

      const options = {
        key: keyData?.data?.key, // Razorpay key_id
        amount: response?.data?.order?.amount,
        currency: "INR",
        name: "PMGURUKKUL",
        description: "Test Transaction",
        image: "https://i.ibb.co/yBPFg2BJ/pmgurukul-favicon.png",
        order_id: response?.data?.order?.id, // the order id
        callback_url: "http://localhost:5000/api/v1/paymentVerification",
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

      localStorage.setItem("orderedCourses", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full xl:w-[500px] flex flex-col gap-6 bg-white rounded-2xl border border-neutral-75 p-5">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h1 className="heading6 text-sm">Item Total</h1>
        <div className="flex items-center gap-[6px]">
          <h1 className="heading6 text-sm">₹{discountedPriceTotal}</h1>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="heading6 text-sm">GST 18%</h1>
        <div className="flex items-center gap-[6px]">
          <h1 className="heading6 text-sm">₹{gst}</h1>
        </div>
      </div>

      <hr className="border border-neutral-60" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading6">To Pay </h1>
        </div>
        <div>
          <h1 className="heading6">₹{totalAmount}</h1>
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
          <img src={IMAGES.securePayment} alt="secure-payment" className="" />
          <img src={IMAGES.razorpay} alt="razorpay" className="" />
          <img src={IMAGES.secureSSL} alt="secure-payment" className="" />
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
