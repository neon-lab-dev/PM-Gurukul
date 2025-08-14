import { useState } from "react";
import { ICONS } from "../../../../../assets";
import AddVideo from "../../../../../components/AddVideo/AddVideo";
import { Link, useParams } from "react-router-dom";
import { useGetSingleCourseByIdQuery } from "../../../../../redux/Features/Course/courseApi";
import { useDeleteVideoMutation } from "../../../../../redux/Features/Admin/adminApi";
import { Helmet } from "react-helmet-async";

type TVideo = {
    _id: string;
    title: string;
    description: string;
    video: {
        public_id: string;
        url: string;
    };
    videoDuration: string;
};

const AddCourseVideo = () => {
    const [deleteVideo] = useDeleteVideoMutation();
    const { id } = useParams();
    const { data } = useGetSingleCourseByIdQuery(id);
    const [isModalOpen, setModalOpen] = useState(false);
    const [videos, setVideos] = useState<
        { title: string; description: string; videoFile: File | null }[]
    >([]);
    const [deletingVideoId, setDeletingVideoId] = useState<string | null>(null);


    const handleAddVideo = (videoData: {
        title: string;
        description: string;
        videoFile: File | null;
    }) => {
        setVideos((prevVideos) => [...prevVideos, videoData]);
    };

    const handledDeleteVideo = async (lectureId: string) => {
        try {
            setDeletingVideoId(lectureId);
            const response = await deleteVideo({ courseId: id, lectureId }).unwrap();
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setDeletingVideoId(null);
        }
    };

    return (
        <div>
            <Helmet>
                <title>PMGURUKKUL | Add Videos</title>
            </Helmet>
            <div className="flex justify-between items-center lg:w-[80%] w-full mx-auto">
                <h1 className="text-[#0F172A] font-Inter font-semibold leading-7 tracking-tighter text-2xl">
                    Add Course Video
                </h1>
                <Link
                    to={"/admin/courses"}
                    className="px-4 py-2 bg-[#051539] border-[#051539] rounded-lg text-white"
                >
                    Save
                </Link>
            </div>
            <div className="flex flex-col lg:w-[80%] w-full p-6 bg-white gap-6 rounded-2xl mx-auto mt-5">
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
                    {data?.course?.lectures?.length === 0 ? (
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
                            {data?.course?.lectures?.map((video: TVideo, index: number) => (
                                <li
                                    key={index}
                                    className="flex justify-between border-[1px] border-[#EBEDF0] rounded-[6px] p-[10px]"
                                >
                                    <div className="flex items-center gap-2">
                                        <img src={ICONS.mp4} className="w-5 h-5" alt="" />
                                        <span className="text-[#091E42] overflow-ellipsis text-[14px] font-medium leading-5 tracking-tight">
                                            {video?.title}
                                        </span>
                                        <span className="text-[#98A1B0] overflow-ellipsis text-[14px] leading-5 tracking-tight">
                                            {video?.videoDuration}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handledDeleteVideo(video?._id)}
                                        disabled={deletingVideoId === video?._id}
                                    >
                                        {deletingVideoId === video?._id ? (
                                            <div className="size-5 animate-[spin_1s_linear_infinite] rounded-full border-2 border-r-error border-[#3b9df84b]"></div>
                                        ) : (
                                            <img src={ICONS.closeRed} className="w-5 h-5" alt="" />
                                        )}
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
                courseId={id ? id : ""}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleAddVideo}
            />
        </div>
    );
};

export default AddCourseVideo;