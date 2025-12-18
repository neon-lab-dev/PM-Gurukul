// components/BundleCourseHero.tsx
import React from "react";
import {
  Sparkles,
  Star,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Award,
  Trophy,
} from "lucide-react";
import Container from "../../Shared/Container/Container";

interface BundleCourseHeroProps {
  totalBundles?: number;
  totalCourses?: number;
  averageSavings?: number;
}

const BundleCourseHero: React.FC<BundleCourseHeroProps> = ({
  totalBundles = 12,
  totalCourses = 48,
  averageSavings = 65,
}) => {
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
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between lg:gap-16">
            {/* Left Column - Main Content */}
            <div className="lg:w-1/2">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD614] to-[#EFD881] text-[#051539] px-6 py-3 rounded-full font-bold text-sm mb-6 lg:mb-8 shadow-lg">
                <Sparkles size={18} />
                <span>LIMITED TIME OFFER • SAVE UP TO 75%</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 lg:mb-8 leading-tight">
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
              <p className="text-lg sm:text-xl text-[#CBD5E1] mb-8 lg:mb-12 max-w-2xl lg:max-w-none">
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
                        {totalBundles}+
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
                      <div className="text-2xl font-bold text-white">
                        {averageSavings}%
                      </div>
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
                        {totalCourses}+
                      </div>
                      <div className="text-sm text-[#CBD5E1]">
                        Total Courses
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 lg:mb-0">
                <button className="group bg-gradient-to-r from-[#FFD614] to-[#EFD881] hover:from-[#FFE5A0] hover:to-[#F4E28C] text-[#051539] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-lg">
                  <span>Explore All Bundles</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </button>
                <button className="group bg-transparent border-2 border-white/30 hover:border-white text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10">
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
                      Full Stack Developer Bundle
                    </h3>
                    <p className="text-[#6E7883] mb-4">
                      Master frontend & backend development with 8 comprehensive
                      courses
                    </p>

                    {/* Courses Preview */}
                    <div className="flex -space-x-3 mb-6">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                        >
                          <div
                            className={`w-full h-full bg-gradient-to-br ${
                              i % 3 === 0
                                ? "from-[#0073DF] to-[#051539]"
                                : i % 3 === 1
                                ? "from-[#FFD614] to-[#EFD881]"
                                : "from-[#6BB870] to-[#11734B]"
                            }`}
                          ></div>
                        </div>
                      ))}
                      <div className="w-12 h-12 rounded-full bg-[#051539] border-2 border-white flex items-center justify-center">
                        <span className="text-white text-sm font-bold">+3</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-4 mb-2">
                        <span className="text-3xl font-bold text-[#051539]">
                          $299
                        </span>
                        <span className="text-xl text-[#8A9BB1] line-through">
                          $899
                        </span>
                        <span className="px-3 py-1 bg-[#D4EDBC] text-[#11734B] text-sm font-bold rounded-full">
                          Save 67%
                        </span>
                      </div>
                      <div className="text-sm text-[#6E7883]">
                        8 Courses • 120+ Hours • Lifetime Access
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex justify-between text-sm text-[#051539] mb-2">
                        <span>Limited spots available</span>
                        <span className="font-bold">82% claimed</span>
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
                        <Clock size={16} className="text-[#0073DF]" />
                        <span className="text-sm text-[#051539]">
                          120+ Hours
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-[#FFD614]" />
                        <span className="text-sm text-[#051539]">
                          Certificate
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-[#B10202]" />
                        <span className="text-sm text-[#051539]">
                          30-Day Guarantee
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-[#051539] to-[#1E293B] hover:from-[#1E293B] hover:to-[#2E3238] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg">
                      <Zap size={20} />
                      Get This Bundle
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

                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl">
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
