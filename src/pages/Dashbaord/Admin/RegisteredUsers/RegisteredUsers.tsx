import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import { Table } from "../../../../components/ReferralPayoutsPage/TransactionHistory";
import {
  useGetAllUserQuery,
  useWithdrawSuspensionMutation,
} from "../../../../redux/Features/Admin/adminApi";
import { formatDate } from "../../../../utils/formatDate";
import NoDataFound from "../../../../components/Shared/NoDataFound/NoDataFound";
import Spinner from "../../../../components/Loaders/Spinner/Spinner";
import { TUser } from "../../../../types/user.types";
import { Helmet } from "react-helmet-async";
import DashboardStatusOrLoader from "../../../../components/Reusable/DashboardStatusOrLoader/DashboardStatusOrLoader";
import { useState } from "react";
import SuspendUserModal from "../../../../components/Dashboard/Admin/RegisteredUsersPage/SuspendUserModal/SuspendUserModal";
import { toast } from "sonner";

const RegisteredUsers = () => {
  const [isSuspendUserModalOpen, setIsSuspendUserModalOpen] =
    useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const { data: allUsers, isLoading } = useGetAllUserQuery({});

  const [withdrawSuspension] = useWithdrawSuspensionMutation();

  const handleWithdrawSuspension = async (userId: string) => {
    const payload = { userId };

    await toast.promise(withdrawSuspension(payload).unwrap(), {
      loading: "Withdrawing suspension...",
      success: "Suspension withdrawn successfully!",
      error: "Failed to withdraw suspension. Please try again.",
    });
    window.location.reload();
  };

  // Registered user table headers
  const headers = [
    { key: "userId", label: "User ID", sortable: true },
    { key: "fullName", label: "Full Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "mobile", label: "Mobile", sortable: true },
    { key: "joined", label: "Joined", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "action", label: "Action", sortable: false },
  ];

  // Registered user table data
  const registeredUsersData = allUsers?.users?.length
    ? allUsers?.users?.map((user: TUser, index: number) => ({
        no: `${index + 1}`,
        userId: user?._id,
        fullName: user?.full_name,
        email: user?.email,
        mobile: user?.mobileNumber,
        joined: formatDate(user?.createdAt),
        role: user?.role,
        status: (
          <p
            className={`font-semibold text-sm px-3 py-1 rounded-full inline-block ${
              user?.status === "suspended"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {user?.status === "suspended" ? "Suspended" : "Active"}
          </p>
        ),

        action: [
          {
            label: "Suspend",
            onClick: () => {
              setIsSuspendUserModalOpen(true);
              setSelectedUserId(user?._id);
            },
          },
          {
            label: "Activate",
            onClick: () => {
              handleWithdrawSuspension(user?._id);
            },
          },
        ],
      }))
    : [];

  return (
    <>
      <Helmet>
        <title>PMGURUKKUL | Registered Users</title>
      </Helmet>
      <div className="flex items-center justify-between w-full">
        <DashboardHeader
          pageName="Registered Users"
          pageDesc="Manage and View User Details"
        />
      </div>
      <DashboardStatusOrLoader
        statusCardInfo={[
          {
            title: "Total Users",
            valueCount: allUsers?.users?.length || 0,
          },
        ]}
        isLoading={isLoading}
      />
      {isLoading ? (
        <div className="flex items-center justify-center mt-5">
          <Spinner />
        </div>
      ) : registeredUsersData?.length > 0 ? (
        <Table data={registeredUsersData} headers={headers} showHeader={true} />
      ) : (
        <NoDataFound message={"No registered user found."} />
      )}

      <SuspendUserModal
        isModalOpen={isSuspendUserModalOpen}
        setIsModalOpen={setIsSuspendUserModalOpen}
        selectedUserId={selectedUserId}
      />
    </>
  );
};

export default RegisteredUsers;
