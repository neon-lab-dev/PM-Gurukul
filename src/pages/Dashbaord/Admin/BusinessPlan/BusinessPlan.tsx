/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useAddBusinessPlanDocMutation,
  useDeleteBusinessPlanDocMutation,
  useGetAllBusinessPlanDocsQuery,
  useGetSingleBusinessPlanDocByIdQuery,
  useUpdateBusinessPlanDocMutation,
} from "../../../../redux/Features/BuisnessPlan/buisnessPlanApi";
import Modal from "../../../../components/Reusable/Modal/Modal";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import Textarea from "../../../../components/Reusable/TextArea/TextArea";
import { FaFileAlt, FaCalendar, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { formatDate } from "../../../../utils/formatDate";
import { FiEye } from "react-icons/fi";

interface BusinessPlanFormData {
  title: string;
  description: string;
  fileUrl: string;
}

const BusinessPlan = () => {
  const { data } = useGetAllBusinessPlanDocsQuery({});
  const [addBusinessPlanDoc] = useAddBusinessPlanDocMutation();
  const [updateBusinessPlanDoc] = useUpdateBusinessPlanDocMutation();
  const [deleteBusinessPlanDoc] = useDeleteBusinessPlanDocMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [editId, setEditId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BusinessPlanFormData>();

  // If editing, fetch single doc and populate fields
  const { data: singleDoc } = useGetSingleBusinessPlanDocByIdQuery(editId!, {
    skip: !editId,
  });

  useEffect(() => {
    if (modalType === "edit" && singleDoc) {
      setValue("title", singleDoc.doc.title);
      setValue("description", singleDoc.doc.description);
      setValue("fileUrl", singleDoc.doc.fileUrl);
    }
  }, [singleDoc, modalType, setValue]);

  const openAddModal = () => {
    reset();
    setModalType("add");
    setIsModalOpen(true);
  };

  const openEditModal = (id: string) => {
    setEditId(id);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (formData: BusinessPlanFormData) => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        fileUrl: formData.fileUrl,
      };

      if (modalType === "add") {
        await toast.promise(addBusinessPlanDoc(payload).unwrap(), {
          loading: "Adding...",
          success: "Added successfully!",
          error: "Failed to add.",
        });
        setIsModalOpen(false);
      } else if (modalType === "edit" && editId) {
        await toast.promise(
          updateBusinessPlanDoc({ id: editId, data: payload }).unwrap(),
          {
            loading: "Updating...",
            success: "Updated successfully!",
            error: "Failed to update.",
          }
        );
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDoc = async (id: string) => {
    try {
      await toast.promise(deleteBusinessPlanDoc(id).unwrap(), {
        loading: "Deleting...",
        success: "Deleted successfully!",
        error: "Failed to delete.",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Business Plans
            </h1>
            <p className="text-gray-600">
              Manage your business plan documents and files
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-medium flex items-center gap-2"
          >
            <FaPlus className="w-5 h-5" />
            Add New Document
          </button>
        </div>

        {/* Business Plan Cards */}
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {data?.docs?.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFileAlt className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No documents yet
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by adding your first business plan document.
              </p>
              <button
                onClick={openAddModal}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Your First Document
              </button>
            </div>
          ) : (
            data?.docs?.map((plan: any) => (
              <div
                key={plan._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Document Icon */}
                    <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                      <FaFileAlt className="w-6 h-6 text-blue-600" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {plan.title}
                        </h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
                          {formatDate(plan.createdAt)}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {plan.description}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <a
                          href={plan?.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group/download"
                        >
                          <FiEye className="text-lg group-hover/download:scale-110 transition-transform" />
                          View Business Plan
                        </a>
                        <span className="hidden sm:block text-gray-300">•</span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <FaCalendar className="w-4 h-4" />
                          Added {formatDate(plan.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => openEditModal(plan._id)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md group/edit"
                    >
                      <FaEdit className="w-4 h-4 group-hover/edit:scale-110 transition-transform" />
                      Edit Document
                    </button>
                    <button
                      onClick={() => handleDeleteDoc(plan._id)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md group/delete"
                    >
                      <FaTrash className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          heading={
            modalType === "add"
              ? "Add Business Plan Document"
              : "Edit Business Plan Document"
          }
        >
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col gap-6 mt-6"
          >
            <div className="space-y-4">
              <TextInput
                label="Document Title"
                placeholder="Enter document title"
                error={errors.title}
                {...register("title", { required: "Title is required" })}
              />

              <Textarea
                label="Description"
                placeholder="Enter document description"
                error={errors.description}
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
              />

              <TextInput
                label="Document File URL"
                placeholder="Enter business doc URL (Google Drive)"
                error={errors.fileUrl}
                {...register("fileUrl", {
                  required: "File URL is required",
                })}
              />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
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
                  "Add Document"
                ) : (
                  "Update Document"
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default BusinessPlan;
