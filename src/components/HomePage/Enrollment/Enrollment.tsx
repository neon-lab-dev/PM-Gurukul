import { ICONS, IMAGES } from "../../../assets";
import Heading1 from "../../Reusable/Heading1/Heading1";
import Ripple from "../../Reusable/Ripple/Ripple";
import Container from "../../Shared/Container/Container";

const Enrollment = () => {
    return (
        <div className="bg-neutral-20 py-[96px]">
            <Container>
                <div className="bg-white rounded-[30px] md:rounded-[64px] shadow-shadow-light-gray font-Inter flex flex-col-reverse xl:flex-row items-center justify-between">
                    <div className="px-5 lg:px-0 lg:pl-[64px]  flex flex-col gap-3 md:gap-5 p-2 md:p-6">
                        <Heading1 classNames="max-w-[1100px]">Your enrollment plays a vital role to make education a reality for underprivileged children.</Heading1>
                        <Ripple styles="rounded-xl w-fit">
                            <button className="bg-primary-gradient px-5 lg:px-6 py-3 md:py-5 text-primary-10 md:text-xl font-semibold leading-7 rounded-[10px] shadow-primary-shadow flex items-center gap-[10px] w-fit text-sm">
                                <img src={ICONS.coupon} alt="coupon" className="size-6 hidden md:block" />
                                Join us today and make a difference!
                            </button>
                        </Ripple>
                    </div>
                    <img src={IMAGES.enrollment} alt="" className="rounded-r-none xl:rounded-r-[64px] rounded-t-3xl xl:rounded-t-none xl:rounded-tr-[64px] w-full h-full" />
                </div>
            </Container>
        </div>
    );
};

export default Enrollment;