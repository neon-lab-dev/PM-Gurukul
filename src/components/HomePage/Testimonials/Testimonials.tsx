/* eslint-disable @typescript-eslint/no-explicit-any */
import Marquee from "react-fast-marquee";
import SectionHeading from "../../Reusable/SectionHeading/SectionHeading";
import Container from "../../Shared/Container/Container";
import TestimonialCard from "./TestimonialCard";
import { useGetAllTestimonialsQuery } from "../../../redux/Features/Testimonial/testimonialApi";
import { TTestimonial } from "../../TestimonialSection/TestimonialSection";

export type Testimonial = {
  _id: number | string;
  feedback: string;
  name: string;
  role: string;
  image: string | any;
  video?: string;
  rating: number;
  thumbnail?: string;
};

const Testimonials = () => {

  const { data } = useGetAllTestimonialsQuery({});

  return (
    <div
      style={{
        background: "linear-gradient(92deg, #FFEFF1 0.63%, #FFFBF5 98.18%)",
      }}
      className="py-[64px]"
    >
      <Container>
        <div className="flex flex-col gap-[64px] items-center justify-center">
          <SectionHeading
            heading="What People Are Saying About Us"
            description="Discover how PMGURUKKUL has reshaped learning and sparked success stories."
          />

          <Marquee
            speed={30}
            className="flex items-center"
            direction="right"
            pauseOnHover
          >
            {data?.testimonials?.map((testimonial:TTestimonial) => (
              <TestimonialCard key={testimonial._id} {...testimonial} />
            ))}
          </Marquee>
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;
