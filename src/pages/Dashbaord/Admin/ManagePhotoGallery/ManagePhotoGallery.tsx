import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  useDeletePhotoMutation,
  useGetAllPhotosQuery,
} from "../../../../redux/Features/PhotoGallery/photoGalleryApi";
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import { toast } from "sonner";
import AddPhotoModal from "../../../../components/Dashboard/Admin/ManagePhotoGalleryPage/AddPhotoModal/AddPhotoModal";

type TPhotoGallery = {
  _id: string;
  title: string;
  poster: {
    public_id: string;
    url: string;
  };
};

const ManagePhotoGallery = () => {
  const { data, isLoading } = useGetAllPhotosQuery({});
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);

  const [deletePhoto] = useDeletePhotoMutation();

  const handleDeletePhoto = async (id: string) => {
    try {
      await toast.promise(deletePhoto(id).unwrap(), {
        loading: "Loading...",
        success: "Deleted successfully!",
        error: "Failed to delete. Please try again.",
      });
    } catch (err) {
      console.error("Error deleting this item:", err);
    }
  };

  // Skeleton Loader
  const renderSkeleton = () => {
    return Array.from({ length: 6 }).map((_, idx) => (
      <div
        key={idx}
        className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse h-64"
      >
        <div className="w-full h-full bg-gray-200"></div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <DashboardHeader
          pageName="Photo Gallery"
          pageDesc="Manage all photos"
        />
        <button
          onClick={() => setIsAddPhotoModalOpen(true)}
          className="px-[14px] py-3 bg-primary-10 text-white text-base font-medium leading-5 tracking-tighter rounded-[10px]"
        >
          Add a Photo
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {isLoading ? (
          renderSkeleton()
        ) : data?.photos?.length ? (
          data.photos.map((photo: TPhotoGallery) => (
            <div
              key={photo?._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative"
            >
              <div className="relative h-64">
                <img
                  src={photo?.poster.url}
                  alt={photo?.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white tracking-wide text-center">
                    {photo?.title}
                  </h3>
                </div>
              </div>

              <div className="absolute top-2 right-3">
                <button
                  onClick={() => handleDeletePhoto(photo._id)}
                  className="bg-red-500 text-white p-[6px] rounded-full hover:bg-red-600 transition"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-gray-500 mt-16 space-y-3">
            <FaTrash className="text-5xl" />
            <p className="text-lg font-medium">No photos available</p>
          </div>
        )}
      </div>

      {/* Add Photo Modal */}
      <AddPhotoModal
        isModalOpen={isAddPhotoModalOpen}
        setIsModalOpen={setIsAddPhotoModalOpen}
      />
    </div>
  );
};

export default ManagePhotoGallery;
