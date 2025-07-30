/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ICONS } from "../../../../../assets";
import { useAddThreadMutation } from "../../../../../redux/Features/Course/courseApi";

type TFormData = {
  content: string;
};
const AddReplyForm = ({ courseId }: { courseId: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();
  const [addThread, { isLoading }] = useAddThreadMutation();

  const handleAddReplyOnThread = async (data: TFormData) => {
    try {
      const payload = {
        ...data,
      };
      const response = await addThread({
        courseId,
        data: payload,
      }).unwrap();
      if (response?.success) {
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
          className="pl-3 py-2 pr-2 rounded-3xl w-full focus:outline-none"
          {...register("content", {
            required: "Message is required",
          })}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="bg-primary-10 w-8 h-8 flex justify-center items-center rounded-full mx-2"
      >
        {isLoading ? (
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <img src={ICONS.ArrowUp} alt="send" />
        )}
      </button>
    </form>
  );
};

export default AddReplyForm;
