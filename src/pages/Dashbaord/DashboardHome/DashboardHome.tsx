import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ICONS } from "../../../assets";
import { useGetMyDashboardStatsQuery } from "../../../redux/Features/User/userApi";
import { FaCalendar, FaFileAlt } from "react-icons/fa";
import DashboardHeader from "../../../components/Reusable/DashboardHeader/DashboardHeader";
import DashboardLoader from "../../../components/Loaders/DashboardLoader/DashboardLoader";
import { FiEye } from "react-icons/fi";

const DashboardHome = () => {
  const {
    data: userStats,
    isLoading,
    isFetching,
  } = useGetMyDashboardStatsQuery({});
  const [showFullDescription, setShowFullDescription] = useState(false);

  const dashboardCards = [
    {
      title: "Enrolled Courses",
      valueCount: userStats?.stats?.enrolledCourses || 0,
      icon: ICONS.course,
      iconColor: "text-blue-500",
    },
    {
      title: "Total Referrals",
      valueCount: userStats?.stats?.totalReferrals || 0,
      icon: ICONS.referral,
      iconColor: "text-green-500",
    },
    {
      title: "Total Earning",
      valueCount: userStats?.stats?.totalEarnings || 0,
      icon: ICONS.earning,
      iconColor: "text-yellow-500",
    },
    {
      title: "Rank",
      valueCount: userStats?.stats?.rank || 0,
      icon: ICONS.rank,
      iconColor: "text-purple-500",
    },
    {
      title: "Total Orders",
      valueCount: userStats?.stats?.totalOrders || 0,
      icon: ICONS.purchasedCourses,
      iconColor: "text-indigo-500",
    },
    {
      title: "KYC Status",
      valueCount: userStats?.stats?.kycStatus || "Pending",
      icon: ICONS.kyc,
      iconColor:
        userStats?.stats?.kycStatus === "Verified"
          ? "text-green-500"
          : "text-red-500",
    },
  ];

  const businessPlan = userStats?.stats?.businessPlan;

  if (isLoading || isFetching) return <DashboardLoader />;
  return (
    <div className="flex flex-col gap-8 font-Inter">
      <Helmet>
        <title>PMGURUKKUL | Dashboard</title>
      </Helmet>

      <DashboardHeader
        pageName="Dashboard"
        pageDesc="Get complete overview of your account."
      />

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left Side: Dashboard Cards */}
        <div className="lg:w-[70%] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {dashboardCards?.map((item) => (
            <div
              key={item.title}
              className="text-start flex items-center justify-between p-4 bg-white rounded-lg border-[1px] border-[#E2E8F0] font-Inter"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[#6B788E] text-base font-normal leading-6 tracking-tight">
                  {item?.title}
                </span>
                <span className="text-[#15294B] text-4xl font-bold leading-10 tracking-[-1px]">
                  {item?.valueCount || 0}
                </span>
              </div>
              <div className="bg-neutral-15/30 size-14 2xl:size-20 rounded-full flex items-center justify-center p-[14px]">
                <img src={item?.icon} alt="" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Business Plan */}
        {businessPlan && (
          <div className="lg:w-[30%] flex-1 text-start p-6 bg-white rounded-xl border border-gray-200 font-Inter flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            {/* Background Graphic */}
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
              <FaFileAlt className="w-20 h-20 text-blue-500" />
            </div>

            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                Business Plan
              </span>
            </div>

            <div className="flex flex-col gap-4 relative z-10">
              {/* Title and Description */}
              <div className="flex flex-col gap-3 mt-8">
                <span className="text-gray-600 text-base font-medium leading-6 tracking-tight">
                  {businessPlan.title}
                </span>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {businessPlan.description.length > 80 && !showFullDescription
                    ? `${businessPlan.description.slice(0, 80)}...`
                    : businessPlan.description}
                  {businessPlan.description.length > 80 && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="ml-1 text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
                    >
                      {showFullDescription ? "Show less" : "See more"}
                    </button>
                  )}
                </p>
              </div>

              {/* File Info */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaCalendar className="w-4 h-4" />
                <span>
                  Last Updated :{" "}
                  {new Date(businessPlan.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-6 relative z-10">
              <a
                href={businessPlan.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md group/download"
              >
                <FiEye className="text-lg group-hover/download:scale-110 transition-transform" />
                View Business Plan
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
