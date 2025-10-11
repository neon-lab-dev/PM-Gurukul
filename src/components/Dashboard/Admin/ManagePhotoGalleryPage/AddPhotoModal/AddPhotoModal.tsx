/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Modal from "../../../../Reusable/Modal/Modal";
import TextInput from "../../../../Reusable/TextInput/TextInput";
import { toast } from "sonner";
import { useAddPhotoMutation } from "../../../../../redux/Features/PhotoGallery/photoGalleryApi";

type TFormData = {
  title: string;
  poster: any;
};

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
}

const AddPhotoModal: React.FC<IProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [addPhoto, { isLoading }] = useAddPhotoMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSubmitForm = async (data: TFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("file", data.poster[0]);
      const response = await addPhoto(formData).unwrap();
      if (response?.success) {
        toast.success("Photo added successfully");
        setIsModalOpen(false);
        reset();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add photo. Please try again.");
    }
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      heading="Add Photo"
    >
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-6 font-Nunito mt-5"
      >
        <div className="flex flex-col gap-6">
          {/* Name */}
          <TextInput
            label="Photo Title"
            placeholder="Enter photo title"
            error={errors.title}
            {...register("title", { required: "Photo title is required" })}
          />

          {/* Image */}
          <TextInput
            label="Image"
            type="file"
            error={errors.poster}
            {...register("poster", { required: "Image is required" })}
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

export default AddPhotoModal;
