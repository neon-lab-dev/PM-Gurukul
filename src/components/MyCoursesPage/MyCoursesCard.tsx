import { useState } from "react";
import { ICONS } from "../../assets";
import { Link } from "react-router-dom";
import Threads from "../../pages/Dashbaord/Admin/Courses/Threads/Threads";

type TMyCoursesCard = {
  _id: string;
  title: string;
  author: string;
  numOfVideos: number;
  poster: { public_id: string; url: string };
  examLimitLeft ?: number
};
const MyCoursesCard: React.FC<TMyCoursesCard> = ({
  _id,
  title,
  // author,
  numOfVideos,
  poster,
  examLimitLeft,
}) => {
  const completedLesson = 1;
  const progress = (completedLesson / numOfVideos) * 100;

  const [courseId, setCourseId] = useState<string>("");
  const [isThreadsBarOpen, setIsThreadsBarOpen] = useState(false);

  return (
    <>
      <div className="bg-white capitalize border border-neutral-55 rounded-2xl font-Inter w-[290px] relative">
        <img
          src={poster?.url}
          alt=""
          className="rounded-t-2xl w-full h-[130px] object-cover"
        />
        {/* <div className="rounded-full bg-[rgba(5,21,57,0.65)] backdrop-blur-[7.5px] py-[3px] px-1 pr-[9px] flex items-center gap-1 w-fit absolute top-3 left-3">
          <img src={ICONS.avatar} alt={""} className="size-5 rounded-full" />
          <h1 className="text-white font-normal text-[13px] leading-6">
            {author}
          </h1>
        </div> */}
        <div className="flex items-center gap-1 px-4 py-[10px] bg-neutral-60 w-full">
          <img src={ICONS.Calendar} alt="user-icon" className="size-[14px]" />
          <p className="text-primary-10 text-sm">Enrolled On 22nd JAN, 2025</p>
        </div>

        <div className="p-4 flex flex-col gap-4">
          <h1 className="text-primary-10 text-xl leading-7 font-semibold">
            {title?.length > 20 ? `${title?.slice(0, 20)}...` : title}
          </h1>

          {/* <div>
            <div className="flex justify-center items-center gap-2">
              <div
                className="relative w-full max-w-md h-2 bg-gray-300
              rounded-full overflow-hidden"
              >
                <div
                  className="absolute h-full bg-secondary-40 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className=" text-secondary-40 text-sm font-semibold">
                {progress}%
              </p>
            </div>
            <p className="text-neutral-95 text-sm">Course Progress</p>
          </div> */}

          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsThreadsBarOpen(true);
                setCourseId(_id);
              }}
              className="bg-neutral-60 flex items-center border border-neutral-55 py-[10px] px-4  text-primary-10 text-sm leading-5 font-semibold w-full rounded-lg text-center"
            >
              Check Forum
            </button>

            <Link
              to={`/course-video/my-course-video/${_id}`}
               state={{ examLimitLeft }}
              className="bg-secondary-20 flex justify-center items-center gap-2 py-[10px] px-4 text-primary-10 text-sm leading-5 font-semibold w-full rounded-lg text-center"
            >
              {progress === 0 ? "Start" : "Resume"}
              <img src={ICONS.PlayCircle} alt="play-icon" />
            </Link>
          </div>
        </div>
      </div>

      {isThreadsBarOpen && (
        <Threads
          courseId={courseId}
          isThreadsBarOpen={isThreadsBarOpen}
          setIsThreadsBarOpen={setIsThreadsBarOpen}
        />
      )}
    </>
  );
};

export default MyCoursesCard;
