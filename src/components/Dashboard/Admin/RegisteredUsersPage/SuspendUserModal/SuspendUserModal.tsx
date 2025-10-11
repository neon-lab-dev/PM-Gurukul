/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useSuspendUserMutation } from "../../../../../redux/Features/Admin/adminApi";
import Modal from "../../../../Reusable/Modal/Modal";
import { toast } from "sonner";
import Textarea from "../../../../Reusable/TextArea/TextArea";

type TFormData = {
  suspensionReason: string;
};
const SuspendUserModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedUserId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: any;
  selectedUserId: string;
}) => {
  const [suspendUser, { isLoading }] = useSuspendUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSuspendUser = async (data: TFormData) => {
    try {
      const payload = {
        userId: selectedUserId,
        suspensionReason: data.suspensionReason,
      };
      const response = await suspendUser(payload).unwrap();
      if (response?.success) {
        toast.success("User suspended successfully");
        setIsModalOpen(false);
        reset();
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to suspend. Please try again.");
    }
  };
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      heading="Suspend User"
    >
      <form
        onSubmit={handleSubmit(handleSuspendUser)}
        className="flex flex-col gap-6 font-Nunito mt-5"
      >
        <div className="flex flex-col gap-6">
          {/* Reason */}
          <Textarea
            label="Suspension Reason"
            placeholder="Enter suspension reason"
            error={errors.suspensionReason}
            {...register("suspensionReason", {
              required: "Suspension reason is required",
            })}
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-[14px] py-3 bg-primary-10 text-white text-base font-medium leading-5 tracking-tighter rounded-[10px]"
          >
            {isLoading ? "Please wait..." : "Suspend User"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SuspendUserModal;
