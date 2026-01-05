import BundleCourseHero from "../../components/BundleCoursePage/BundleCourseHero/BundleCourseHero";
import HowBundleWorks from "../../components/BundleCoursePage/HowBundleCourseWorks/HowBundleCourseWorks";
import BundleCourses from "../../components/CoursePage/BundleCourses/BundleCourses";
import { useGetAllCourseBundlesQuery } from "../../redux/Features/CourseBundle/courseBundleApi";

const BundleCourse = () => {
    const { data, isLoading } = useGetAllCourseBundlesQuery({});
    return (
        <div>
            <BundleCourseHero data={data?.bundles || []} isLoading={isLoading}/>
            <BundleCourses data={data?.bundles || []} isLoading={isLoading}/>
            <HowBundleWorks/>
        </div>
    );
};

export default BundleCourse;