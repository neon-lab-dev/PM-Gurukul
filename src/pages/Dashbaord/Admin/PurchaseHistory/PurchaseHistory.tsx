import { pdf } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';
import { useGetAllOrdersQuery } from '../../../../redux/Features/Admin/adminApi';
import Invoice from './Invoice';
import DashboardHeader from '../../../../components/Reusable/DashboardHeader/DashboardHeader';
import Spinner from '../../../../components/Loaders/Spinner/Spinner';
import { Table } from '../../../../components/ReferralPayoutsPage/TransactionHistory';
import NoDataFound from '../../../../components/Shared/NoDataFound/NoDataFound';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardStatusOrLoader from '../../../../components/Reusable/DashboardStatusOrLoader/DashboardStatusOrLoader';

export type TOrders = {
  _id: string;
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
  createdAt: string;
  __v: number;
};

const PurchaseHistory = () => {
  const navigate = useNavigate();
  const { data: allOrdersHistory, isLoading } = useGetAllOrdersQuery({});
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState<boolean>(false);

  const handleDownloadInvoice = async (order: TOrders) => {
    setIsGeneratingInvoice(true)
    try {
      const blob = await pdf(<Invoice order={order} />).toBlob();
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


  // All orders history user table headers
  const allOrdersHistoryTableHeaders = [
    { key: 'no', label: 'No.', sortable: true },
    { key: 'orderID', label: 'Order #', sortable: true },
    { key: 'customerName', label: 'Customer Name', sortable: true },
    { key: 'mobile', label: 'Mobile Number', sortable: true },
    { key: 'noOfItems', label: 'No. of Items', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
    { key: 'orderDate', label: 'Order Date', sortable: true },
    { key: 'action', label: 'Action', sortable: false },
  ];

  // All orders history user table data
  const allOrdersHistoryTableData = allOrdersHistory?.orders?.length
    ? allOrdersHistory.orders.map((order: TOrders, index: number) => ({
      no: `${index + 1}`,
      orderID: order?._id,
      customerName: order?.user?.full_name,
      mobile: order?.user?.mobileNumber,
      noOfItems: order?.course?.length || 0,
      amount: `₹${order?.totalPrice}`,
      orderDate: new Date(order?.createdAt).toLocaleDateString(),
      action: [
        {
          label: 'View Order',
          onClick: () => navigate(`/admin/order-details/${order._id}`),
        },
        {
          label: `${isGeneratingInvoice ? "Generating Invoice" : "Download Invoice"}`,
          onClick: () => handleDownloadInvoice(order && order)
        },
      ],
    }))
    : [];

    console.log(allOrdersHistory);

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
          }
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
        />
      ) : (
        <NoDataFound message="No order found." />
      )}
    </>
  );
};

export default PurchaseHistory;
