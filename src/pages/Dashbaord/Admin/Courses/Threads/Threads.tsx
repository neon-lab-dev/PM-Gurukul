/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IMAGES } from "../../../../../assets";
import {
  useDeleteThreadMutation,
  useGetSingleCourseByIdQuery,
} from "../../../../../redux/Features/Course/courseApi";
import AddReplyForm from "./AddReplyForm";
import ThreadCardLoader from "../../../../../components/Loaders/ThreadCardLoader/ThreadCardLoader";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../../redux/Features/Auth/authSlice";
import { TLoggedInUser } from "../../../../../types/user.types";

const Threads = ({
  courseId,
  isThreadsBarOpen,
  setIsThreadsBarOpen,
}: {
  courseId: string;
  isThreadsBarOpen: boolean;
  setIsThreadsBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;

  //   Control outside click
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

  //   To fetch threads/forum contents
  const { data: singleCourseData, isLoading: isThreadLoading } =
    useGetSingleCourseByIdQuery(courseId, {
      pollingInterval: 10000, // 10 seconds
    });

  const [deletingThreadId, setDeletingThreadId] = useState<string | null>(null);

  const [deleteThread] = useDeleteThreadMutation();

  const handleDeleteThread = async (id: string) => {
    try {
      setDeletingThreadId(id);
      await deleteThread({ courseId, id }).unwrap();
    } catch (err) {
      console.error("Error deleting course:", err);
    } finally {
      setDeletingThreadId(null);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed font-Inter inset-0 bg-black transition-opacity duration-300 z-40 ${
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
          <h2 className="text-lg font-semibold">
            {singleCourseData?.course?.title} | Forum
          </h2>
          <button onClick={() => setIsThreadsBarOpen(false)}>✕</button>
        </div>

        <div className="flex flex-col justify-between relative gap-6 bg-neutral-80 px-4 py-6 h-[calc(100%-4rem)]">
          <img
            src={IMAGES.chatBg}
            alt=""
            className="absolute top-0 bottom-0 right-0 left-0 h-full w-full z-0 opacity-[0.02]"
          />
          {/* Forum content */}
          {isThreadLoading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((_, index) => (
                <ThreadCardLoader key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 h-[80vh] border-b overflow-y-auto relative">
              {singleCourseData?.course?.forum?.length < 1 ? (
                <p>No message found</p>
              ) : (
                singleCourseData?.course?.forum?.map((thread: any) => {
                  const isAdmin = thread?.sender?.role === "admin";

                  return (
                    <div
                      key={thread?._id}
                      className={`flex flex-col ${
                        isAdmin ? "self-start" : "self-end"
                      }`}
                    >
                      <div className="flex gap-2">
                        {isAdmin ? (
                          <div className="bg-white size-8 rounded-full p-1">
                            <img
                              src={IMAGES.pmGurukulFavicon}
                              alt="avatar"
                              className="size-7 rounded-full"
                            />
                          </div>
                        ) : (
                          <div className="size-8 rounded-full bg-primary-10 flex items-center justify-center font-semibold text-white">
                            {thread?.sender?.full_name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {/* Card */}
                        <div
                          className={`flex flex-col rounded-tr-xl rounded-b-xl px-3 py-2 gap-2 w-fit relative min-w-[200px] shadow ${
                            isAdmin ? "bg-primary-10" : "bg-white"
                          }`}
                        >
                          <div
                            className={`w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent z-50 -rotate-90 absolute top-1 -left-3 ${
                              isAdmin
                                ? "border-b-primary-10"
                                : "border-b-white "
                            }`}
                          ></div>

                          <div className="flex justify-between">
                            {/* Sender Profile */}
                            <div className="flex items-center gap-2">
                              <div>
                                <h1
                                  className={`text-sm font-medium ${
                                    isAdmin ? "text-white" : "text-neutral-90"
                                  }`}
                                >
                                  {isAdmin
                                    ? "PMGURUKKUL | Admin"
                                    : thread?.sender?.full_name}
                                </h1>
                                <p className="text-neutral-10 text-[11px]">
                                  {new Date(thread?.createdAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            {user?._id === thread?.sender?._id && (
                              <p>
                                {deletingThreadId === thread._id ? (
                                  <div className="w-3 h-3 border-2 border-primary-10 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <MdDelete
                                    onClick={() =>
                                      handleDeleteThread(thread._id)
                                    }
                                    className="text-rose-500 mt-[3px] cursor-pointer"
                                  />
                                )}
                              </p>
                            )}
                          </div>

                          {/* Message */}
                          <p
                            className={`mt-1 text-sm capitalize ${
                              isAdmin ? "text-white" : "text-neutral-90"
                            }`}
                          >
                            {thread?.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          <AddReplyForm courseId={courseId} />
        </div>
      </div>
    </>
  );
};

export default Threads;
