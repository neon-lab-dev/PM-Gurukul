const ThreadCardLoader = () => {
  return (
   <div className="flex flex-col bg-gray-100 rounded-xl p-4 gap-2 w-full animate-pulse">
  <div className="flex items-center justify-between">
    {/* Avatar + User Info */}
    <div className="flex items-center gap-2">
      <div className="bg-white size-8 rounded-full p-1">
        <div className="size-7 rounded-full bg-gray-300" />
      </div>
      <div className="space-y-1">
        <div className="h-3 w-28 bg-gray-300 rounded" />
        <div className="h-2 w-20 bg-gray-200 rounded" />
      </div>
    </div>

    {/* View Replies Button */}
    <div className="h-6 w-24 bg-gray-300 rounded" />
  </div>

  {/* Thread Title + Content */}
  <div className="mt-2 space-y-2">
    <div className="h-4 w-40 bg-gray-300 rounded" />
    <div className="h-3 w-full bg-gray-200 rounded" />
    <div className="h-3 w-3/4 bg-gray-200 rounded" />
  </div>
</div>

  );
};

export default ThreadCardLoader;
