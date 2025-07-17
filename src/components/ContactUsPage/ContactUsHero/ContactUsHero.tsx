import HeroContainer from '../../Reusable/HeroContainer/HeroContainer';
import Heading2 from '../../Reusable/Heading2/Heading2';

const ContactUsHero = () => {
    const paragraphStyle = "text-neutral-15 text-[15px] leading-6 mt-4"
    return (
        <HeroContainer classNames='py-[64px]'>
            <Heading2 classNames='text-white text-center'>Contact Us</Heading2>
            <div className='max-w-full xl:max-w-[1080px] mx-auto px-4 xl:px-0 text-center'>
                <p className={paragraphStyle}>This is the official page where you can share all your queries or feedback, or seek any other help that you may require to effectively use or enquire about PMGURUKKUL learning programs. Our dedicated team will check and address your questions within the next 24 hours. This is our promise!</p>
                <p className="text-neutral-15 text-[15px] leading-6 mt-4">At PMGURUKKUL, we strive to address and resolve issues in the shortest possible time and in the most seamless way. Every question you have is very valuable to us and our focus is to resolve it through this portal. Hence, we request you to route all your concerns through this official portal</p>
                <p className="text-neutral-15 text-[15px] leading-6 mt-4">
                    REGISTERED ADDRESS: 2/79, GEETA COLONY, DELHI – 110031
                </p>
                <p className="text-neutral-15 text-[15px] leading-6 mt-4">
                    CUSTOMER SUPPORT NUMBER :
                    ( TIMINGS – 10:00 AM to 5:30 PM from Monday to Saturday )
                    <a href="tel:87 50 210 100" className='text-blue-10 hover:underline ml-3'>87 50 210 100</a>

                </p>
                <div className='flex flex-col md:flex-row items-center gap-2 justify-center mt-4'>
                    <p className="text-neutral-15 text-[15px] leading-6">
                        EMAIL US :
                    </p>
                    <a href="mailto:support@pmgurukkul.com" className='text-blue-10 hover:underline'>support@pmgurukkul.com</a>
                    <p className="text-neutral-15 text-[15px] leading-6 hidden md:block">
                        |
                    </p>
                    <a href="mailto:info@pmgurukkul.com" className='text-blue-10 hover:underline'>info@pmgurukkul.com</a>
                </div>
            </div>
        </HeroContainer>
    );
};

export default ContactUsHero;