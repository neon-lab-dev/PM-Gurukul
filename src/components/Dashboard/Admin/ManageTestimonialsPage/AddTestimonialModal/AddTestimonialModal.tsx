/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Modal from "../../../../Reusable/Modal/Modal";
import TextInput from "../../../../Reusable/TextInput/TextInput";
import Textarea from "../../../../Reusable/TextArea/TextArea";
import SelectDropdown from "../../../../Reusable/Dropdown/SelectDropdown";
import { useAddTestimonialMutation } from "../../../../../redux/Features/Testimonial/testimonialApi";
import { toast } from "sonner";

type TFormData = {
  name: string;
  designation: string;
  testimonialType: "Video" | "Text";
  review?: string;
  rating: number;
  poster: any;
  video?: any;
};

interface IProps {
  isTestimonialModalOpen: boolean;
  setIsTestimonialModalOpen: any;
}

const AddTestimonialModal: React.FC<IProps> = ({
  isTestimonialModalOpen,
  setIsTestimonialModalOpen,
}) => {
  const [addTestimonial, { isLoading }] = useAddTestimonialMutation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const testimonialType = watch("testimonialType");

  const handleSubmitForm = async (data: TFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("designation", data.designation);
      formData.append("testimonialType", data.testimonialType);
      formData.append("review", data.review || "");
      formData.append("rating", data.rating.toString());
      formData.append("poster", data.poster[0]);
      if (data.video) {
        formData.append("video", data.video[0]);
      }
      const response = await addTestimonial(formData).unwrap();
      if (response?.success) {
        toast.success("Testimonial added successfully");
        setIsTestimonialModalOpen(false);
        reset();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add testimonial. Please try again.");
    }
  };

  return (
    <Modal
      isModalOpen={isTestimonialModalOpen}
      setIsModalOpen={setIsTestimonialModalOpen}
      heading="Add Testimonial"
    >
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-6 font-Nunito mt-5"
      >
        <div className="flex flex-col gap-6">
          {/* Name */}
          <TextInput
            label="Name"
            placeholder="Enter reviewer's name"
            error={errors.name}
            {...register("name", { required: "Name is required" })}
          />

          {/* Designation */}
          <TextInput
            label="Designation & Company"
            placeholder="Ex: John Smith, ABC Company"
            error={errors.designation}
            {...register("designation", {
              required: "Designation is required",
            })}
          />

          {/* Testimonial Type */}
          <SelectDropdown
            label="Testimonial Type"
            options={["Text", "Video"]}
            error={errors.testimonialType}
            {...register("testimonialType", { required: "Select type" })}
          />

          {/* Review - only for Text */}
          {testimonialType === "Text" && (
            <Textarea
              label="Review"
              placeholder="Enter review"
              error={errors.review}
              {...register("review", { required: "Review is required" })}
            />
          )}

          {/* Profile Picture */}
          <TextInput
            label="Profile Picture"
            type="file"
            error={errors.poster}
            {...register("poster", { required: "Profile picture is required" })}
          />

          {/* Video - only for Video type */}
          {testimonialType === "Video" && (
            <TextInput
              label="Video"
              type="file"
              error={errors.video}
              {...register("video", { required: "Video is required" })}
            />
          )}

          {/* Rating */}
          <TextInput
            label="Rating"
            type="number"
            placeholder="Enter rating (1-5)"
            error={errors.rating}
            {...register("rating", {
              required: "Rating is required",
              min: { value: 1, message: "Minimum rating is 1" },
              max: { value: 5, message: "Maximum rating is 5" },
            })}
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-[14px] py-3 bg-primary-10 text-white text-base font-medium leading-5 tracking-tighter rounded-[10px]"
          >
            {isLoading ? "Adding..." : "Add Testimonial"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTestimonialModal;
