import { FaFileAlt } from "react-icons/fa";

const DashboardLoader = () => {
  return (
    <div className="flex flex-col gap-8 font-Inter">
      <div className="h-10 w-1/3 bg-gray-200 rounded-md animate-pulse" />
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left Side: Cards */}
        <div className="lg:w-[70%] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-8 bg-gray-300 rounded w-1/2 animate-pulse" />
              </div>
              <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        {/* Right Side: Business Plan Card */}
        <div className="lg:w-[30%] flex-1 p-6 bg-white rounded-xl border border-gray-200 flex flex-col gap-4 relative overflow-hidden animate-pulse">
          {/* Background Graphic */}
          <div className="absolute top-4 right-4 opacity-10">
            <FaFileAlt className="w-20 h-20 text-gray-300" />
          </div>

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gray-300 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              Business Plan
            </span>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-12 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>

          <div className="mt-6 h-10 bg-gray-300 rounded w-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
