import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import VideoPlayer from "../../../components/MyCoursesPage/VideoPlayer";
import Playlist from "../../../components/MyCoursesPage/PlaylistAccordion";
import { ICONS, IMAGES } from "../../../assets";
import { TLecture } from "../../../types/lecture.types";

const MyCourseVideo = () => {
  const { id } = useParams();
  const location = useLocation();
  const {  examLimitLeft } = location.state || {};

  const [currentModule, setCurrentModule] = useState<TLecture>({
    _id: "",
    title: "",
    description: "",
    progress: "",
    videoDuration: "",
    video: {
      public_id: "",
      url: "",
    },
  });

  // 🚫 Disable right-click
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div>
      <div className="flex w-full justify-between items-center py-3 px-6">
        <Link to={"/"}>
          <img
            src={IMAGES.pmGurukulLogo}
            alt="PM-Gurukkul"
            className="w-32 md:w-60"
          />
        </Link>
        <div className="bg-white flex items-center gap-4 justify-end">
          {examLimitLeft > 0 ? (
            <Link
              to={`/dashboard/course/attend-exam/${id}`}
              className="px-4 py-2 bg-[#051539] border-[#051539] rounded-lg text-white"
            >
              Attend Exam
            </Link>
          ) : (
            <div className="px-4 py-2 bg-[#051539] border-[#051539] rounded-lg text-white">
              Already Attended on Exam
            </div>
          )}

          <Link to="/dashboard/my-profile">
            <img src={ICONS.UserCircle} />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-y-hidden">
        <VideoPlayer moduleData={currentModule} />
        <Playlist
          changeVideo={(module) => {
            setCurrentModule({
              title: module?.title || "",
              video: {
                public_id: module?.video?.public_id || "",
                url: module?.video?.url || "",
              },
              progress: module?.progress || "",
              description: module?.description || "",
              videoDuration: module?.videoDuration || "",
              _id: module?._id || "",
            });
          }}
          currentVideo={currentModule?.video?.url}
        />
      </div>
    </div>
  );
};

export default MyCourseVideo;
