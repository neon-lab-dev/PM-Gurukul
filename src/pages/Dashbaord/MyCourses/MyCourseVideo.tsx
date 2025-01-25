import VideoPlayer from "../../../components/MyCoursesPage/VideoPlayer";
import Playlist from "../../../components/MyCoursesPage/PlaylistAccordion";
import { ICONS, IMAGES } from "../../../assets";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TLecture } from "../../../types/lecture.types";

const MyCourseVideo = () => {
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

  return (
    <div>
      <div className="flex w-full justify-between items-center py-3 px-6">
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src={IMAGES.pmGurukulLogo}
            alt="PM-Gurukul"
            className="size-12"
          />
          <h1 className="text-primary-10 font-semibold text-2xl">PM Gurukul</h1>
        </Link>{" "}
        <div className="bg-white flex justify-end items-center">
          <ul className="flex gap-5">
            <li>
              <Link to="/dashboard">
                <img src={ICONS.Bell} />
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <img src={ICONS.UserCircle} />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-1 overflow-y-hidden">
        <VideoPlayer moduleData={currentModule} />
        <Playlist
          changeVideo={(module) => {
            console.log(module);
            setCurrentModule({
              title: module.title || "",
              video: {
                public_id: module?.video?.public_id || "",
                url: module?.video?.url || "",
              },
              progress: module.progress || "",
              description: module.description || "",
              videoDuration: module.videoDuration || "",
              _id: module._id || "",
            });
          }}
          currentVideo={currentModule.video.url}
        />
      </div>
    </div>
  );
};

export default MyCourseVideo;
