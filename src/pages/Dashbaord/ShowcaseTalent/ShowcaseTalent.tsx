// pages/ShowcaseTalent.tsx (Tab Version)
import React, { useState } from "react";
import ShowcaseTalentCard from "../../../components/ShowcaseTalentPage/ShowcaseTalentCard/ShowcaseTalentCard";
import TalentSubmissionForm from "../../../components/ShowcaseTalentPage/TalentSubmissionForm/TalentSubmissionForm";
import { useGetMyTalentsQuery } from "../../../redux/Features/Talent/talentApi";

const ShowcaseTalent: React.FC = () => {
    const [filter, setFilter] = useState("All");
    const {data:myTalents} = useGetMyTalentsQuery({talentType: filter});
  const [activeTab, setActiveTab] = useState<"browse" | "submit">("browse");

  const talentTypes = [
    "All",
    "Music",
    "Dance",
    "Art",
    "Sports",
    "Technology",
    "Public Speaking",
    "Writing",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#051539] mb-4">
            Talent Showcase
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing talents from our community of students and
            creators. Share your own talent and inspire others!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("browse")}
            className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors ${
              activeTab === "browse"
                ? "text-[#051539] border-b-2 border-[#051539]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Browse Talents
          </button>
          <button
            onClick={() => setActiveTab("submit")}
            className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors ${
              activeTab === "submit"
                ? "text-[#051539] border-b-2 border-[#051539]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Showcase Your Talent
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "browse" ? (
          <>
            {/* Filter Section */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {talentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      filter === type
                        ? "bg-[#051539] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {myTalents?.data?.length || 0} talent
                {myTalents?.data?.length !== 1 ? "s" : ""}
                {filter !== "All" && ` in ${filter}`}
              </p>
            </div>

            {/* Talent Grid */}
            {myTalents?.data?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myTalents?.data?.map((talent) => (
                  <ShowcaseTalentCard key={talent._id} {...talent} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No talents found
                </h3>
                <p className="text-gray-500">
                  {filter === "All"
                    ? "Be the first to showcase your talent!"
                    : `No ${filter.toLowerCase()} talents found. Try another category.`}
                </p>
              </div>
            )}
          </>
        ) : (
          <TalentSubmissionForm setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
};

export default ShowcaseTalent;
