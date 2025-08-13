/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet-async";
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import { ICONS, IMAGES } from "../../../../assets";
import { useMyReferralSummaryQuery } from "../../../../redux/Features/User/userApi";
import {
  useGetAdminStatsQuery,
  useGetAllOrdersQuery,
} from "../../../../redux/Features/Admin/adminApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDate } from "../../../../utils/formatDate";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import { TLoggedInUser } from "../../../../types/user.types";

const AdminDashboardHome = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const { data: adminStats } = useGetAdminStatsQuery({});
  const { data: referralSummary } = useMyReferralSummaryQuery({});
  const { data: allOrdersHistory } = useGetAllOrdersQuery({});
  const data = [
    {
      title: "Total Earnings",
      valueCount: `₹${referralSummary?.data?.totalEarnings || 0}`,
      icon: ICONS.earning,
    },
    {
      title: "Total Registered Users",
      valueCount: adminStats?.stats?.totalUsers || 0,
      icon: ICONS.users,
    },
    {
      title: "Total Referrals",
      valueCount: referralSummary?.data?.totalReferredUsers || 0,
      icon: ICONS.referral,
    },
    {
      title: "Total Affiliates",
      valueCount: adminStats?.stats?.totalAffiliates || 0,
      icon: ICONS.users,
    },
    {
      title: "Pending KYC",
      valueCount: adminStats?.stats?.pendingKyc || 0,
      icon: ICONS.kyc,
    },
    {
      title: "Available Courses",
      valueCount: adminStats?.stats?.totalCourses || 0,
      icon: ICONS.course,
    },
    
    {
      title: "Total Course Purchased",
      valueCount: adminStats?.stats?.totalOrders || 0,
      icon: ICONS.purchasedCourses,
    },
    {
      title: "Referral Code",
      valueCount: user?.referralCode,
      icon: ICONS.referralCode,
    },
  ];

  const earnings = [
    {
      title: "Daily",
      value: referralSummary?.data?.dailyEarnings,
    },
    {
      title: "Weekly",
      value: referralSummary?.data?.weeklyEarnings,
    },
    {
      title: "Monthly",
      value: referralSummary?.data?.monthlyEarnings,
    },
    {
      title: "Yearly",
      value: referralSummary?.data?.yearlyEarnings || 0,
    },
  ];

  // Ensure you have this somewhere at the top:
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize counts
  const monthlySales: Record<string, number> = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  // Only use data from current year
  const currentYear = new Date().getFullYear();

  allOrdersHistory?.orders?.forEach((order: any) => {
    const date = new Date(order.createdAt);
    if (date.getFullYear() === currentYear) {
      const month = monthLabels[date.getMonth()];
      monthlySales[month]++;
    }
  });

  // Convert to Recharts-friendly format
  const salesChartData = monthLabels.map((month) => ({
    month,
    sales: monthlySales[month],
  }));

  return (
    <div className="flex flex-col gap-8 font-Inter">
      <Helmet>
        <title>PMGURUKKUL | Dashboard</title>
      </Helmet>
      <DashboardHeader
        pageName="Dashboard"
        pageDesc="Get complete overview of your platform."
      />

      {/* Data cards */}
      <div className="grid grid-cols-4 gap-5">
        {data?.map((item) => (
          <div
            key={item.title}
            className={`text-start flex items-center justify-between p-4 bg-white rounded-lg border-[1px] border-[#E2E8F0] font-Inter`}
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
              <img src={item?.icon} alt="" className="" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-10">
        <div className="bg-white w-[70%] rounded-2xl border border-neutral-75 p-4 h-[382px] overflow-hidden">
          {/* Sticky title */}
          <p className="text-neutral-65 mb-4 font-semibold sticky top-0 bg-white z-10">
            Recent Users
          </p>

          {/* Table wrapper */}
          <div className="overflow-y-auto h-[290px]">
            <table className="table-auto w-full text-left">
              <thead className="sticky top-0 bg-neutral-60 z-10 text-neutral-90 text-sm">
                <tr>
                  <th className="px-4 py-2">User ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Mobile Number</th>
                  <th className="px-4 py-2">Joined Date</th>
                </tr>
              </thead>
              {adminStats?.recentUsers?.length > 0 ? (
                <tbody>
                  {adminStats?.recentUsers?.map((user: any, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b">{user?._id}</td>
                      <td className="px-4 py-2 border-b">{user?.full_name}</td>
                      <td className="px-4 py-2 border-b">{user?.email}</td>
                      <td className="px-4 py-2 border-b">{user?.mobileNumber}</td>
                      <td className="px-4 py-2 border-b">{formatDate(user?.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="px-4 py-4 text-center">
                      <div className="flex flex-col gap-3 items-center justify-center">
                        <img src={IMAGES.KycBG} alt="KYC" className="w-52" />
                        <p> No user has joined in the last 5 days.</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>

        <div className="bg-white w-[30%] rounded-2xl border border-neutral-75 p-4 flex flex-col gap-2 h-[382px]">
          <p className="text-neutral-65 font-semibold">Referrals Earnings</p>
          <div className="grid grid-cols-1 items-center gap-3 mt-2">
            {earnings?.map((item) => (
              <div
                key={item?.title}
                className="w-full bg-neutral-60 p-2 rounded-lg flex items-center gap-3"
              >
                <div className="bg-neutral-15/40 size-11 rounded-full flex items-center justify-center text-xl">
                  ₹
                </div>
                <div>
                  <p className="text-sm">{item?.title}</p>
                  <h1 className="text-primary-10 font-bold text-xl mt-1">
                    ₹{item?.value}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Earnings Chart */}
        <div className="bg-white rounded-2xl border border-neutral-75 p-4">
          <p className="text-neutral-65 mb-4 font-semibold">
            Referral Earnings
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={earnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#20B486" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders History Chart */}
        <div className="bg-white rounded-2xl border border-neutral-75 p-4">
          <p className="text-neutral-65 mb-4 font-semibold">
            Monthly Sales (This Year)
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              data={salesChartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="sales" fill="#05b7ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
