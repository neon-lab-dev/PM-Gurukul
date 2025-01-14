import { useState } from "react";
import { ICONS } from "../../../../assets";
import Textarea from "../../../../components/Reusable/TextArea/TextArea";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import AddVideo from "../../../../components/AddVideo/AddVideo";
import { Link } from "react-router-dom";

const AddCourse = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [videos, setVideos] = useState<
    { title: string; description: string; videoFile: File | null }[]
  >([]);

  const handleAddVideo = (videoData: {
    title: string;
    description: string;
    videoFile: File | null;
  }) => {
    setVideos((prevVideos) => [...prevVideos, videoData]);
  };

  return (
    <div className="flex flex-col p-6 bg-[#F8FAFC] gap-8 w-full">
      <div className="flex items-center w-full justify-between">
        <div className="flex gap-[10px] items-center">
          <Link to="/admin/courses">
            <button>
              <img src={ICONS.arrowLeft} className="w-9 h-9" alt="" />
            </button>
          </Link>
          <span className="text-[#0F172A] font-Inter font-semibold leading-7 tracking-tighter text-2xl">
            Add a course
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <button className="px-4 py-2 bg-white border-[1px] border-[#DFE2E6] rounded-lg text-[#091E42]">
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#051539] border-[#051539] rounded-lg text-white">
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:w-[80%] w-full p-6 bg-white gap-6 rounded-2xl mx-auto">
        <form className="flex flex-col gap-4 w-full">
          <TextInput
            label="Course Title"
            name="courseTitle"
            placeholder="Enter course title"
          />
          <Textarea
            label="Course Description"
            name="courseDescription"
            placeholder="Enter course description"
          />
          <div className="flex flex-col gap-2 font-Inter">
            <label htmlFor="" className="text-neutral-65">
              Category
              <span className="text-red-600"> *</span>
            </label>
            <div className="relative inline-block">
              <select
                name="category"
                id=""
                className="appearance-none px-[18px] py-[14px] rounded-lg bg-neutral-70 border border-neutral-75 w-full text-neutral-65"
              >
                <option value="0">Select Category</option>
                <option value="1" className="text-dark">
                  Category 1
                </option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
              </select>
              <img
                src={ICONS.arrowDown}
                alt="Dropdown Icon"
                className="absolute right-[18px] top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
            <TextInput
              label="Base Price"
              name="basePrice"
              placeholder="Enter base price"
            />
            <TextInput
              label="Discounted Price"
              name="DiscountedPrice"
              placeholder="Enter discounted price"
            />
          </div>
          <TextInput
            label="Number of videos"
            name="noOfVideos"
            placeholder="Enter Number of videos"
          />
        </form>
      </div>
      <div className="flex flex-col lg:w-[80%] w-full p-6 bg-white gap-6 rounded-2xl mx-auto">
        <div className="flex items-center justify-between w-full">
          <span className="text-[#0F172A] font-Inter text-[20px] font-semibold leading-5 tracking-tight">
            Upload Course Content
          </span>
          {videos.length > 0 && (
            <button className="bg-[#FAFBFB] font-Inter text-[14px] font-semibold leading-5 tracking-tight border-[1px] border-[#DFE2E6] rounded-lg px-3 py-[6px]">
              Add Video
            </button>
          )}
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          {videos.length === 0 ? (
            <>
              <img
                src={ICONS.folderUpload}
                className="w-[165px] h-[165px]"
                alt=""
              />
              <span className="font-Inter text-[14px] text-[#A6AEBB]">
                No Videos have been added yet
              </span>
            </>
          ) : (
            <ul className="w-full flex flex-col gap-2 max-h-[240px] overflow-y-auto">
              {videos.map((video, index) => (
                <li
                  key={index}
                  className="flex justify-between border-[1px] border-[#EBEDF0] rounded-[6px] p-[10px]"
                >
                  <div className="flex items-center gap-2">
                    <img src={ICONS.mp4} className="w-5 h-5" alt="" />
                    <span className="text-[#091E42] overflow-ellipsis text-[14px] font-medium leading-5 tracking-tight">
                      {video.title}
                    </span>
                    <span className="text-[#98A1B0] overflow-ellipsis text-[14px] leading-5 tracking-tight">
                      {video.videoFile
                        ? (video.videoFile.size / (1024 * 1024)).toFixed(2)
                        : "0.00"}{" "}
                      mb
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setVideos((prevVideos) =>
                        prevVideos.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <img src={ICONS.closeRed} className="w-5 h-5" alt="" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-xl border-[1px] border-[#DFE2E6] px-4 py-[10px]"
          >
            Add a video
          </button>
        </div>
      </div>
      <AddVideo
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddVideo}
      />
    </div>
  );
};

export default AddCourse;
