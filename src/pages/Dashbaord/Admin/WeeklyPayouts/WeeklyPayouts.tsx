/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import { Table } from "../../../../components/ReferralPayoutsPage/TransactionHistory";
import {
  useApproveWeeklyPayoutMutation,
  useGetWeeklyPayoutsQuery,
} from "../../../../redux/Features/Admin/adminApi";
import Spinner from "../../../../components/Loaders/Spinner/Spinner";
import NoDataFound from "../../../../components/Shared/NoDataFound/NoDataFound";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import DashboardStatusOrLoader from "../../../../components/Reusable/DashboardStatusOrLoader/DashboardStatusOrLoader";
import usePayoutStatus from "../../../../Providers/PayoutStatusProvider/usePayoutStatus";
import { FaCalendarDay, FaLock, FaRegCalendarCheck } from "react-icons/fa";

const WeeklyPayouts = () => {
  const { data: allWeeklyPayouts, isLoading } = useGetWeeklyPayoutsQuery({});
  const [approveWeeklyPayout] = useApproveWeeklyPayoutMutation();

  const handleApprovePayout = async (id: string) => {
    try {
      await toast.promise(approveWeeklyPayout(id).unwrap(), {
        loading: "Loading...",
        success: "Payout approved successfully!",
        error: "Failed to approve payout. Please try again.",
      });
    } catch (err) {
      console.error("Error approving payout:", err);
    }
  };

  // All earnings table headers
  const allWeeklyPayoutTableHeaders = [
    { key: "no", label: "No.", sortable: true },
    { key: "affiliateName", label: "Affiliate Name", sortable: true },
    { key: "mobile", label: "MOBILE", sortable: true },
    { key: "payoutDate", label: "Payout Date", sortable: true },
    { key: "totalAmount", label: "Total Amount", sortable: true },
    { key: "payoutStatus", label: "Payout Status", sortable: true },
    { key: "action", label: "Action", sortable: true },
  ];

  // All earnings user table data
  const allWeeklyPayoutTableData = allWeeklyPayouts?.data?.length
    ? allWeeklyPayouts?.data?.map((data: any, index: number) => ({
        no: `${index + 1}`,
        affiliateName: data?.name,
        mobile: data?.mobileNumber,
        payoutDate: "test date",
        totalAmount: `₹${data?.totalAmountCredited}`,
        payoutStatus: data?.status,
        action: [
          {
            label: "Approve Payout",
            onClick: () => handleApprovePayout(data?.userId),
          },
        ],
      }))
    : [];

  const { showPayouts, generatePayouts } = usePayoutStatus();

  return (
    <>
      <Helmet>
        <title>PMGURUKKUL | Manage Payouts</title>
      </Helmet>
      <div className="flex items-center justify-between w-full">
        <DashboardHeader
          pageName="Weekly Pending Payouts"
          pageDesc="Manage All Weekly Pending Payments"
        />
      </div>
      {/* Status cards */}
      {showPayouts && (
        <DashboardStatusOrLoader
          statusCardInfo={[
            {
              title: "Total Pending Payouts",
              valueCount: allWeeklyPayouts?.data?.length,
            },
          ]}
          isLoading={isLoading}
        />
      )}

      {!showPayouts && (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            {/* Icon Section */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-orange-200">
                  <FaLock className="w-12 h-12 text-orange-500" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <FaCalendarDay className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Payout Schedule Restriction
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Payouts can only be generated on{" "}
                  <span className="font-semibold text-orange-600">
                    Tuesdays
                  </span>
                </p>
              </div>

              {/* Current Day Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-center gap-3 text-blue-700">
                  <FaRegCalendarCheck className="w-5 h-5" />
                  <span className="font-medium">
                    Today is{" "}
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Next Available Date */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Next available:</span> Coming
                  Tuesday
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={generatePayouts}
                  disabled
                  className="w-full max-w-xs mx-auto px-8 py-4 bg-gray-300 text-gray-500 rounded-xl font-semibold text-lg leading-6 cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-sm"
                >
                  <FaLock className="w-5 h-5" />
                  Generate Payouts
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  This feature will be available on Tuesday
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPayouts &&
        (isLoading ? (
          <div className="flex items-center justify-center mt-5">
            <Spinner />
          </div>
        ) : allWeeklyPayoutTableData?.length > 0 ? (
          <Table
            headers={allWeeklyPayoutTableHeaders}
            data={allWeeklyPayoutTableData}
            showHeader={true}
            pageName="Weekly Pending Payouts"
          />
        ) : (
          <NoDataFound message={"No pending payout found."} />
        ))}
    </>
  );
};

export default WeeklyPayouts;
