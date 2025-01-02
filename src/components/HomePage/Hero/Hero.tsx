import Container from "../../Shared/Container/Container";
import { IMAGES } from "../../../assets";

const Hero = () => {
    return (
        <Container>
            <div className="bg-primary-10 flex flex-col justify-center items-center rounded-bl-[64px] md:flex-row md:gap-28 md:px-[128px]">
                    <div>
                        <div>

                        </div>
                        <h1 className="text-white font-bold text-4xl md:text-5xl ">
                        Achieve Digital Excellence with PM Gurukul
                        </h1>
                    </div>
                    <div className="md:rounded-t-[64px] rounded-bl-[64px] md:rounded-bl-none w-full bg-gradient-to-b from-[rgba(239,216,129,0)] to-[rgba(197,150,41,0.49)]">
                        <img src={IMAGES.hero} alt="Logo" className="" />
                    </div>
                </div>
        </Container>
    );
};

export default Hero;