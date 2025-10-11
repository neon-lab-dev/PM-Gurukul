// TestimonialCardLoader.tsx
import React from "react";

const TestimonialCardLoader: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border animate-pulse">
      {/* Video / Image Skeleton */}
      <div className="w-full h-48 bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Rating & Type */}
        <div className="flex items-center space-x-2">
          <div className="w-16 h-3 bg-gray-300 rounded"></div>
          <div className="w-10 h-3 bg-gray-300 rounded"></div>
        </div>

        {/* Review Text */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-gray-300 rounded"></div>
          <div className="w-5/6 h-3 bg-gray-300 rounded"></div>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-gray-200"></div>
          <div className="flex flex-col space-y-2">
            <div className="w-24 h-3 bg-gray-300 rounded"></div>
            <div className="w-16 h-2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCardLoader;
