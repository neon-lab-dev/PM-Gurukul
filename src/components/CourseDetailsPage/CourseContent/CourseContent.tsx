import { ICONS } from "../../../assets";
import CourseContentCard from "../../Reusable/CourseContentCard/CourseContentCard";
import CourseObjective from "./CourseObjective";
import CourseOverview from "./CourseOverview";
import Requirements from "./Requirements";
import SkillsCovered from "./SkillsCovered";


const CourseContent = () => {
    const courseObjectives = [
        "Design principles (layout, composition, color theory)",
        "Typography and visual hierarchy",
        "User research and personas",
        "Wireframing and low/high-fidelity prototyping",
        "Design tools (Figma, Adobe XD, Sketch)",
        "Interaction design and micro-interactions",
        "Usability testing and accessibility",
        "Mobile-first and responsive design",
        "Building and presenting a design portfolio"
    ];

    const courseRequirments = [
        "Design principles (layout, composition, color theory)",
        "Typography and visual hierarchy",
        "User research and personas",
        "Wireframing and low/high-fidelity prototyping",
        "Design tools (Figma, Adobe XD, Sketch)",
        "Interaction design and micro-interactions",
        "Usability testing and accessibility",
        "Mobile-first and responsive design",
        "Building and presenting a design portfolio"
    ];

    const skillsCovered = [
        "Design principles (layout, composition, color theory)",
        "Typography and visual hierarchy",
        "User research and personas",
        "Wireframing and low/high-fidelity prototyping",
        "Design tools (Figma, Adobe XD, Sketch)",
        "Interaction design and micro-interactions",
        "Usability testing and accessibility",
        "Mobile-first and responsive design",
        "Building and presenting a design portfolio"
    ];

    const courseCategories = [
        {
            level: "level",
            value: "Basic to Intermediate",
        },
        {
            level: "Categories",
            value: "Development",
        },
        {
            level: "Total Hours",
            value: "19.78 Hours",
        },
        {
            level: "Total Lessons",
            value: "20"
        }
    ];

    const ourPlaylist = [
        {
            level: "Introduction to Android",
            value: "2min",
        },
        {
            level: "Introduction to Android",
            value: "3min",
        },
        {
            level: "Introduction to Android",
            value: "4min",
        },
        {
            level: "Introduction to Android",
            value: "5min"
        }
    ];

    return (
        <div>
            <div className="py-12 md:py-[64px] bg-white flex flex-col xl:flex-row gap-[64px] font-Inter">
                <div>
                    <CourseOverview />
                    <CourseObjective courseObjectives={courseObjectives} />
                    <Requirements courseRequirements={courseRequirments} />
                    <SkillsCovered skillsCovered={skillsCovered} />
                </div>

                <div className="flex flex-col gap-8">
                    <CourseContentCard title="Course Categories">
                        {
                            courseCategories?.map((category, index) =>
                                <div key={index} className="flex items-center justify-between">
                                    <p className="text-primary-10 font-medium leading-7">{category?.level}</p>
                                    <p className="text-primary-10 font-medium leading-7">{category?.value}</p>
                                </div>
                            )
                        }
                    </CourseContentCard>
                    <CourseContentCard title="Our Playlist">
                        {
                            ourPlaylist?.map((category, index) =>
                                <div key={index} className="flex items-center justify-between">
                                    <p className="text-primary-10 text-sm leading-7">{index}. {category?.level}</p>
                                    <div className="flex items-center gap-[5px]">
                                        <img src={ICONS.video} alt="video-icon" className="size-[14px]" />
                                        <p className="text-primary-10 text-sm leading-7">{category?.value}</p>
                                    </div>
                                </div>
                            )
                        }
                    </CourseContentCard>
                </div>
            </div>
        </div>
    );
};

export default CourseContent;