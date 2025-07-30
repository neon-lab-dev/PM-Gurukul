/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ICONS, IMAGES } from "../../../../../assets";
import {
  useAddThreadMutation,
  useGetSingleCourseByIdQuery,
} from "../../../../../redux/Features/Course/courseApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import TextInput from "../../../../../components/Reusable/TextInput/TextInput";
import Textarea from "../../../../../components/Reusable/TextArea/TextArea";
import LoadingSpinner from "../../../../../components/Loaders/LoadingSpinner/LoadingSpinner";

type OtpFormData = {
  title: string;
  content: string;
};

const Threads = ({
  courseId,
  isThreadsBarOpen,
  setIsThreadsBarOpen,
}: {
  courseId: string;
  isThreadsBarOpen: boolean;
  setIsThreadsBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickedInsideSidebar = target.closest(".threads-sidebar");

      if (isThreadsBarOpen && !clickedInsideSidebar) {
        setIsThreadsBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isThreadsBarOpen, setIsThreadsBarOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OtpFormData>();

  const { data: singleCourseData, isLoading: isThreadLoading } =
    useGetSingleCourseByIdQuery(courseId);
  console.log(singleCourseData);
  const [isAddThreadFormOpen, setIsAddThreadFormOpen] =
    useState<boolean>(false);
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
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isThreadsBarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsThreadsBarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[600px] bg-white shadow-xl z-50 transition-transform duration-300 threads-sidebar ${
          isThreadsBarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsThreadsBarOpen(false)}>✕</button>
            <h2 className="text-lg font-semibold">Course Forum</h2>
          </div>
          <button
            type="button"
            className="px-5 bg-primary-10 text-white py-2 rounded-lg"
            onClick={() => setIsAddThreadFormOpen(!isAddThreadFormOpen)}
          >
            Add Thread
          </button>
        </div>

        {isAddThreadFormOpen && (
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
        )}

        <div className="flex flex-col justify-between relative gap-6 bg-neutral-80 p-6 h-[calc(100%-4rem)] ">
          {/* Forum content */}
          <div className="flex flex-col gap-4 h-[70vh] overflow-y-scroll">
            {singleCourseData?.course?.forum?.map((thread: any) => (
              <div
                key={thread?._id}
                className="flex justify-start items-end gap-2"
              >
                <img
                  src={IMAGES.pmGurukulFavicon}
                  alt="avatar"
                  className="size-7 rounded-full"
                />
                <div className="flex flex-col bg-[#ebedf0] rounded-xl p-4 gap-2 w-full">
                  <div className=" gap-2">
                    <h1 className="text-neutral-90 font-medium">
                      PMGURUKKUL | Admin
                    </h1>
                    <p className="text-neutral-65 text-xs">
                      {new Date(thread?.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h1 className="mt-2 capitalize font-semibold">
                      {thread?.title}
                    </h1>

                    <p className="text-neutral-65">{thread?.content}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end ">
              <div className="flex bg-primary-10 rounded-xl p-4">
                <p className="text-white">Meet link please</p>
              </div>
            </div>
          </div>

          {/* <form
            onSubmit={handleSubmit(handleAddThread)}
            className="flex justify-between items-center border border-neutral-300 bg-white rounded-3xl relative"
          >
            <input
              type="text"
              placeholder="Ask a question..."
              className=" p-2 rounded-3xl w-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary-10 w-8 h-8 flex justify-center items-center rounded-full mx-2"
            >
              <img src={ICONS.ArrowUp} alt="send" />
            </button>
          </form> */}
        </div>
      </div>
    </>
  );
};

export default Threads;
