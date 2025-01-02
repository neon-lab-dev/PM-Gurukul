import { useState } from "react";
import { ICONS, IMAGES } from "../../../assets";
import Container from "../Container/Container";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <Container>
            <div className="bg-primary-10 px-5 md:px-12 xl:px-32 py-4">
                <div className="flex justify-between items-center">
                    <div className="gap-2 flex items-center">
                        <img src={IMAGES.logo} alt="Logo" className="w-12" />
                        <h1 className="text-white font-bold text-base">PM Gurukul</h1>
                    </div>

                    
                    <ul className="hidden md:flex gap-8 text-white text-base font-medium">
                        <li>Home</li>
                        <li>Courses</li>
                        <li>Contact</li>
                    </ul>

                    
                    <div className="md:hidden">
                        <img
                            src={ICONS.hamburgerMenu} 
                            alt="Menu"
                            className="w-8 cursor-pointer"
                            onClick={toggleMenu}
                        />
                    </div>
                </div>

                {/* Overlay and Sliding Menu */}
                {isMenuOpen && (
                    <>
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={closeMenu}
                        ></div>

                        {/* Sliding Menu */}
                        <div
                            className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white z-50 shadow-lg transform transition-transform"
                        >
                            <div className="p-5 flex flex-col gap-6">
                                <ul className="text-gray-800 text-lg font-medium">
                                    <li onClick={closeMenu} className="cursor-pointer">Home</li>
                                    <li onClick={closeMenu} className="cursor-pointer">Courses</li>
                                    <li onClick={closeMenu} className="cursor-pointer">Contact</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Container>
    );
};

export default Navbar;
