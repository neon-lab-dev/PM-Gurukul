// components/ShowcaseTalentCard.tsx
import React from 'react';

export interface TalentCardProps {
  id: string;
  name: string;
  email: string;
  talentType: string;
  videoUrl: string;
  description: string;
  skills: string[];
  submittedDate: string;
}

const ShowcaseTalentCard: React.FC<TalentCardProps> = ({
  name,
  email,
  talentType,
  videoUrl,
  description,
  skills,
  submittedDate,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Video Player */}
      <div className="relative pt-[56.25%] bg-gray-900">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          controls
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-[#051539]">{name}</h3>
          <span className="bg-[#051539] text-white text-xs px-3 py-1 rounded-full font-medium">
            {talentType}
          </span>
        </div>

        {/* Email */}
        <p className="text-gray-600 text-sm mb-4">{email}</p>

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
          <span className="text-gray-500 text-sm">
            {new Date(submittedDate).toLocaleDateString()}
          </span>
          <button className="text-[#051539] hover:text-blue-700 text-sm font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseTalentCard;