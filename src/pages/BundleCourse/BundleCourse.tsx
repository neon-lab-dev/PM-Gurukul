import BundleCourseHero from "../../components/BundleCoursePage/BundleCourseHero/BundleCourseHero";
import HowBundleWorks from "../../components/BundleCoursePage/HowBundleCourseWorks/HowBundleCourseWorks";
import BundleCourses from "../../components/CoursePage/BundleCourses/BundleCourses";

const BundleCourse = () => {
    return (
        <div>
            <BundleCourseHero/>
            <BundleCourses/>
            <HowBundleWorks/>
        </div>
    );
};

export default BundleCourse;