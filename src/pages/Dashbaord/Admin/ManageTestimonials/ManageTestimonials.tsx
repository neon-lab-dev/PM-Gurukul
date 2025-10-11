import { FaTrash } from "react-icons/fa";
import {
  useDeleteTestimonialMutation,
  useGetAllTestimonialsQuery,
} from "../../../../redux/Features/Testimonial/testimonialApi";
import { TTestimonial } from "../../../../components/TestimonialSection/TestimonialSection";
import TestimonialCard from "../../../../components/HomePage/Testimonials/TestimonialCard";
import { toast } from "sonner";
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import { useState } from "react";
import AddTestimonialModal from "../../../../components/Dashboard/Admin/ManageTestimonialsPage/AddTestimonialModal/AddTestimonialModal";

const ManageTestimonials = () => {
    const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState<boolean>(false);
  const { data, isLoading, error } = useGetAllTestimonialsQuery({});

  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const handleDeleteTestimonial = async (id: string) => {
    try {
      await toast.promise(deleteTestimonial(id).unwrap(), {
        loading: "Loading...",
        success: "Deleted successfully!",
        error: "Failed to delete. Please try again.",
      });
    } catch (err) {
      console.error("Error deleting this item:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-200 animate-pulse rounded-2xl h-[264px]"
          ></div>
        ))}
      </div>
    );
  }

  if (error || !data?.testimonials?.length) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 mt-16 space-y-3">
        <FaTrash className="text-5xl" />
        <p className="text-lg font-medium">No testimonials available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <DashboardHeader
          pageName="Testimonials"
          pageDesc="Manage all testimonials"
        />
        <button onClick={() => setIsTestimonialModalOpen(true)} className="px-[14px] py-3 bg-primary-10 text-white text-base font-medium leading-5 tracking-tighter rounded-[10px]">
          Add a Testimonial
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.testimonials.map((testimonial: TTestimonial) => (
          <div key={testimonial._id} className="relative">
            <TestimonialCard {...testimonial} />
            {/* Delete / Edit Buttons */}
            <div className="top-2 right-[86px] absolute">
              <button
                onClick={() => handleDeleteTestimonial(testimonial?._id)}
                className="bg-red-500 text-white p-[6px] rounded-full hover:bg-red-600 transition"
              >
                <FaTrash size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddTestimonialModal isTestimonialModalOpen={isTestimonialModalOpen} setIsTestimonialModalOpen={setIsTestimonialModalOpen} />
    </div>
  );
};

export default ManageTestimonials;
