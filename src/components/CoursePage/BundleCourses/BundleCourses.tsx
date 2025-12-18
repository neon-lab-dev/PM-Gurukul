// components/BundleCourses.tsx
import BundleCourseCard from "./BundleCourseCard";
import { Sparkles, Package, Zap, Shield } from "lucide-react";
import { useGetAllCourseBundlesQuery } from "../../../redux/Features/CourseBundle/courseBundleApi";
import { TBundleCourse } from "../../../types/bundleCourse.types";

const BundleCourses = () => {
  const { data: allCourseBundles, isLoading } = useGetAllCourseBundlesQuery({});
  if (isLoading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-56"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!allCourseBundles?.bundles?.length) {
    return (
      <div className="py-16 text-center">
        <Package size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">
          No bundle courses available
        </h3>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-4">
            <Sparkles className="text-indigo-600" size={20} />
            <span className="text-indigo-600 font-semibold">Special Offer</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bundle Courses & Save Big
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get access to multiple courses at a discounted price. Master
            multiple skills and save money!
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Zap className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Save Up to 60%
              </h3>
            </div>
            <p className="text-gray-600">
              Get huge discounts when you purchase courses together
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Complete Learning Path
              </h3>
            </div>
            <p className="text-gray-600">
              Curated bundles for comprehensive skill development
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Shield className="text-amber-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Lifetime Access
              </h3>
            </div>
            <p className="text-gray-600">
              Access all courses in the bundle forever with updates
            </p>
          </div>
        </div>

        {/* Bundle Courses Grid */}
        <div className="grid grid-cols-1 gap-8">
          {allCourseBundles?.bundles?.map((bundle:TBundleCourse) => (
            <BundleCourseCard
              key={bundle._id}
              bundle={bundle}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Accelerate Your Learning?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have accelerated their careers with
              our bundle courses. Start learning today and save big!
            </p>
            <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-xl inline-flex items-center gap-2 transition-all duration-300 hover:shadow-lg">
              <Sparkles size={20} />
              Explore All Bundles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleCourses;
