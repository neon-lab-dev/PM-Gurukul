import { Link, useLocation } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import Container from "../Container/Container";
import HamburgerMenu from "./HamburgerMenu";
import { navlinks } from "./navlinks";
import { useCart } from "../../../Providers/CartProvider/CartProvider";
import Ripple from "./../../Reusable/Ripple/Ripple";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { TLoggedInUser } from "../../../types/user.types";

const Navbar = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const location = useLocation();
  const { cartData } = useCart();

  return (
    <div className="bg-blue-50 py-4 font-Inter">
      <Container>
        <div className="flex items-center justify-between">
          <Link to={"/"} className="flex items-center gap-2">
            <img
              src={IMAGES.pmGurukulLogo}
              alt="PM-Gurukul"
              className="w-32 md:w-60"
            />
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-8">
              {navlinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`${
                    location.pathname === link.path
                      ? "text-primary-10 font-semibold underline"
                      : "text-primary-10/80"
                  } leading-6`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-5 lg:gap-8">
              <div className="flex flex-row-reverse lg:flex-row items-center gap-5 lg:gap-8">
                <Link to={"/cart"} className="relative">
                  <img
                    src={
                      location.pathname === "/cart"
                        ? ICONS.cartYellow
                        : ICONS.cartDark
                    }
                    alt="cart-icon"
                    className="size-6"
                  />
                  <div className="size-4 rounded-full bg-secondary-10 text-primary-10 flex items-center justify-center text-xs absolute -top-2 -right-2">
                    {cartData?.length}
                  </div>
                </Link>
                <Ripple styles="rounded-xl">
                  <Link
                    to={
                      user
                        ? user.role === "user"
                          ? "/dashboard"
                          : user.role === "admin"
                          ? "/admin/registered-users"
                          : "/auth/login"
                        : "/auth/login"
                    }
                    className="bg-primary-gradient-light px-5 py-[10px] text-primary-10 font-semibold leading-6 rounded-[10px] shadow-primary-shadow hidden sm:block"
                  >
                    {user ? "Dashboard" : "Get Started"}
                  </Link>
                </Ripple>
              </div>
              <HamburgerMenu />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
