import React from 'react';
import { Search, Layers, ShoppingBag, Rocket, CheckCircle2, TrendingUp, Zap, Shield } from 'lucide-react';

interface HowBundleWorksProps {
  title?: string;
  description?: string;
}

const HowBundleWorks: React.FC<HowBundleWorksProps> = ({ 
  title = "How Course Bundles Work",
  description = "Get the most value from your learning journey with our curated course bundles"
}) => {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: "Browse Bundles",
      description: "Explore curated collections of complementary courses designed to build complete skill sets.",
      color: "from-[#051539] to-[#1E293B]",
      bgColor: "bg-[#051539]/5",
      iconColor: "text-[#051539]"
    },
    {
      id: 2,
      icon: Layers,
      title: "Select Your Path",
      description: "Choose bundles based on your career goals, skill level, or areas of interest.",
      color: "from-[#0073DF] to-[#051539]",
      bgColor: "bg-[#0073DF]/5",
      iconColor: "text-[#0073DF]"
    },
    {
      id: 3,
      icon: ShoppingBag,
      title: "Get Instant Access",
      description: "One-time payment gives you lifetime access to all courses in the bundle.",
      color: "from-[#FFD614] to-[#EFD881]",
      bgColor: "bg-[#FFD614]/5",
      iconColor: "text-[#FFD614]"
    },
    {
      id: 4,
      icon: Rocket,
      title: "Start Learning",
      description: "Access all courses immediately and learn at your own pace with structured paths.",
      color: "from-[#6BB870] to-[#11734B]",
      bgColor: "bg-[#6BB870]/5",
      iconColor: "text-[#6BB870]"
    }
  ];

  const benefits = [
    {
      icon: CheckCircle2,
      text: "Save up to 65% compared to individual courses",
      color: "text-[#11734B]"
    },
    {
      icon: TrendingUp,
      text: "Structured learning path for faster progress",
      color: "text-[#0073DF]"
    },
    {
      icon: Zap,
      text: "Learn complementary skills in one package",
      color: "text-[#FFD614]"
    },
    {
      icon: Shield,
      text: "30-day money-back guarantee on all bundles",
      color: "text-[#B10202]"
    }
  ];

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-b from-white to-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#051539]/10 mb-6">
            <span className="text-sm font-semibold text-[#051539] uppercase tracking-wider">Simple Process</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#051539] mb-4">
            {title}
          </h2>
          <p className="text-lg text-[#6E7883]">
            {description}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#051539]/10 via-[#0073DF]/20 to-[#6BB870]/10 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Step Number */}
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-white border-2 border-[#051539]/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#051539]">{step.id}</span>
                </div>

                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 h-full border border-[#E2E8F0] hover:border-[#051539]/20 hover:shadow-xl transition-all duration-300 group">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl ${step.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon size={32} className={step.iconColor} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#051539] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#6E7883] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4 mb-4">
                    <div className="w-6 h-6 transform rotate-90">
                      <svg className="w-full h-full text-[#051539]/20" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-16">
          <div className="h-px bg-gradient-to-r from-transparent via-[#051539]/10 to-transparent"></div>
        </div>

        {/* Benefits */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#051539] mb-4">
              Why Choose Bundle Courses?
            </h3>
            <p className="text-[#6E7883]">
              Get more value, better structure, and faster results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center">
                    <benefit.icon size={20} className={benefit.color} />
                  </div>
                </div>
                <p className="text-[#051539] font-medium leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowBundleWorks;