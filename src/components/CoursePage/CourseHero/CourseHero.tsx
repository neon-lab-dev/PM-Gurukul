import { ICONS } from "../../../assets";
// import Badge from "../../Reusable/Badge/Badge";
import Heading2 from "../../Reusable/Heading2/Heading2";
import HeroContainer from "../../Reusable/HeroContainer/HeroContainer";
import Paragraph from "../../Reusable/Paragraph/Parahraph";
import Container from "../../Shared/Container/Container";

type TCourseHero = {
    setSearchQuery: (query: string) => void;
};

const CourseHero: React.FC<TCourseHero> = ({ setSearchQuery }) => {
    return (
        <HeroContainer>
            <Container>
                <div className="flex flex-col items-start md:items-center justify-center py-[64px] gap-2 lg:gap-0">
                    {/* <Badge title="This is a headline for heading" /> */}
                    <Heading2 classNames="text-white mt-[6px]">Our Courses</Heading2>
                    <Paragraph classNames="text-neutral-10 max-w-[800px] mx-auto text-center mt-3">In these courses we have taken the best aspects of traditional education and combined them with the latest innovations in the field of digital education</Paragraph>

                    <div className="relative max-w-[722px] w-full mx-auto mt-7">
                        <img src={ICONS.search} alt="search-icon" className="size-5 absolute top-3.5 bottom-0 left-4" />
                        <input onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }} type="text" placeholder="Search" className="pl-11 pr-4 py-3 bg-white rounded-3xl w-full focus:border focus:border-secondary-10 transition duration-300 focus:outline-none" />
                    </div>
                </div>
            </Container>
        </HeroContainer>
    );
};

export default CourseHero;