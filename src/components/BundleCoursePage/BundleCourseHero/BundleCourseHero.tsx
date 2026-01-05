import {
  Sparkles,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Award,
  Trophy,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import Container from "../../Shared/Container/Container";
import { TBundleCourse } from "../../../types/bundleCourse.types";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../Providers/CartProvider/CartProvider";
import { useState } from "react";
import { toast } from "sonner";

const BundleCourseHero = ({
  data,
}: {
  data: TBundleCourse[];
  isLoading: boolean;
}) => {
  const firstBundleCourse = data[0];
  const navigate = useNavigate();
  const { cartData: cartInfo, addCourseToCart } = useCart();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const isCourseAlreadyInCart = cartInfo?.some(
    (item) => item?._id === firstBundleCourse?._id
  );

  const handleAddCourseToCartAndRedirect = () => {
    const cartData = {
      _id: firstBundleCourse._id,
      title: firstBundleCourse.title,
      category: "Bundle Course",
      image: firstBundleCourse?.thumbnail?.url,
      basePrice: firstBundleCourse?.basePrice,
      discountedPrice: firstBundleCourse.discountedPrice,
    };

    if (isCourseAlreadyInCart) {
      toast.error("Course is already in the cart!");
      setIsAdded(false);
      return;
    }

    addCourseToCart(cartData);
    setIsAdded(true);
    navigate("/cart");
  };


  const handleScrollToSection = (id:string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#051539] via-[#1E293B] to-[#2E3238]"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD614] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0073DF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#FFCFC9] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <Container>
        <div className="relative pt-20 pb-32 lg:pt-32 lg:pb-48">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between gap-9 2xl:gap-16">
            {/* Left Column - Main Content */}
            <div className="lg:w-1/2">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD614] to-[#EFD881] text-[#051539] px-6 py-3 rounded-full font-bold text-sm mb-6 lg:mb-8 shadow-lg">
                <Sparkles size={18} />
                <span>LIMITED TIME OFFER • SAVE UP TO 65%</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-3xl xl:text-5xl font-bold text-white mb-6 lg:mb-8 leading-tight">
                Master <span className="text-[#FFD614]">Multiple Skills</span>
                <br />
                with Our Premium
                <br />
                <span className="relative">
                  Course Bundles
                  <svg
                    className="absolute -bottom-3 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4C30 4 60 1 90 4C120 7 150 7 180 4C210 1 240 1 270 4"
                      stroke="#FFD614"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg xl:text-xl text-[#CBD5E1] mb-8 lg:mb-12 max-w-2xl lg:max-w-none">
                Get access to curated course combinations designed by experts.
                Save money while accelerating your learning journey with
                comprehensive skill development paths.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8 lg:mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-3 py-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FFD614]/20 rounded-lg">
                      <Trophy className="text-[#FFD614]" size={24} />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">
                        {data?.length || 0}+
                      </div>
                      <div className="text-sm text-[#CBD5E1]">
                        Premium Bundles
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-3 py-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#0073DF]/20 rounded-lg">
                      <Award className="text-[#0073DF]" size={24} />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">65%%</div>
                      <div className="text-sm text-[#CBD5E1]">
                        Average Savings
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-3 py-4 border border-white/20 col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#6BB870]/20 rounded-lg">
                      <Users className="text-[#6BB870]" size={24} />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">
                        {data?.length || 0}+
                      </div>
                      <div className="text-sm text-[#CBD5E1]">
                        Total Courses
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 lg:mb-0 text-sm">
                <button onClick={() => handleScrollToSection("bundleCourses")} className="group bg-gradient-to-r from-[#FFD614] to-[#EFD881] hover:from-[#FFE5A0] hover:to-[#F4E28C] text-[#051539] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <span>Explore All Bundles</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </button>
                <button
                  onClick={() => handleScrollToSection("howBundleCourseWorks")}
                  className="group bg-transparent border-2 border-white/30 hover:border-white text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10"
                >
                  <span>How Bundles Work</span>
                </button>
              </div>
            </div>

            {/* Right Column - Featured Bundle Preview */}
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative">
                {/* Featured Bundle Card */}
                <div className="bg-gradient-to-br from-white to-[#FAFAFA] rounded-3xl shadow-2xl p-8 transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#051539] mb-2">
                      {firstBundleCourse?.title}
                    </h3>
                    <p className="text-[#6E7883] mb-4">
                      {firstBundleCourse?.description}
                    </p>

                    {/* Courses Preview */}
                    <div className="flex -space-x-3 mb-6">
                      {firstBundleCourse?.courseIds?.map((item) => (
                        <div
                          key={item?._id}
                          className="size-12 rounded-full border-2 border-white overflow-hidden"
                        >
                          <img
                            src={item?.poster?.url}
                            alt=""
                            className="size-12 rounded-full border border-primary-10 object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-4 mb-2">
                        <span className="text-3xl font-bold text-[#051539]">
                          ₹{firstBundleCourse?.discountedPrice}
                        </span>
                        <span className="text-xl text-[#8A9BB1] line-through">
                          ₹{firstBundleCourse?.basePrice}
                        </span>
                        <span className="px-3 py-1 bg-[#D4EDBC] text-[#11734B] text-sm font-bold rounded-full">
                          Save 67%
                        </span>
                      </div>
                      <div className="text-sm text-[#6E7883]">
                        {firstBundleCourse?.courseIds?.length || 0} Courses •
                        Lifetime Access
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex justify-between text-sm text-[#051539] mb-2">
                        <span>Limited spots available</span>
                        <span className="font-bold">
                          {80 + firstBundleCourse?.courseIds?.length || 0}%
                          claimed
                        </span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                        <div className="bg-gradient-to-r from-[#FFD614] to-[#EFD881] h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-[#6BB870]" />
                        <span className="text-sm text-[#051539]">
                          Lifetime Access
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} className="text-[#0073DF]" />
                        <span className="text-sm text-[#051539]">
                          Forum Access
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-[#FFD614]" />
                        <span className="text-sm text-[#051539]">
                          Certificate
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-[#B10202]" />
                        <span className="text-sm text-[#051539]">Projects</span>
                      </div>
                    </div>

                    <button
                      onClick={handleAddCourseToCartAndRedirect}
                      className="w-full bg-gradient-to-r from-[#051539] to-[#1E293B] hover:from-[#1E293B] hover:to-[#2E3238] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
                    >
                      <Zap size={20} />
                      {isAdded || isCourseAlreadyInCart
                        ? "Already in Cart"
                        : "Get This Bundle"}
                    </button>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD614] to-[#EFD881] flex items-center justify-center">
                      <Star className="text-[#051539]" size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#051539]">
                        4.9/5 Rating
                      </div>
                      <div className="text-xs text-[#6E7883]">
                        From 2.4k+ students
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-11 -right-6 xl:-right-2 2xl:-right-6 bg-white p-4 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#051539]">
                      500+
                    </div>
                    <div className="text-sm text-[#6E7883]">
                      Sold This Month
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-white/60">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#FFD614] rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleCourseHero;
