import { IMAGES } from "../../../assets";
import SectionHeading from "../../Reusable/SectionHeading/SectionHeading";
import Container from "../../Shared/Container/Container";

const WhyPMGurukkul = () => {
  const data = [
    "We provide flexible and trending courses which allow everyone to learn practical skills, making online learning convinient and practical.",
    "We offer quality learning content and our focus is to make high quality learning accessible to everyone.",
    "PMGURUKKUL is not only about professional skills but also offers a huge variety of courses from diverse fields be it goal setting, health and lifestyle, marketing, sales, music, finance, business, etc.",
    "With PMGURUKKUL, any individual having any skill can launch himself on this platform and make himself a trainer.",
    "PMGURUKKUL also gives you the opportunity to earn a good commission along with the courses.",
  ];
  return (
    <div className="bg-gradient-gray py-[64px] font-Inter">
      <Container>
        <div className="flex flex-col gap-9 items-center justify-center">
          <SectionHeading
            heading="Why PMGurukkul?"
            description="Your Pathway to Growth, Learning, and Success."
          />
          <div className="flex flex-col xl:flex-row items-center gap-0 xl:gap-10">
            <div className="flex flex-col gap-6">
              {data?.map((item) => (
                <div
                  key={item}
                  className="bg-white border border-neutral-130 p-4 rounded-xl"
                >
                  <p className="text-xl leading-7 text-neutral-135">{item}</p>
                </div>
              ))}
            </div>

            <img src={IMAGES.whyPMGurukkul} alt="" className="size-full xl:size-[700px]" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WhyPMGurukkul;
