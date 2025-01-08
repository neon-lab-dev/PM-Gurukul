import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import DashboardCard from "../../../../components/Reusable/DashboardCard/DashboardCard";

const RegisteredUsers = () => {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <DashboardHeader
          pageName="Registered Users"
          pageDesc="Write something here."
        />
      </div>
      <div className="flex items-center justify-start w-full flex-wrap gap-4">
        <DashboardCard title="Content" count={"00.00%"} />
        <DashboardCard title="Content" count={"00.00%"} />
        <DashboardCard title="Content" count={200} />
        <DashboardCard title="Content" count={"00.00%"} />
        <DashboardCard title="Content" count={"00.00%"} />
        <DashboardCard title="Content" count={200} />
        <DashboardCard title="Content" count={"00.00%"} />
        <DashboardCard title="Content" count={200} />
        <DashboardCard title="Content" count={"00.00%"} />
        <DashboardCard title="Content" count={"00.00%"} />
        <DashboardCard title="Content" count={"00.00%"} />
        <DashboardCard title="Content" count={200} />
        <DashboardCard title="Content" count={"00.00%"} />
        <DashboardCard title="Content" count={"00.00%"} />
      </div>
    </>
  );
};

export default RegisteredUsers;
