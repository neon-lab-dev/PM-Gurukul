// components/ShowcaseTalentCard.tsx
import React from "react";
import { FiCalendar, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { useDeleteTalentMutation } from "../../../redux/Features/Talent/talentApi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";

export interface TalentCardProps {
  _id: string;
  title: string;
  name: string;
  talentType: string;
  video: string;
  description: string;
  skills: string[];
  createdAt: Date;
  isAdmin: boolean;
}

const ShowcaseTalentCard: React.FC<TalentCardProps> = ({
  _id,
  title,
  talentType,
  video,
  description,
  skills,
  createdAt,
  isAdmin,
}) => {
  const [deleteTalent] = useDeleteTalentMutation();

  const handleDeleteTalent = async (id: string) => {
    try {
      await toast.promise(deleteTalent(id).unwrap(), {
        loading: "Loading...",
        success: "Deleted successfully!",
        error: "Failed to delete. Please try again.",
      });
    } catch (err) {
      console.error("Error deleting this item:", err);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Video Player */}
      <div className="relative pt-[56.25%] bg-gray-900">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          controls
          preload="metadata"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-[#051539]">{title}</h3>
          <span className="bg-[#051539] text-white text-xs px-3 py-1 rounded-full font-medium">
            {talentType}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-50 text-[#051539] text-xs px-2 py-1 rounded border border-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FiCalendar className="w-4 h-4" />
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                to={`/admin/talent/${_id}`}
                className="flex items-center gap-2 text-gray-500 text-sm font-medium transition-colors"
              >
                <BsEye className="w-4 h-4" />
                View
              </Link>
            )}
            <button
              onClick={() => handleDeleteTalent(_id)}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseTalentCard;
