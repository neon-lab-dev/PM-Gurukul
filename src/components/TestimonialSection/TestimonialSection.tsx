import React, { useState, useRef } from "react";
import SectionHeading from "../Reusable/SectionHeading/SectionHeading";
import Container from "../Shared/Container/Container";
import StarRatings from "react-star-ratings";
import { useGetAllTestimonialsQuery } from "../../redux/Features/Testimonial/testimonialApi";
import TestimonialCardLoader from "./TestimonialCardLoader";
import { FaRegComment } from "react-icons/fa";

type TestimonialType = "Video" | "Text" | "all";

export type TTestimonial = {
  _id: string;
  name: string;
  designation: string;
  testimonialType: "Video" | "Text";
  review?: string;
  rating: number;
  poster?: {
    public_id?: string;
    url?: string;
  };
  video?: {
    public_id?: string;
    url?: string;
  };
  createdAt?: Date;
};

const TestimonialSection: React.FC = () => {
  const { data, isLoading } = useGetAllTestimonialsQuery({});
  const [activeFilter, setActiveFilter] = useState<TestimonialType>("all");

  const filteredTestimonials =
    activeFilter === "all"
      ? data?.testimonials
      : data?.testimonials?.filter(
          (t: TTestimonial) => t?.testimonialType === activeFilter
        );

  const TestimonialCard: React.FC<{ testimonial: TTestimonial }> = ({
    testimonial,
  }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    return (
      <div
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border group"
        onMouseEnter={() => {
          if (videoRef.current) videoRef.current.play();
        }}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
      >
        {testimonial.testimonialType === "Video" && (
          <div className="relative">
            <video
              ref={videoRef}
              src={testimonial?.video?.url}
              muted
              playsInline
              controls
              className="w-full h-48 object-cover transition-opacity duration-500"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center mb-3">
            <StarRatings
              rating={testimonial.rating}
              starRatedColor="#FFAD14"
              numberOfStars={5}
              name="rating"
              starDimension="13px"
              starSpacing="2px"
            />
            <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
              {testimonial?.testimonialType === "Text" ? "Text" : "Video"}
            </span>
          </div>

          {!testimonial.video?.url && (
            <blockquote className="text-gray-700 mb-4 leading-relaxed">
              "{testimonial.review}"
            </blockquote>
          )}

          <div className="flex items-center space-x-3">
            <img
              src={testimonial?.poster?.url}
              alt={testimonial?.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <div className="font-semibold text-gray-900">
                {testimonial.name}
              </div>
              <div className="text-sm text-gray-600">
                {testimonial.designation}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        background: "linear-gradient(92deg, #FFEFF1 0.63%, #FFFBF5 98.18%)",
      }}
      className="py-[64px]"
    >
      <Container>
        <SectionHeading
          heading="What People Are Saying About Us"
          description="Discover how PMGURUKKUL has reshaped learning and sparked success stories."
        />

        <div className="flex justify-center my-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            {(["all", "Text", "Video"] as TestimonialType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {filter === "all"
                  ? "All Testimonials"
                  : filter === "Text"
                  ? "Text Reviews"
                  : "Video Reviews"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <TestimonialCardLoader key={index} />
            ))
          ) : filteredTestimonials?.length > 0 ? (
            // Data loaded successfully
            filteredTestimonials.map((t: TTestimonial) => (
              <TestimonialCard key={t?._id} testimonial={t} />
            ))
          ) : (
            // Empty state
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <FaRegComment className="text-7xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Testimonials Yet
              </h3>
              <p className="text-gray-500 max-w-md">
                We haven't received any testimonials yet. Check back later or be
                the first to share your experience.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TestimonialSection;
