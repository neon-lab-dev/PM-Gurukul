import { Helmet } from "react-helmet-async";
import Spinner from "../../../../components/Loaders/Spinner/Spinner";
import { Table } from "../../../../components/ReferralPayoutsPage/TransactionHistory";
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import NoDataFound from "../../../../components/Shared/NoDataFound/NoDataFound";
import {
  useCancelOrderMutation,
  useGetMeQuery,
  useMyOrdersQuery,
} from "../../../../redux/Features/User/userApi";
import { useState } from "react";
import Invoice from "../../Admin/PurchaseHistory/Invoice";
import { pdf } from "@react-pdf/renderer";
import { TOrders } from "../../Admin/PurchaseHistory/PurchaseHistory";
import { toast } from "sonner";

type TMyOrders = {
  _id: string;
  user: string;
  course: string[];
  discountedPrice: number;
  gst: number;
  totalPrice: number;
  commission: number;
  tds: number;
  amountCredited: number;
  status: "paid" | "cancelled";
  createdAt: string;
  __v: number;
};

type TCombinedOrders = TMyOrders & TOrders;

const MyOrders = () => {
  const { data: myOrders, isLoading } = useMyOrdersQuery({});
  const { data: user } = useGetMeQuery({});

  const myOrdersTableHeaders = [
    { key: "no", label: "NO.", sortable: true },
    { key: "orderId", label: "Order #", sortable: true },
    { key: "noOfItems", label: "No. of Items", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "action", label: "Action" },
  ];

  const [isGeneratingInvoice, setIsGeneratingInvoice] =
    useState<boolean>(false);

  const handleDownloadInvoice = async (order: TOrders) => {
    setIsGeneratingInvoice(true);
    try {
      const companyDetails = {
        gstNumber: user?.user?.gstNumber,
        gstCompanyName: user?.user?.gstCompanyName,
      };
      const blob = await pdf(
        <Invoice order={order} companyDetails={companyDetails} />
      ).toBlob();
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

  const [cancelOrder] = useCancelOrderMutation();

  const handleCancelOrder = async (id: string, createdAt: string) => {
    const now = new Date();
    const orderCreatedAt = new Date(createdAt);
    const hoursSinceOrder =
      (now.getTime() - orderCreatedAt.getTime()) / (1000 * 60 * 60);

    if (hoursSinceOrder > 24) {
      // Show toast error
      toast.error("You cannot cancel this order now. 24 hours have passed.");
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

  // Table data
  const myOrdersTableData = myOrders?.orders?.length
    ? myOrders.orders.map((order: TCombinedOrders, index: number) => {
        const createdAt = new Date(order?.createdAt);
        const now = new Date();
        const hoursSinceOrder =
          (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
        const canCancel =
          hoursSinceOrder <= 24 && order?.status !== "cancelled";

        return {
          no: `${index + 1}`,
          orderId: order?._id,
          noOfItems: order?.course?.length,
          amount: `₹${order?.totalPrice}`,
          action: [
            {
              label: `${
                isGeneratingInvoice ? "Generating Invoice" : "Download Invoice"
              }`,
              onClick: () => handleDownloadInvoice(order),
            },
            {
              label: `Cancel Order`,
              onClick: () => handleCancelOrder(order?._id, order?.createdAt),
              disabled: !canCancel,
            },
          ],
        };
      })
    : [];

  return (
    <div>
      <Helmet>
        <title>PMGURUKKUL |My Orders</title>
      </Helmet>
      <DashboardHeader
        pageName="My Orders"
        pageDesc="View Your Recent Order History"
      />

      <div className="mt-8">
        {/* Show loading state or table */}
        {isLoading ? (
          <div className="flex items-center justify-center mt-20">
            <Spinner />
          </div>
        ) : myOrdersTableData.length > 0 ? (
          <Table
            data={myOrdersTableData}
            headers={myOrdersTableHeaders}
            showHeader={true}
            pageName="My Orders"
          />
        ) : (
          <NoDataFound
            message={"You haven’t Enrolled on any course"}
            isBtnAvailable={true}
          />
        )}
      </div>
    </div>
  );
};

export default MyOrders;
