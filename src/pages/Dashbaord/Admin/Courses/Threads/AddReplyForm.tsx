/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useAddReplyToThreadMutation } from "../../../../../redux/Features/Course/courseApi";
import { toast } from "sonner";
import { ICONS } from "../../../../../assets";

type TFormData = {
  message: string;
};
const AddReplyForm = ({
  courseId,
  selectedThreadId,
  setSelectedThreadId,
}: {
  courseId: string;
  selectedThreadId: string;
  setSelectedThreadId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();
  const [addReplyToThread, { isLoading }] = useAddReplyToThreadMutation();

  const handleAddReplyOnThread = async (data: TFormData) => {
    try {
      if (!selectedThreadId) {
        toast.error("Please select a thread first.");
        return;
      }
      const payload = {
        ...data,
      };
      const response = await addReplyToThread({
        courseId,
        messageId: selectedThreadId,
        data: payload,
      }).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        setSelectedThreadId("");
        reset();
      }
    } catch (err) {
      toast.error((err as any)?.data?.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleAddReplyOnThread)}
      className="flex justify-between items-center border border-neutral-300 bg-white rounded-3xl relative"
    >
      <div className="w-full">
        <input
          type="text"
          placeholder="Share your thought on forum..."
          className="p-2 rounded-3xl w-full focus:outline-none"
          {...register("message", {
            required: "Message is required",
          })}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="bg-primary-10 w-8 h-8 flex justify-center items-center rounded-full mx-2"
      >
        <img src={ICONS.ArrowUp} alt="send" />
      </button>
    </form>
  );
};

export default AddReplyForm;
