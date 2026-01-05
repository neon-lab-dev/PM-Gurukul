import { Helmet } from "react-helmet-async";
import CourseHero from "../../components/CoursePage/CourseHero/CourseHero";
import AllCourses from "../../components/CoursePage/AllCourses/AllCourses";
import Testimonials from "../../components/HomePage/Testimonials/Testimonials";
import FAQ from "../../components/Shared/FAQ/FAQ";
import CustomerSupport from "../../components/Shared/CustomerSupport/CustomerSupport";
import { useGetAllCoursesQuery } from "../../redux/Features/Course/courseApi";
import { useState } from "react";
import WhyPMGurukkul from "../../components/HomePage/WhyPMGurukkul/WhyPMGurukkul";
import BundleCourses from "../../components/CoursePage/BundleCourses/BundleCourses";
import { useGetAllCourseBundlesQuery } from "../../redux/Features/CourseBundle/courseBundleApi";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: allCourses,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(searchQuery);
  const { data, isLoading: isBundleLoading } = useGetAllCourseBundlesQuery({});
  const [selectedCategory, setSelectedCategory] = useState("All Courses");

  return (
    <div>
      <Helmet>
        <title>PMGURUKKUL | Explore Courses</title>
      </Helmet>
      <CourseHero setSearchQuery={setSearchQuery} />
      <AllCourses
        allCourses={allCourses}
        isLoading={isLoading}
        isFetching={isFetching}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <BundleCourses data={data?.bundles || []} isLoading={isBundleLoading} />
      {/* <WhyUs /> */}
      <WhyPMGurukkul />
      <Testimonials />
      <FAQ />
      <CustomerSupport />
    </div>
  );
};

export default Courses;
