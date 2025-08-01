/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import { TLoggedInUser } from "../../../../types/user.types";
import { useState } from "react";
import { useMyReferralSummaryQuery } from "../../../../redux/Features/User/userApi";
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import { ICONS } from "../../../../assets";
import ReferralLoader from "../../../../components/Loaders/ReferralLoader/ReferralLoader";
import Spinner from "../../../../components/Loaders/Spinner/Spinner";
import { Table } from "../../../../components/ReferralPayoutsPage/TransactionHistory";
import NoDataFound from "../../../../components/Shared/NoDataFound/NoDataFound";
import { Helmet } from "react-helmet-async";

interface ReferralPayoutData {
  sl: string;
  purchasedDate: string;
  customerName: string;
  courseName: string;
  amountEarned: string;
}

type TRefferedUser = {
  email: string;
  name: string;
  mobileNumber: string;
  id: string;
  purchasedCourses: string[];
};

const ReferralsAndPayouts = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { data: referralSummary, isLoading } = useMyReferralSummaryQuery({});
  const referralTransactions = referralSummary?.data?.referredUsers?.filter(
    (data: TRefferedUser) => data?.purchasedCourses?.length > 0
  );
  const handleCopy = () => {
    const referralCode = user?.referralCode;
    navigator.clipboard.writeText(referralCode).then(() => {
      setIsCopied(true);
    });
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  

  // Daily, Weekly & Monthly earnings status
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

  const referralPayoutTableHeaders = [
    { key: "sl", label: "SR.NO.", sortable: true },
    { key: "purchasedDate", label: "DATE OF PURCHASE", sortable: true },
    { key: "customerName", label: "CUSTOMER NAME", sortable: true },
    { key: "courseName", label: "COURSE", sortable: true },
    { key: "amountEarned", label: "AMOUNT EARNED", sortable: true },
  ];

  const referralPayoutTableData: ReferralPayoutData[] = [];

  if (referralTransactions?.length > 0) {
    referralTransactions.forEach((user: any) => {
      user?.purchasedCourses?.forEach((course: any, courseIndex: number) => {
        referralPayoutTableData?.push({
          sl: `${courseIndex + 1}`,
          purchasedDate: new Date(course?.dateOfPurchase).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }
          ),
          customerName: user?.name,
          courseName: course?.courseTitle,
          amountEarned: `₹${course?.amountCredited}`,
        });
      });
    });
  }
  return (
    <div className="flex flex-col gap-8">
      <Helmet>
        <title>PMGURUKKUL | Referrals & Payouts</title>
      </Helmet>
      <div className="flex justify-between items-center">
        <DashboardHeader
          pageName="Referrals & Payouts"
          pageDesc="Track Earnings and Referral Status"
        />
        {/* Referral Code */}
        <div className="flex justify-between items-center bg-white rounded-lg border border-neutral-75">
          <div className="flex flex-col px-4">
            <p className="text-neutral-10">Referral Code</p>
            <p className="text-primary-10 text-lg font-semibold">
              {user?.referralCode}
            </p>
          </div>
          <div
            onClick={handleCopy}
            className="bg-neutral-15 p-4 rounded-r-lg cursor-pointer"
            title="Copy to clipboard"
          >
            {isCopied ? (
              <svg
                width="30"
                height="30"
                viewBox="0 0 72 72"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="checkmark"
                  fill="none"
                  stroke="#4CAF50"
                  stroke-width="6"
                  d="M18 36 L30 48 L54 24"
                />
              </svg>
            ) : (
              <img src={ICONS.Copy} alt="Copy" className="" />
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <ReferralLoader />
      ) : (
        <div className="flex flex-row flex-wrap xl:flex-nowrap justify-between items-center gap-6">
          <div className="bg-white w-[55%] rounded-2xl border border-neutral-75 h-full p-6 flex flex-col gap-2 ">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <p className="text-neutral-65">My Earnings</p>
                <img src={ICONS.InfoCircle} alt="commission" className="" />
              </div>
              <select className=" p-2 rounded-lg bg-neutral-60">
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              {earnings?.map((item) => (
                <div
                  key={item?.title}
                  className="w-full bg-neutral-60 p-2 rounded-lg flex items-center gap-3"
                >
                  <div className="bg-neutral-15/40 size-9 rounded-full flex items-center justify-center text-xl">
                    ₹
                  </div>
                  <div>
                    <p className="text-sm">{item?.title}</p>
                    <h1 className="text-primary-10 font-bold">
                      ₹{item?.value}
                    </h1>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="border-t border-neutral-45">
              <div className="flex justify-start gap-2 py-3 items-center p-6">
                <div className="bg-neutral-80 rounded-[100px] p-3">
                  <img src={ICONS.Wallet} />
                </div>
                <p className="text-neutral-10 border-r-2 border-neutral-15 pr-2">
                  Approved Payout
                </p>
                <p className="text-primary-10 text-lg font-semibold">₹2,304</p>
              </div>
            </div> */}
          </div>

          <div className="flex flex-col w-[45%] gap-5">
            <div className="flex gap-5">
              <div className="flex gap-3 bg-white border border-neutral-75 max-h-[100px] w-full rounded-2xl p-6">
                <div className="flex justify-center items-center h-14 w-14 bg-neutral-80 rounded-[100px] p-3">
                  <p className="text-primary-10 font-bold text-4xl">₹</p>
                </div>
                <div>
                  <p className="text-neutral-10 ">Total Earnings</p>
                  <p className="text-primary-10 text-xl font-semibold">
                    ₹{referralSummary?.data?.totalEarnings}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 bg-white border border-neutral-75 max-h-[100px] w-full rounded-2xl p-6">
                <div className="flex justify-center items-center h-14 w-14 bg-neutral-80 rounded-[100px] p-3">
                  <img src={ICONS.ShareCircle} alt="share" className="" />
                </div>
                <div>
                  <p className="text-neutral-10 ">Total Referrals</p>
                  <p className="text-primary-10 text-xl font-semibold">
                    {referralSummary?.data?.referredUsers?.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 bg-white border border-neutral-75 max-h-[100px] w-full rounded-2xl p-6">
              <div className="flex justify-center items-center h-14 w-14 bg-neutral-80 rounded-[100px] p-3">
                <img src={ICONS.ClockCircle} alt="share" className="" />
              </div>
              <div>
                <p className="text-neutral-10 ">Total Duration</p>
                <p className="text-primary-10 text-xl font-semibold">
                  {referralSummary?.data?.durationOnPlatform}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col ">
        <h1 className="text-lg font-semibold mb-4">Transaction History</h1>
        {isLoading ? (
          <div className="flex items-center justify-center mt-5">
            <Spinner />
          </div>
        ) : referralPayoutTableData?.length > 0 ? (
          <Table
            data={referralPayoutTableData}
            headers={referralPayoutTableHeaders}
            showHeader={true}
          />
        ) : (
          <NoDataFound message={"You haven't made any transaction yet."} />
        )}
      </div>
    </div>
  );
};

export default ReferralsAndPayouts;
