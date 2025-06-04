/* eslint-disable @typescript-eslint/no-explicit-any */
import Marquee from "react-fast-marquee";
import SectionHeading from "../../Reusable/SectionHeading/SectionHeading";
import Container from "../../Shared/Container/Container";
import TestimonialCard from "./TestimonialCard";
import { ICONS } from "../../../assets";

export type Testimonial = {
    _id: number | string;
    feedback: string;
    name: string;
    role: string;
    image: string | any;
    rating: number;
};

const Testimonials = () => {
    const testimonials: Testimonial[] = [
        {
            _id: 1,
            feedback: "All the courses of PMGURUKKUL are designed in a very unique way. After doing its goal setting course, I understood for the first time how to make goals in life.",
            name: "Aarav Sharma",
            role: "Student",
            image: ICONS.avatar,
            rating: 5,
        },
        {
            _id: 2,
            feedback: "I am very thankful to PMGURUKKUL for launching such trending courses which help us a lot in our work and we can do them at our convenient time.",
            name: "Priya Verma",
            role: "Professional",
            image: ICONS.avatar,
            rating: 5,
        },
        {
            _id: 3,
            feedback: "Learning on PMGURUKKUL has given me the confidence and ability to grow in my career. The videos are beautifully designed and are a joy to watch. I really enjoyed my courses.",
            name: "Neha Patel",
            role: "Housewife",
            image: ICONS.avatar,
            rating: 5,
        },
        {
            _id: 4,
            feedback: "From taking courses on PMGURUKKUL, I gained a deep understanding of direct selling from start to finish. Now I have been able to apply the skills and knowledge I gained to multiply my sales.",
            name: "Rajesh Iyer",
            role: "Entrepreneur",
            image: ICONS.avatar,
            rating: 5,
        },
    ];


    return (
        <div style={{
            background: "linear-gradient(92deg, #FFEFF1 0.63%, #FFFBF5 98.18%)",
        }} className="py-[64px]">
            <Container>
                <div className="flex flex-col gap-[64px] items-center justify-center">
                    <SectionHeading heading="What People Are Saying About Us" description="Discover how PMGURUKKUL has reshaped learning and sparked success stories." />

                    <Marquee speed={30} className="flex items-center" direction="right" pauseOnHover>
                        {testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial._id} {...testimonial} />
                        ))}
                    </Marquee>
                </div>
            </Container>
        </div>
    );
};

export default Testimonials;