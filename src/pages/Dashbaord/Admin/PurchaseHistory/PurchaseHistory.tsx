import { pdf } from "@react-pdf/renderer";
import { useGetAllOrdersQuery } from "../../../../redux/Features/Admin/adminApi";
import Invoice from "./Invoice";
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import Spinner from "../../../../components/Loaders/Spinner/Spinner";
import { Table } from "../../../../components/ReferralPayoutsPage/TransactionHistory";
import NoDataFound from "../../../../components/Shared/NoDataFound/NoDataFound";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import DashboardStatusOrLoader from "../../../../components/Reusable/DashboardStatusOrLoader/DashboardStatusOrLoader";
import { useCancelOrderMutation } from "../../../../redux/Features/User/userApi";
import { toast } from "sonner";

export type TOrders = {
  _id: string;
  orderId : string;
  paymentId: string;
  user: {
    _id: string;
    mobileNumber: string;
    full_name: string;
  };
  course: string[];
  discountedPrice: number;
  gst: number;
  totalPrice: number;
  commission: number;
  tds: number;
  amountCredited: number;
  status: "paid" | "cancelled";
  orderType: "singleCourse" | "bundleCourse";
  bundleTitle: string | null;
  createdAt: string;
  __v: number;
};

const PurchaseHistory = () => {
  // const navigate = useNavigate();
  const { data: allOrdersHistory, isLoading } = useGetAllOrdersQuery({});
  const [isGeneratingInvoice, setIsGeneratingInvoice] =
    useState<boolean>(false);

  const handleDownloadInvoice = async (order: TOrders) => {
    setIsGeneratingInvoice(true);
    try {
      const blob = await pdf(<Invoice order={order} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice_${order._id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsGeneratingInvoice(false);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      setIsGeneratingInvoice(false);
    }
  };

  // All orders history user table headers
  const allOrdersHistoryTableHeaders = [
    { key: "no", label: "No.", sortable: true },
    { key: "orderID", label: "Order", sortable: true },
    { key: "customerName", label: "Customer Name", sortable: true },
    { key: "mobile", label: "Mobile Number", sortable: true },
    { key: "noOfItems", label: "No. of Items", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "orderDate", label: "Order Date", sortable: true },
    { key: "orderType", label: "Order type", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "action", label: "Action", sortable: false },
  ];

  const [cancelOrder] = useCancelOrderMutation();

  const handleCancelOrder = async (id: string, createdAt: string) => {
    const now = new Date();
    const orderCreatedAt = new Date(createdAt);
    const hoursSinceOrder =
      (now.getTime() - orderCreatedAt.getTime()) / (1000 * 60 * 60);

    if (hoursSinceOrder > 24) {
      // Show toast error
      toast.error("Cannot cancel this order now. 24 hours have passed.");
      return;
    }
    try {
      await toast.promise(cancelOrder(id).unwrap(), {
        loading: "Loading...",
        success: "Order cancelled successfully!",
        error: "Failed to cancel order. Please try again.",
      });
    } catch (err) {
      console.error("Error canceling this order:", err);
    }
  };

  // All orders history user table data
  const allOrdersHistoryTableData = allOrdersHistory?.orders?.length
    ? allOrdersHistory.orders.map((order: TOrders, index: number) => {
        // Calculate time difference for cancel option
        const createdAt = new Date(order?.createdAt);
        const now = new Date();
        const hoursSinceOrder =
          (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60); // in hours
        const canCancel =
          hoursSinceOrder <= 24 && order?.status !== "cancelled";

        return {
          no: `${index + 1}`,
          orderID: `#${order?.orderId}`,
          customerName: order?.user?.full_name,
          mobile: order?.user?.mobileNumber,
          noOfItems: order?.course?.length || 0,
          amount: `₹${order?.totalPrice}`,
          orderDate: createdAt.toLocaleDateString(),
          orderType:
            order?.orderType === "bundleCourse"
              ? "Bundle Course"
              : "Single Course",
          status: (
            <span
              className={`${order?.status === "cancelled" ? "text-white bg-red-600 " : "text-white bg-green-500"} px-1.5 py-1 rounded text-xs`}
            >
              {order?.status === "cancelled" ? "Cancelled" : "Paid"}
            </span>
          ),
          action: [
            // {
            //   label: "View Order",
            //   onClick: () => navigate(`/admin/order-details/${order._id}`),
            // },
            {
              label: `${isGeneratingInvoice ? "Generating Invoice" : "Download Invoice"}`,
              onClick: () => handleDownloadInvoice(order),
            },
            {
              label: "Cancel Order",
              onClick: () => handleCancelOrder(order?._id, order?.createdAt),
              disabled: !canCancel, // disable button if 24 hours passed
            },
          ],
        };
      })
    : [];

  return (
    <>
      <Helmet>
        <title>PMGURUKKUL | Purchase Histories</title>
      </Helmet>
      <div className="flex items-center justify-between w-full">
        <DashboardHeader
          pageName="Purchase History"
          pageDesc="Track and Review Past Orders"
        />
      </div>
      {/* Status cards */}
      <DashboardStatusOrLoader
        statusCardInfo={[
          {
            title: "Total Orders",
            valueCount: allOrdersHistory?.orders?.length,
          },
        ]}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div className="flex items-center justify-center mt-5">
          <Spinner />
        </div>
      ) : allOrdersHistoryTableData.length > 0 ? (
        <Table
          headers={allOrdersHistoryTableHeaders}
          data={allOrdersHistoryTableData}
          showHeader={true}
          pageName="Purchase History"
        />
      ) : (
        <NoDataFound message="No order found." />
      )}
    </>
  );
};

export default PurchaseHistory;
