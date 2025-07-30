/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useAddThreadMutation } from "../../../../../redux/Features/Course/courseApi";
import { toast } from "sonner";
import TextInput from "../../../../../components/Reusable/TextInput/TextInput";
import Textarea from "../../../../../components/Reusable/TextArea/TextArea";
import LoadingSpinner from "../../../../../components/Loaders/LoadingSpinner/LoadingSpinner";

type OtpFormData = {
  title: string;
  content: string;
};
const AddThreadForm = ({courseId, setIsAddThreadFormOpen} : {courseId: string; setIsAddThreadFormOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OtpFormData>();
  const [addThread, { isLoading }] = useAddThreadMutation();

  const handleAddThread = async (data: OtpFormData) => {
    try {
      const payload = {
        ...data,
      };
      const response = await addThread({ courseId, data: payload }).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        setIsAddThreadFormOpen(false);
        reset();
      }
    } catch (err) {
      toast.error((err as any)?.data?.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleAddThread)}
      className="flex flex-col gap-5 bg-neutral-15/20 border border-neutral-30/15 p-4"
    >
      <TextInput
        label="Title"
        placeholder="Enter title"
        error={errors.title}
        {...register("title", { required: "Title is required" })}
      />
      <Textarea
        label="Content"
        placeholder="Write content here..."
        rows={6}
        error={errors.content}
        {...register("content", {
          required: "Content is required",
        })}
      />

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className={`px-6 py-3 bg-primary-10 text-white rounded-xl text-lg font-semibold w-fit ${
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isLoading ? <LoadingSpinner /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AddThreadForm;
