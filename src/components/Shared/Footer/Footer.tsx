import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { footerLinks, socialMediaLinks } from "./footerLinks";

const Footer = () => {
   
    return (
        <div className="bg-primary-10 py-[64px] font-Inter">
            <Container>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between">
                        <div className="flex flex-col gap-[10px]">
                            <h1 className="text-2xl text-white font-semibold leading-7">PMGURUKKUL</h1>
                            <p className="text-neutral-35 leading-6 max-w-[420px]">PMGURUKKUL is an opportunity to make a positive change when it comes to upskilling. You can learn, refine your skills and focus on your career growth with India's leading ed-tech company. Join the revolution to move forward on the path to a better financial future.</p>

                            {/* Social Media Links */}
                            <div className="flex items-center gap-6 mt-5">
                                {
                                    socialMediaLinks?.map((link, index) =>
                                        <a key={index} href={link.path} target="_blank" rel="noopener noreferrer" className="">
                                            <img
                                                style={{ width: link?.size, height: link?.size }}
                                                className="transition-transform duration-300 transform hover:scale-125 hover:-translate-y-1"
                                                src={link.icon}
                                                alt="icon"
                                            />

                                        </a>
                                    )
                                }
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                            {
                                footerLinks?.map(item =>
                                    <div key={item?.heading} className="flex flex-col gap-[10px]">
                                        <h1 className="text-neutral-40 font-medium leading-6">{item.heading}</h1>
                                        {
                                            item?.links?.map((link, index) =>
                                                <Link key={index} to={link.path} className="text-neutral-35 font-normal leading-6 hover:underline">
                                                    {link.label}
                                                </Link>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <hr className="border border-primary-20 h-[1px]" />
                    <p className="text-neutral-35 leading-6 max-w-[377px]">© 2025 PMGURUKKUL. All rights reserved</p>
                </div>
            </Container>
        </div>
    );
};

export default Footer;