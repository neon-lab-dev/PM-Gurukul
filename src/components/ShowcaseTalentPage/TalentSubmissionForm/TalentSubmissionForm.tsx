import React, { useState, useRef } from "react";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import SelectDropdown from "../../Reusable/Dropdown/SelectDropdown";
import Textarea from "../../Reusable/TextArea/TextArea";

export interface TalentSubmission {
  title: string;
  name: string;
  email: string;
  talentType: string;
  video: File | null;
  description: string;
  skills: string[];
  videoDuration: string;
}

type TFormData = {
  title: string;
  name: string;
  email: string;
  talentType: string;
  description: string;
  videoDuration: string;
  video: FileList | null;
};

const TalentSubmissionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormData>();

  const [currentSkill, setCurrentSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const talentTypes = [
    "Music",
    "Dance",
    "Art",
    "Sports",
    "Academics",
    "Technology",
    "Public Speaking",
    "Writing",
    "Other",
  ];

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Video must be less than 10MB");
        return;
      }
      if (!file.type.startsWith("video/")) {
        alert("Please select a video file");
        return;
      }
      setSelectedVideo(file);
    }
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills((prev) => [...prev, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleFormSubmit = async (data: TFormData) => {
    console.log(data);
    if (!selectedVideo) {
      alert("Please select a video file");
      return;
    }

    if (skills.length === 0) {
      alert("Please add at least one skill");
      return;
    }

    setIsSubmitting(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
      <h2 className="text-2xl font-bold text-[#051539] mb-6">
        Showcase Your Talent
      </h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Title and Talent Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Video Title"
            placeholder="Enter video title"
            {...register("title", { required: "Title is required" })}
            error={errors.title}
          />

          <SelectDropdown
            label="Talent Type"
            {...register("talentType", { required: "Talent type is required" })}
            error={errors.talentType}
            options={talentTypes}
          />
        </div>

        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: "Name is required" })}
            error={errors.name}
          />

          <TextInput
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email}
          />
        </div>

        {/* Description */}
        <Textarea
          label="Description *"
          placeholder="Tell us about your talent in details... Describe what makes your talent special, your experience, and what viewers can expect to see."
          rows={6}
          error={errors.description}
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 50,
              message: "Description should be at least 50 characters long",
            },
          })}
        />

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Talent Video (Max 10MB) *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-all hover:border-[#051539]">
            <input
              {...register("video", { required: "Video is required" })}
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
              id="video-upload"
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <div className="space-y-2">
                <div className="mx-auto w-12 h-12 bg-[#051539] rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-[#051539] font-medium">
                    Click to upload video
                  </span>
                  <p className="text-gray-500 text-sm">
                    MP4, MOV, AVI (Max 10MB)
                  </p>
                </div>
              </div>
            </label>
            {selectedVideo && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {selectedVideo.name}
              </p>
            )}
            {errors.video && (
              <p className="mt-2 text-sm text-red-600">
                {errors.video.message}
              </p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills & Talents
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddSkill())
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051539] focus:border-transparent"
              placeholder="Add a skill"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-[#051539] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-gray-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#051539] text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Showcase My Talent"}
        </button>
      </form>
    </div>
  );
};

export default TalentSubmissionForm;
