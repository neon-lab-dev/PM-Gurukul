import { Link } from "react-router-dom";
import { IMAGES } from "../../../assets";
import Container from "../../Shared/Container/Container";
import HeroContainer from "../../Reusable/HeroContainer/HeroContainer";
import Ripple from "../../Reusable/Ripple/Ripple";
import { TLoggedInUser } from "../../../types/user.types";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { useSelector } from "react-redux";

const Hero = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  return (
    <HeroContainer classNames="pt-12">
      <Container>
        <div className="font-Inter flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col justify-center pb-10">
            {/* <Badge title="This is a headline for heading" /> */}
            <h1 className="text-white text-[48px] font-bold leading-[64px] mt-1 max-w-[700px]">
              Build Your Digital Skills and Achieve Digital Excellence with PMGURUKKUL
            </h1>
            <p className="text-neutral-10 leading-6 mt-1 max-w-[800px]">
              We help everyone to learn digital skills through our courses. We provide affordability, flexibility and accessibility, enabling working professionals, students and aspiring learners to upskill and reskill at their own pace.
            </p>
            <div className="flex items-center gap-5 mt-7">
              <Ripple styles="rounded-xl">
                <Link
                  to={user ? "/dashboard/my-courses" : "/auth/login"}
                  className="bg-primary-gradient-light px-5 py-[10px] text-primary-10 font-semibold leading-6 rounded-[10px] shadow-primary-shadow">
                  {
                    user ? "Continue Course" : "Register Now"
                  }
                </Link>
              </Ripple>
              <Link
                to={"/courses"}
                className="text-secondary-15 font-semibold leading-6"
              >
                Find Courses
              </Link>
            </div>

            {/* <div className="flex items-center gap-6 mt-7">
              <div className="flex items-center gap-[6px]">
                <img
                  src={ICONS.starCircle}
                  alt="star-circle"
                  className="size-5"
                />
                <p className="text-neutral-15 leading-6">
                  High Value Certification
                </p>
              </div>
              <div className="flex items-center gap-[6px]">
                <img
                  src={ICONS.infinity}
                  alt="star-circle"
                  className="size-5"
                />
                <p className="text-neutral-15 leading-6">Lifetime Access</p>
              </div>
            </div> */}

          </div>

          <img
            src={IMAGES.heroImg}
            alt=""
            className="h-[431px] w-[496px]"
          />
        </div>
      </Container>
    </HeroContainer>
  );
};

export default Hero;
