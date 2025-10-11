import React, { useState, useRef } from 'react';
import SectionHeading from '../Reusable/SectionHeading/SectionHeading';
import Container from '../Shared/Container/Container';
import StarRatings from 'react-star-ratings';

type TestimonialType = 'text' | 'video' | 'all';

interface Testimonial {
  id: number;
  type: TestimonialType;
  name: string;
  role: string;
  company: string;
  content?: string;
  avatar: string;
  rating: number;
  videoThumbnail?: string;
  videoUrl?: string;
  duration?: string;
}

const TestimonialSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<TestimonialType>('all');

  const testimonials: Testimonial[] = [
    {
      id: 1,
      type: 'text',
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "This service completely transformed our workflow. The efficiency gains we've experienced are incredible. Our team is more productive than ever before!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      id: 2,
      type: 'video',
      name: "David Wilson",
      role: "CTO",
      company: "DataSystems Inc",
      content: "The platform's scalability and robust features have been crucial for our growing data infrastructure needs.",
      videoThumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      duration: "2:30",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      id: 3,
      type: 'text',
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateLab",
      content: "Outstanding support and incredible features. The platform is intuitive and has helped us scale our operations seamlessly.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      id: 4,
      type: 'video',
      name: "Lisa Thompson",
      role: "Operations Manager",
      company: "Global Solutions",
      content: "Implementation was smooth and the results were immediate. Our operational efficiency improved by 40% in the first month.",
      videoThumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      duration: "1:45",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4,
    },
  ];

  const filteredTestimonials =
    activeFilter === 'all'
      ? testimonials
      : testimonials.filter((t) => t.type === activeFilter);

 

  const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
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
        {testimonial.type === 'video' && (
          <div className="relative">
            <video
              ref={videoRef}
              src={testimonial.videoUrl}
              poster={testimonial.videoThumbnail}
              muted
              playsInline
              controls
              className="w-full h-48 object-cover transition-opacity duration-500"
            />
            {testimonial.duration && (
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                {testimonial.duration}
              </div>
            )}
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
              {testimonial.type === 'text' ? 'Text' : 'Video'}
            </span>
          </div>

          {!testimonial.videoUrl && (
            <blockquote className="text-gray-700 mb-4 leading-relaxed">
              "{testimonial.content}"
            </blockquote>
          )}

          <div className="flex items-center space-x-3">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <div className="font-semibold text-gray-900">{testimonial.name}</div>
              <div className="text-sm text-gray-600">
                {testimonial.role}, {testimonial.company}
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
        background: 'linear-gradient(92deg, #FFEFF1 0.63%, #FFFBF5 98.18%)',
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
            {(['all', 'text', 'video'] as TestimonialType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {filter === 'all'
                  ? 'All Testimonials'
                  : filter === 'text'
                  ? 'Text Reviews'
                  : 'Video Stories'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TestimonialSection;
