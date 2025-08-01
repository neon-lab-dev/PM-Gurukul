/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet-async";
// import { TCourse } from "../../../components/CoursePage/AllCourses/course.types";
import MyCoursesCardLoader from "../../../components/Loaders/MyCourseCardLoader/MyCourseCardLoader";
import MyCoursesCard from "../../../components/MyCoursesPage/MyCoursesCard";
import NoDataFound from "../../../components/Shared/NoDataFound/NoDataFound";
import { useGetMyPurchasedCoursesQuery } from "../../../redux/Features/User/userApi";

const MyCourses = () => {
  const { data: myPurchasedCourses, isLoading } = useGetMyPurchasedCoursesQuery(
    {}
  );

  return (
    <>
      <Helmet>
        <title>PMGURUKKUL | Start Learning Now</title>
      </Helmet>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-neutral-90">My Courses</h1>
          <p className="text-neutral-90">Write something here</p>
        </div>
        {myPurchasedCourses?.purchasedCourses?.length < 1 ? (
          <NoDataFound
            message={"You haven’t Enrolled on any course"}
            isBtnAvailable={true}
          />
        ) : (
          <div className="flex flex-wrap gap-6">
            {isLoading
              ? [1, 2, 3, 4].map((_, index) => (
                  <MyCoursesCardLoader key={index} />
                ))
              : myPurchasedCourses?.purchasedCourses?.map((item:any, index:number) => {
                  return <MyCoursesCard key={index} {...item.courseId} examLimitLeft={item?.examLimitLeft} />;
                })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyCourses;
