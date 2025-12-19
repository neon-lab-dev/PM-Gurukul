/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useAssignPageMutation } from "../../../../../redux/Features/Admin/adminApi";
import Modal from "../../../../Reusable/Modal/Modal";
import { useEffect, useState } from "react";

// Already stripped admin page links
const adminPageLinks = [
  "/dashboard",
  "/referrals-and-payouts",
  "/registered-users",
  "/affiliates",
  "/courses",
  "/payouts",
  "/weekly-payouts",
  "/purchase-history",
  "/talents",
  "/manage-testimonials",
  "/manage-photo-gallery",
  "/leaderboard",
  "/referral-network",
  "/business-plan",
];

const AssignPageModal = ({
  userId,
  isModalOpen,
  setIsModalOpen,
  defaultValues,
}: {
  userId: string;
  isModalOpen: boolean;
  setIsModalOpen: any;
  defaultValues: string[];
}) => {
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [assignPage, { isLoading }] = useAssignPageMutation();

  useEffect(() => {
    if (defaultValues && Array.isArray(defaultValues)) {
      setSelectedPages([...defaultValues]);
    }
  }, [defaultValues]);

  const handleAssignPage = async () => {
    try {
      const payload = {
        userId,
        pages: selectedPages,
      };

      const response = await assignPage(payload).unwrap();
      if (response?.success) {
        toast.success("Page assigned successfully");
        setIsModalOpen(false);
      }
    } catch (error: any) {
      toast.error("Failed to assign page. Please try again.");
    }
  };

  const togglePageSelection = (page: string) => {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      heading="Assign Page Access"
    >
      <div className="flex flex-col gap-6 font-Nunito mt-7 font-Inter">
        <div className="flex items-center gap-3 flex-wrap">
          {adminPageLinks.map((page) => {
            const displayName = page.replace(/-/g, " ").replace(/^\//, "");
            const isSelected = selectedPages.includes(page);
            return (
              <button
                key={page}
                type="button"
                onClick={() => togglePageSelection(page)}
                className={`px-3 py-2 rounded capitalize ${
                  isSelected
                    ? "bg-primary-10 text-white"
                    : "bg-neutral-15/50 text-neutral-90"
                }`}
              >
                {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
              </button>
            );
          })}
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleAssignPage}
            className="px-[14px] py-3 bg-primary-10 text-white text-base font-medium leading-5 tracking-tighter rounded-[10px]"
          >
            {isLoading ? "Please wait..." : "Submit"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignPageModal;
