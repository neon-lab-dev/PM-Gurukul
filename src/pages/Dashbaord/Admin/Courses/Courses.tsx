import { Table } from "../../../../components/ReferralPayoutsPage/TransactionHistory";
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/formatDate";
import Spinner from "../../../../components/Loaders/Spinner/Spinner";
import NoDataFound from "../../../../components/Shared/NoDataFound/NoDataFound";
import { toast } from "sonner";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/Features/Admin/adminApi";
import { TCourse } from "../../../../components/CoursePage/AllCourses/course.types";
import { Helmet } from "react-helmet-async";
import DashboardStatusOrLoader from "../../../../components/Reusable/DashboardStatusOrLoader/DashboardStatusOrLoader";
import { useState } from "react";
import Threads from "./Threads/Threads";
import Button from "../../../../components/Reusable/Button/Button";
import AllCourseBundles from "../../../../components/Dashboard/Admin/ManageCoursePage/CreateCourseBundle/AllCourseBundles/AllCourseBundles";
import CreateOrEditCourseBundle from "../../../../components/Dashboard/Admin/ManageCoursePage/CreateCourseBundle/CreateOrEditCourseBundle";

const AdminCourses = () => {
  const navigate = useNavigate();
  const [isThreadsBarOpen, setIsThreadsBarOpen] = useState(false);
  const { data: allCourses, isLoading } = useGetAllCoursesQuery("");
  const [deleteCourse] = useDeleteCourseMutation();
  const [courseId, setCourseId] = useState<string>("");
  const [isBundleModalOpen, setIsBundleModalOpen] = useState<boolean>(false);
  const [selectedBundleCourseId, setSelectedBundleCourseId] =
    useState<string>("");
  const [modalType, setModalType] = useState<"add" | "edit">("add");

  const handleDeleteCourse = async (id: string) => {
    try {
      await toast.promise(deleteCourse(id).unwrap(), {
        loading: "Loading...",
        success: "Course deleted successfully!",
        error: "Failed to delete course. Please try again.",
      });
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  // Course table headers
  const allCoursesTableHeaders = [
    { key: "no", label: "SL.NO", sortable: true },
    { key: "courseName", label: "COURSE NAME", sortable: true },
    { key: "category", label: "CATEGORY", sortable: true },
    { key: "creator", label: "CREATOR", sortable: true },
    { key: "basePrice", label: "BASE PRICE", sortable: true },
    { key: "discountedPrice", label: "DISCOUNTED PRICE", sortable: true },
    // { key: "status", label: "STATUS", sortable: true },
    { key: "publishedOn", label: "PUBLISHED ON", sortable: true },
    { key: "action", label: "ACTION", sortable: false },
  ];

  const handleNavigateToManageExam = (id: string) => {
    navigate(`/admin/course/manage-exam/${id}`);
  };

  // Course table data
  const allCoursesTableData = allCourses?.courses?.length
    ? allCourses?.courses?.map((course: TCourse, index: number) => ({
        no: `${index + 1}`,
        courseName: course?.title,
        category: course?.category,
        creator: course?.author,
        basePrice: `₹${course?.basePrice}`,
        discountedPrice: `₹${course?.discountedPrice}`,
        publishedOn: formatDate(course?.createdAt),
        action: [
          {
            label: "Update Course Details",
            onClick: () =>
              navigate("/admin/course/update", { state: { id: course?._id } }),
          },
          {
            label: "Manage Lectures",
            onClick: () => navigate(`/admin/add-course-video/${course?._id}`),
          },
          {
            label: "Delete Course",
            onClick: () => handleDeleteCourse(course._id),
          },
          {
            label: "Forum",
            onClick: () => {
              setIsThreadsBarOpen(true);
              setCourseId(course?._id);
            },
          },
          {
            label: "Manage Exam",
            onClick: () => {
              handleNavigateToManageExam(course?._id);
            },
          },
        ],
      }))
    : [];

  const courseIdsWithTitle = allCourses?.courses?.map((course: TCourse) => ({
    _id: course._id,
    title: course.title,
  }));

  return (
    <>
      <Helmet>
        <title>PMGURUKKUL | Manage All Courses</title>
      </Helmet>
      <div className="flex items-center justify-between w-full">
        <DashboardHeader
          pageName="All Courses"
          pageDesc="All your courses in one place."
        />
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              setModalType("add");
              setIsBundleModalOpen(true);
            }}
            label="Create Bundle"
          />
          <Link to="/admin/course/add">
            <Button label="Add a Course" />
          </Link>
        </div>
      </div>

      {/* Status cards */}
      <DashboardStatusOrLoader
        statusCardInfo={[
          {
            title: "Total Courses",
            valueCount: allCourses?.courses?.length || 0,
          },
        ]}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div className="flex items-center justify-center mt-5">
          <Spinner />
        </div>
      ) : allCoursesTableData?.length > 0 ? (
        <Table
          headers={allCoursesTableHeaders}
          data={allCoursesTableData}
          showHeader={true}
          pageName="All Courses"
        />
      ) : (
        <NoDataFound message={"No Course found."} />
      )}

      {isThreadsBarOpen && (
        <Threads
          courseId={courseId}
          isThreadsBarOpen={isThreadsBarOpen}
          setIsThreadsBarOpen={setIsThreadsBarOpen}
        />
      )}

      <AllCourseBundles
        setIsBundleModalOpen={setIsBundleModalOpen}
        setModalType={setModalType}
        setSelectedBundleCourseId={setSelectedBundleCourseId}
      />

      <CreateOrEditCourseBundle
        isBundleModalOpen={isBundleModalOpen}
        setIsBundleModalOpen={setIsBundleModalOpen}
        modalType={modalType}
        courseIdsWithTitle={courseIdsWithTitle}
        selectedBundleCourseId={selectedBundleCourseId}
      />
    </>
  );
};

export default AdminCourses;
