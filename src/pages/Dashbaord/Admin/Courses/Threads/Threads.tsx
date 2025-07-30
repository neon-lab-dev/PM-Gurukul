/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IMAGES } from "../../../../../assets";
import { useGetSingleCourseByIdQuery } from "../../../../../redux/Features/Course/courseApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../../redux/Features/Auth/authSlice";
import { TLoggedInUser } from "../../../../../types/user.types";
import { FaChevronDown } from "react-icons/fa";
import AddThreadForm from "./AddThreadForm";
import AddReplyForm from "./AddReplyForm";
import ThreadCardLoader from "../../../../../components/Loaders/ThreadCardLoader/ThreadCardLoader";
import { MdDelete } from "react-icons/md";

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
    useGetSingleCourseByIdQuery(courseId);

  // To control add thread/forum form for admin
  const [isAddThreadFormOpen, setIsAddThreadFormOpen] =
    useState<boolean>(false);

  // To control the replies accordion
  const [isAccordingOpen, setIsAccordingOpen] = useState(-1);
  const handleClick = (index: number) =>
    setIsAccordingOpen((prevIndex) => (prevIndex === index ? -1 : index));

  const [selectedThreadId, setSelectedThreadId] = useState<string>("");
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
          <div className="flex items-center gap-3">
            <button onClick={() => setIsThreadsBarOpen(false)}>✕</button>
            <h2 className="text-lg font-semibold">Course Forum</h2>
          </div>
          {user?.role === "admin" && (
            <button
              type="button"
              className="px-5 bg-primary-10 text-white py-2 rounded-lg"
              onClick={() => setIsAddThreadFormOpen(!isAddThreadFormOpen)}
            >
              Add Thread
            </button>
          )}
        </div>

        {/* Add thread form */}
        {isAddThreadFormOpen && (
          <AddThreadForm
            courseId={courseId}
            setIsAddThreadFormOpen={setIsAddThreadFormOpen}
          />
        )}

        <div className="flex flex-col justify-between relative gap-6 bg-neutral-80 p-6 h-[calc(100%-4rem)]">
          {/* Forum content */}
          {isThreadLoading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((_, index) => (
                <ThreadCardLoader key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 h-[80vh] border-b overflow-y-auto">
              {
              singleCourseData?.course?.forum?.length < 1 ?
              <p>No threads found</p>
              :
              singleCourseData?.course?.forum?.map(
                (thread: any, index: number) => (
                  <div key={thread?._id} className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={selectedThreadId === thread._id}
                      onChange={() =>
                        setSelectedThreadId(
                          selectedThreadId === thread._id ? null : thread._id
                        )
                      }
                      className="accent-primary-10 size-4"
                    />
                    <div className="w-full">
                      <div
                        className={`flex flex-col bg-primary-10 rounded-xl p-4 gap-2 w-full ${
                          isAccordingOpen === index && "rounded-b-none"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-white size-8 rounded-full p-1">
                              <img
                                src={IMAGES.pmGurukulFavicon}
                                alt="avatar"
                                className="size-7 rounded-full"
                              />
                            </div>
                            <div>
                              <h1 className="text-white font-medium">
                                PMGURUKKUL | Admin
                              </h1>
                              <p className="text-neutral-10 text-xs">
                                {new Date(thread?.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleClick(index)}
                            className="text-white font-medium flex items-center gap-2 cursor-pointer"
                          >
                            View Replies
                            <FaChevronDown
                              className={`dark:text-slate-600 text-text transition-all duration-300 ${
                                isAccordingOpen === index && "rotate-[180deg]"
                              }`}
                            />
                          </button>
                        </div>
                        <div>
                          <h1 className="mt-2 capitalize font-semibold text-white">
                            {thread?.title}
                          </h1>

                          <p className="text-neutral-15/80">
                            {thread?.content}
                          </p>
                        </div>
                      </div>

                      {/* Replies */}
                      <div
                        className={`grid transition-all duration-300 rounded-b-xl overflow-hidden ease-in-out bg-[#ebedf0] p-4 max-h-[300px] overflow-y-auto custom-scrollbar ${
                          isAccordingOpen === index
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] h-0 opacity-0"
                        }`}
                      >
                        {thread?.replies?.length > 1 && (
                          <h1 className="text-neutral-90 font-medium">
                            All replies from students
                          </h1>
                        )}
                        {/* All replies */}
                        <div className="flex flex-col gap-4 mt-3">
                          {thread?.replies?.length < 1 ? (
                            <p>No replies yet</p>
                          ) : (
                            thread?.replies?.map((reply: any) => (
                              <div
                                key={reply?._id}
                                className="flex flex-col gap-3 bg-white rounded-xl p-4"
                              >
                               <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-2">
                                  <div className="size-8 rounded-full bg-[#ebedf0] flex items-center justify-center font-semibold">
                                    {reply?.sender?.full_name
                                      ?.charAt(0)
                                      .toUpperCase()}
                                  </div>
                                  <div>
                                    <h1 className="text-neutral-90 font-medium text-sm">
                                      {reply?.sender?.full_name}
                                    </h1>
                                    <p className="text-neutral-30/80 text-xs">
                                      {new Date(
                                        reply?.createdAt
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                                <MdDelete className="text-rose-500" />
                               </div>

                                <p className="text-neutral-90">
                                  {reply?.message}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          <AddReplyForm
            courseId={courseId}
            selectedThreadId={selectedThreadId}
            setSelectedThreadId={setSelectedThreadId}
          />
        </div>
      </div>
    </>
  );
};

export default Threads;
