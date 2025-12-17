/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Modal from "../../../../Reusable/Modal/Modal";
import TextInput from "../../../../Reusable/TextInput/TextInput";
import Textarea from "../../../../Reusable/TextArea/TextArea";
import { useCreateCourseBundleMutation } from "../../../../../redux/Features/CourseBundle/courseBundleApi";
import { toast } from "sonner";
import { useState } from "react";

type TCreateCourseBundle = {
  isCreateBundleModalOpen: boolean;
  setIsCreateBundleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: "add" | "edit";
  courseIdsWithTitle: { _id: string; title: string }[];
};
type TFormData = {
  title: string;
  basePrice: string;
  discountedPrice: string;
  description: string;
  file: any;
};
const CreateCourseBundle: React.FC<TCreateCourseBundle> = ({
  isCreateBundleModalOpen,
  setIsCreateBundleModalOpen,
  modalType,
  courseIdsWithTitle,
}) => {
  const [createCourseBundle] = useCreateCourseBundleMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormData>();
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);

  const handleSubmitCourseBundle = async (data: TFormData) => {
    try {
      if (!selectedCourseIds.length) {
        toast.error("Please select at least one course");
        return;
      }

      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("basePrice", data.basePrice);
      formdata.append("discountedPrice", data.discountedPrice);
      formdata.append("description", data.description);
      formdata.append("courseIds", JSON.stringify(selectedCourseIds));
      formdata.append("file", data.file[0]);

      const response = await createCourseBundle(formdata).unwrap();

      if (response?.success) {
        toast.success("Course bundle created successfully");
        setIsCreateBundleModalOpen(false);
        setSelectedCourseIds([]);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create course bundle");
    }
  };

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourseIds(
      (prev) =>
        prev.includes(courseId)
          ? prev.filter((id) => id !== courseId) // deselect
          : [...prev, courseId] // select
    );
  };

  return (
    <Modal
      isModalOpen={isCreateBundleModalOpen}
      setIsModalOpen={setIsCreateBundleModalOpen}
      heading={
        modalType === "add"
          ? "Add Business Plan Document"
          : "Edit Business Plan Document"
      }
    >
      <form
        onSubmit={handleSubmit(handleSubmitCourseBundle)}
        className="flex flex-col gap-6 mt-6 font-Inter"
      >
        <div className="space-y-4">
          <div>
            <p className="text-neutral-90">Select Course</p>
            <div className="flex items-center gap-2 w-full overflow-x-auto mt-1">
              {courseIdsWithTitle?.map((course) => (
                <button
                  key={course._id}
                  type="button"
                  onClick={() => toggleCourseSelection(course?._id)}
                  className={`py-2 px-3 rounded-lg w-fit cursor-pointer text-nowrap transition-colors
        ${
          selectedCourseIds.includes(course?._id)
            ? "bg-blue-600 text-white"
            : "bg-neutral-60 text-primary-10"
        }`}
                >
                  {course?.title}
                </button>
              ))}
            </div>
          </div>
          <TextInput
            label="Bundle Title"
            placeholder="Enter bundle title"
            error={errors.title}
            {...register("title", { required: "Title is required" })}
          />

          <TextInput
            label="Base Price"
            placeholder="Enter base price"
            error={errors.basePrice}
            {...register("basePrice", { required: "Base Price is required" })}
          />

          <TextInput
            label="Discounted Price"
            placeholder="Enter discounted price"
            error={errors.discountedPrice}
            {...register("discountedPrice", { required: "Discounted Price is required" })}
          />

          <Textarea
            label="Description"
            placeholder="Enter bundle description"
            error={errors.description}
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
          />

          <TextInput
            label="Thumbnail"
            type="file"
            error={errors.file}
            {...register("file", {
              required: "File is required",
            })}
          />
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <button
            type="button"
            onClick={() => setIsCreateBundleModalOpen(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {modalType === "add" ? "Adding..." : "Updating..."}
              </span>
            ) : modalType === "add" ? (
              "Create Bundle"
            ) : (
              "Update Bundle"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCourseBundle;
