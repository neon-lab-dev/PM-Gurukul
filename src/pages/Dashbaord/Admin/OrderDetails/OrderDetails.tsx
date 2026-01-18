import React, { useState } from "react";
import { ICONS } from "../../../../assets";
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import Card from "../../../../components/Reusable/OrderDetailsCard/OrderDetailsCard";
import CustomerDetails from "../../../../components/CustomerDetails/CustomerDetails";
import { useParams } from "react-router-dom";
import { useGetSingleOrderByIdQuery, useGetSingleUserByIdQuery } from "../../../../redux/Features/Admin/adminApi";
import { formatDate } from "../../../../utils/formatDate";
import { useGetSingleCourseByIdQuery } from "../../../../redux/Features/Course/courseApi";
import CartItem from "../../../../components/CartPage/CartItem/CartItem";
import Spinner from "../../../../components/Loaders/Spinner/Spinner";

// Main Component
const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading: isOrderLoading } = useGetSingleOrderByIdQuery(id);
  console.log(data);
  const { data: userData, isLoading: isUserLoading } = useGetSingleUserByIdQuery(data?.order?.user);
  const { data: courseData, isLoading: isCourseLoading } = useGetSingleCourseByIdQuery(data?.order?.course.map((course: string) => course));

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const handleCopy = () => {
    const referralCode = data?.order?._id;
    navigator.clipboard.writeText(referralCode).then(() => {
      setIsCopied(true);
    });
  };


  const orderedOn = data?.order?.createdAt ? formatDate(data.order.createdAt) : 'Date not available';


  if (isOrderLoading || isUserLoading || isCourseLoading) return <div className="flex items-center justify-center h-screen"><Spinner /></div>

  return (
    <>
      <DashboardHeader pageName="Order Details" />

      <div className="flex flex-col lg:flex-row justify-between w-full font-Inter gap-8 items-start">
        {/* Left Section */}
        <div className="flex flex-col gap-8 lg:w-2/3 w-full">
          <CartItem item={courseData?.course} isDeleteAvailable={false} />
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full lg:w-1/3 gap-4">
          <CustomerDetails
            fullName={userData?.user?.full_name}
            mobileNumber={userData?.user?.mobileNumber}
            link="/customer/details"
          />
          <Card title="Order Details">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-textGray-80 text-[14px] leading-5 tracking-tight">
                <span>Order ID</span>
                <button
                  className="flex items-center gap-[6px] cursor-pointer"
                  onClick={handleCopy}
                >
                  {
                    isCopied ?
                      <svg width="27" height="27" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                        <path className="checkmark" fill="none" stroke="#4CAF50" stroke-width="6" d="M18 36 L30 48 L54 24" />
                      </svg>
                      :
                      <img src={ICONS.Copy} alt="Copy" className="size-5" />
                  }
                  <span>{data?.order?._id}</span>
                </button>
              </div>
              <div className="flex items-center justify-between text-textGray-80 text-[14px] leading-5 tracking-tight">
                <span>Ordered on</span>
                <span>{orderedOn}</span>
              </div>
              <div className="flex items-center justify-between text-textGray-80 text-[14px] leading-5 tracking-tight">
                <span>Paid on</span>
                <span>{orderedOn}</span>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <span className="text-base text-textGray-80 font-semibold leading-6 tracking-tight">
                Item Total
              </span>
                <span className="text-base text-textGray-80 font-semibold leading-6 tracking-tight">
                  ₹{data?.order?.discountedPrice}
                </span>
                
            </div>
            <hr className="bg-neutral-800 w-full h-[1px]" />
            <div className="flex items-center gap-6 justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-base text-textGray-80 font-semibold leading-6 tracking-tight line-clamp-2">
                  Amount Paid
                </span>
                <span className="text-textGray-20 text-[14px] leading-5 tracking-tight">
                  Included 18% GST
                </span>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className="text-base text-textGray-80 font-semibold leading-6 tracking-tight">
                  ₹{data?.order?.totalPrice}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
