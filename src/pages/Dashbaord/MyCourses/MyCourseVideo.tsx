import VideoPlayer from "../../../components/MyCoursesPage/VideoPlayer";
import Playlist from "../../../components/MyCoursesPage/PlaylistAccordion";
import { ICONS, IMAGES } from "../../../assets";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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

  // To disable right button click
  useEffect(() => {
  const disableContextMenu = (e: MouseEvent) => e.preventDefault();
  document.addEventListener("contextmenu", disableContextMenu);

  const keyDownHandler = (e: KeyboardEvent) => {
    if (
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || // Ctrl+Shift+I/J/C
      e.key === 'F12' || // F12
      (e.ctrlKey && e.key === 'U') // Ctrl+U
    ) {
      e.preventDefault();
    }
  };
  document.addEventListener("keydown", keyDownHandler);

  return () => {
    document.removeEventListener("contextmenu", disableContextMenu);
    document.removeEventListener("keydown", keyDownHandler);
  };
}, []);


  return (
    <div>
      <div className="flex w-full justify-between items-center py-3 px-6">
        <Link to={"/"} className="">
          <img
            src={IMAGES.pmGurukulLogo}
            alt="PM-Gurukul"
            className="w-32 md:w-60"
          />
        </Link>{" "}
        <div className="bg-white flex justify-end items-center">
          <ul className="flex gap-5">
            {/* <li>
              <Link to="/dashboard">
                <img src={ICONS.Bell} />
              </Link>
            </li> */}
            <li>
              <Link to="/dashboard/my-profile">
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
