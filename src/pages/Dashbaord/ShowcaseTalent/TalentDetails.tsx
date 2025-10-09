import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaCalendar,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaTrash,
} from "react-icons/fa";
import { FiVideo } from "react-icons/fi";
import {
  useDeleteTalentMutation,
  useGetSingleTalentByIdQuery,
} from "../../../redux/Features/Talent/talentApi";
import { toast } from "sonner";

const TalentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: talentData,
    isLoading,
    error,
  } = useGetSingleTalentByIdQuery(id!);

  const talent = talentData?.data;

  const [deleteTalent] = useDeleteTalentMutation();

  const handleDeleteTalent = async (id: string) => {
    try {
      await toast.promise(deleteTalent(id).unwrap(), {
        loading: "Loading...",
        success: "Deleted successfully!",
        error: "Failed to delete. Please try again.",
      });
      navigate("/admin/talents");
    } catch (err) {
      console.error("Error deleting this item:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#051539]"></div>
      </div>
    );
  }

  if (error || !talent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Talent Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The talent you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/showcase-talent")}
            className="bg-[#051539] text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Back to Talents
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link
            to={"/admin/talents"}
            className="flex items-center gap-2 text-[#051539] hover:text-blue-700 font-medium transition-colors mb-4"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Talents
          </Link>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#051539] mb-4">
                {talent.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="bg-[#051539] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {talent.talentType}
                </span>
                <div className="flex items-center gap-1">
                  <FaCalendar className="w-4 h-4" />
                  <span className="text-sm">
                    Submitted on{" "}
                    {new Date(talent.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteTalent(talent?._id)}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaTrash className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Video and Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="relative pt-[56.25%] bg-gray-900">
                <video
                  className="absolute top-0 left-0 w-full h-full object-contain"
                  controls
                  controlsList="nodownload"
                  preload="metadata"
                >
                  <source src={talent?.video} />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <FiVideo className="w-4 h-4" />
                  <span className="text-sm">Talent Video</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-[#051539] mb-4">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {talent.description}
              </p>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Creator Information */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-[#051539] mb-4">
                Creator Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#051539] rounded-full flex items-center justify-center">
                    <FaUser className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{talent.name}</p>
                    <p className="text-sm text-gray-500">Creator</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-600">{talent.email}</p>
                </div>
              </div>
            </div>

            {/* Skills & Talents */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-[#051539] mb-4">
                Skills & Talents
              </h3>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-[#051539] px-3 py-2 rounded-lg border border-blue-100 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Submission Details */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-[#051539] mb-4">
                Submission Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Submission ID:</span>
                  <span className="font-mono text-gray-900">{talent._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Submitted:</span>
                  <span className="text-gray-900">
                    {new Date(talent.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span className="text-gray-900">
                    {new Date(
                      talent.updatedAt || talent.createdAt
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-[#051539] mb-4">
                Admin Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() =>
                    window.open(
                      `mailto:${talent.email}?subject=Regarding your talent submission&body=Hello ${talent.name},`
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaEnvelope className="w-4 h-4" />
                  Contact Creator
                </button>
                <button
                  onClick={() => handleDeleteTalent(talent._id)}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                  Delete Talent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDetails;
