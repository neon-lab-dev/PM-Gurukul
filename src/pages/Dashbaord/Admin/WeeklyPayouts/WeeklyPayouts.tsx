/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import { Table } from "../../../../components/ReferralPayoutsPage/TransactionHistory";
import {
  // useApprovePayoutMutation,
  useApproveWeeklyPayoutMutation,
  // useGetAllEarningsQuery,
  useGetWeeklyPayoutsQuery,
} from "../../../../redux/Features/Admin/adminApi";
// import { formatDate } from "../../../../utils/formatDate";
import Spinner from "../../../../components/Loaders/Spinner/Spinner";
import NoDataFound from "../../../../components/Shared/NoDataFound/NoDataFound";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import DashboardStatusOrLoader from "../../../../components/Reusable/DashboardStatusOrLoader/DashboardStatusOrLoader";
import Ripple from "../../../../components/Reusable/Ripple/Ripple";
import usePayoutStatus from "../../../../Providers/PayoutStatusProvider/usePayoutStatus";
import { ICONS } from "../../../../assets";

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
        <div className="flex flex-col gap-5 items-center justify-center mt-10">
          <img src={ICONS.notAllowed} alt="" className="size-[200px]" />
          <h1 className="text-2xl font-semibold">
            Payouts can only be generated on Tuesdays!
          </h1>
          <Ripple styles="rounded-xl">
            <button
              onClick={generatePayouts}
              className="px-7 py-[14px] border border-primary-10 rounded-[14px] bg-primary-10 text-white font-semibold text-xl leading-6"
            >
              Generate Payouts
            </button>
          </Ripple>
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
          />
        ) : (
          <NoDataFound message={"No pending payout found."} />
        ))}
    </>
  );
};

export default WeeklyPayouts;
