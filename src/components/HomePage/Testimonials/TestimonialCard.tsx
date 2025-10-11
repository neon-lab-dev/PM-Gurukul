import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { Testimonial } from './Testimonials';
import { ICONS } from '../../../assets';

const TestimonialCard: React.FC<Testimonial> = ({
  feedback,
  name,
  role,
  image,
  rating,
  video,
  thumbnail,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const hasVideo = Boolean(video && thumbnail);

  return (
    <div
      className={`bg-white p-6 rounded-2xl font-Inter h-[264px] flex flex-col justify-between gap-10 w-[450px] mr-6 relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        hasVideo
          ? {
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {/* If there's no video, show feedback text */}
      {!hasVideo && (
        <p className="text-primary-10 text-lg leading-6 z-10">{feedback}</p>
      )}

      {/* Rating & name section (always visible) */}
      <div className="flex flex-col gap-5 z-10">
        <div className="bg-neutral-25 w-[196px] h-[2px]" />

        <div className="flex items-center gap-3">
          <img
            src={image || ICONS.student}
            alt={name}
            className="size-12 rounded-full"
          />
          <div>
            <h1 className="text-primary-10 font-medium leading-6">
              {name}, <span className="text-neutral-10">{role}</span>
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

      {/* Video overlay (visible only when hovered) */}
      {hasVideo && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            src={video}
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
