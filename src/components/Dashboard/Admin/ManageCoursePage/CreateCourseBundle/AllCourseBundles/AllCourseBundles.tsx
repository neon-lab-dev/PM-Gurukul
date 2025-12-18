/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteCourseBundleMutation,
  useGetAllCourseBundlesQuery,
} from "../../../../../../redux/Features/CourseBundle/courseBundleApi";
import Spinner from "../../../../../Loaders/Spinner/Spinner";
import DashboardHeader from "../../../../../Reusable/DashboardHeader/DashboardHeader";
import NoDataFound from "../../../../../Shared/NoDataFound/NoDataFound";
import { toast } from "sonner";
import { formatDate } from "../../../../../../utils/formatDate";
import { Table } from "../../../../../ReferralPayoutsPage/TransactionHistory";

type TAllCourseBundles = {
  setIsBundleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: React.Dispatch<React.SetStateAction<"add" | "edit">>;
  setSelectedBundleCourseId: React.Dispatch<React.SetStateAction<string>>
};
const AllCourseBundles: React.FC<TAllCourseBundles> = ({
  setIsBundleModalOpen,
  setModalType,
  setSelectedBundleCourseId
}) => {
  const { data: allCourseBundles, isLoading } = useGetAllCourseBundlesQuery({});
  const [deleteCourseBundle] = useDeleteCourseBundleMutation();

  const handleDeleteCourseBundle = async (id: string) => {
    try {
      await toast.promise(deleteCourseBundle(id).unwrap(), {
        loading: "Loading...",
        success: "Course bundle deleted successfully!",
        error: "Failed to delete course bundle. Please try again.",
      });
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };
  // Course table headers
  const allCourseBundlesTableHeaders = [
    { key: "no", label: "SL.NO", sortable: true },
    { key: "title", label: "TITLE", sortable: true },
    { key: "basePrice", label: "BASE PRICE", sortable: true },
    { key: "discountedPrice", label: "DISCOUNTED PRICE", sortable: true },
    { key: "publishedOn", label: "PUBLISHED ON", sortable: true },
    { key: "action", label: "ACTION", sortable: false },
  ];

  // Course table data
  const allCourseBundlesTableData = allCourseBundles?.bundles?.length
    ? allCourseBundles?.bundles?.map((bundle: any, index: number) => ({
        no: `${index + 1}`,
        title: bundle?.title,
        basePrice: `₹${bundle?.basePrice}`,
        discountedPrice: bundle?.discountedPrice
          ? `₹${bundle.discountedPrice}`
          : "—",
        publishedOn: formatDate(bundle?.createdAt),
        action: [
          {
            label: "Update Bundle",
            onClick: () => {
              setSelectedBundleCourseId(bundle?._id);
              setModalType("edit");
              setIsBundleModalOpen(true);
            },
          },
          {
            label: "Delete Bundle",
            onClick: () => handleDeleteCourseBundle(bundle?._id),
          },
        ],
      }))
    : [];

  return (
    <div className="space-y-4 mt-5">
      <DashboardHeader
        pageName="All Course Bundles"
        pageDesc="All your course bundles in one place."
      />

      {isLoading ? (
        <div className="flex items-center justify-center mt-5">
          <Spinner />
        </div>
      ) : allCourseBundlesTableData?.length > 0 ? (
        <Table
          headers={allCourseBundlesTableHeaders}
          data={allCourseBundlesTableData}
          showHeader={true}
          pageName="All Course Bundles"
        />
      ) : (
        <NoDataFound message={"No Course Bundle found."} />
      )}
    </div>
  );
};

export default AllCourseBundles;
