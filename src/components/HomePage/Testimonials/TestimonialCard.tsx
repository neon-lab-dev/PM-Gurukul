import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { ICONS } from "../../../assets";
import { TTestimonial } from "../../TestimonialSection/TestimonialSection";
import { FaPlayCircle } from "react-icons/fa";

const TestimonialCard: React.FC<TTestimonial> = ({
  review,
  name,
  designation,
  poster,
  rating,
  video,
  testimonialType,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const videoUrl = video?.url;
  const hasVideo = Boolean(videoUrl);

  return (
    <div
      className={`bg-white p-6 rounded-2xl font-Inter border border-neutral-10/20 h-[264px] flex flex-col justify-between gap-10 w-[450px] mr-6 relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!hasVideo && (
        <p className="text-primary-10 text-lg leading-6 z-10">{review}</p>
      )}

      {/* icon overlay */}
      {hasVideo && (
        <div className="absolute inset-0 flex items-center justify-center pt-10">
          <FaPlayCircle className="text-6xl text-primary-500 opacity-70" />
        </div>
      )}

      <div className="flex flex-col gap-5 z-10">
        {testimonialType === "Text" && (
          <div className="bg-neutral-25 w-[196px] h-[2px]" />
        )}

        <div className="flex items-center gap-3">
          <img
            src={poster?.url || ICONS.student}
            alt={name}
            className="size-12 rounded-full"
          />
          <div>
            <h1 className="text-primary-10 font-medium leading-6">
              {name}, <span className="text-neutral-10">{designation}</span>
            </h1>
            <StarRatings
              rating={rating}
              starRatedColor="#FFAD14"
              numberOfStars={5}
              name="rating"
              starDimension="13px"
              starSpacing="2px"
            />
          </div>
        </div>
      </div>

      {hasVideo && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <video
            src={videoUrl}
            controls
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
