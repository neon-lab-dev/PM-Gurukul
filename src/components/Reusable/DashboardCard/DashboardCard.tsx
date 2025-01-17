interface DashboardCardProps {
  title: string;
  count?: string | number;
  width?: string;
}

const DashboardCard = ({ title, count, width }: DashboardCardProps) => {
  return (
    <div
      className={`flex flex-col gap-2 p-4 bg-white rounded-lg border-[1px] border-[#E2E8F0] font-Inter`}
      style={{ minWidth: width ? width : "200px" }}
    >
      <span className="text-[#6B788E] text-base font-normal leading-6 tracking-tight">
        {title}
      </span>
      <span className="text-[#15294B] text-4xl font-bold leading-10 tracking-[-1px]">
        {count}
      </span>
    </div>
  );
};

export default DashboardCard;
