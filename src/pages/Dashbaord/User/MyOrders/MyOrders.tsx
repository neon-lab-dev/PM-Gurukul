import { Helmet } from "react-helmet-async";
import Spinner from "../../../../components/Loaders/Spinner/Spinner";
import { Table } from "../../../../components/ReferralPayoutsPage/TransactionHistory";
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import NoDataFound from "../../../../components/Shared/NoDataFound/NoDataFound";
import { useGetMeQuery, useMyOrdersQuery } from "../../../../redux/Features/User/userApi";
import { useState } from "react";
import Invoice from "../../Admin/PurchaseHistory/Invoice";
import { pdf } from "@react-pdf/renderer";
import { TOrders } from "../../Admin/PurchaseHistory/PurchaseHistory";

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
  createdAt: string; // ISO date string
  __v: number;
}

type TCombinedOrders = TMyOrders & TOrders;


const MyOrders = () => {
  const { data: myOrders, isLoading } = useMyOrdersQuery({});
  const { data: user } = useGetMeQuery({});

  const myOrdersTableHeaders = [
    { key: "no", label: "NO.", sortable: true },
    { key: "orderId", label: "Order #", sortable: true },
    { key: "noOfItems", label: "No. of Items", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "action", label: "Action" },
  ];

  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState<boolean>(false);

  const handleDownloadInvoice = async (order: TOrders) => {
    setIsGeneratingInvoice(true)
    try {
      const companyDetails = {
        gstNumber: user?.user?.gstNumber,
        gstCompanyName: user?.user?.gstCompanyName,
      }
      const blob = await pdf(<Invoice order={order} companyDetails={companyDetails} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_${order._id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsGeneratingInvoice(false);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      setIsGeneratingInvoice(false);
    }
  };

  // Table data
  const myOrdersTableData = myOrders?.orders?.length
    ? myOrders?.orders?.map((order: TCombinedOrders, index: number) => ({
      no: `${index + 1}`,
      orderId: order?._id,
      noOfItems: order?.course?.length,
      amount: `₹${order?.totalPrice}`,
      action: [
        {
          label: `${isGeneratingInvoice ? "Generating Invoice" : "Download Invoice"}`,
          onClick: () => handleDownloadInvoice(order && order)
        },
      ],
    }))
    : [];

  return (
    <div>
      <Helmet>
        <title>PMGURUKKUL |My Orders</title>
      </Helmet>
      <DashboardHeader pageName="My Orders" pageDesc="View Your Recent Order History" />

      <div className="mt-8">
        {/* Show loading state or table */}
        {isLoading ? (
          <div className="flex items-center justify-center mt-20">
            <Spinner />
          </div>
        ) : myOrdersTableData.length > 0 ? (
          <Table data={myOrdersTableData} headers={myOrdersTableHeaders} showHeader={true} />
        ) : (
          <NoDataFound message={"You haven’t Enrolled on any course"} isBtnAvailable={true} />
        )}
      </div>
    </div>
  );
};

export default MyOrders;
