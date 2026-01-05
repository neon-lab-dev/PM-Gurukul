import { ICONS, IMAGES } from "../../../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { toast } from "sonner";
import Ripple from "../Ripple/Ripple";
import { TLoggedInUser } from "../../../types/user.types";
import { adminMenus, userMenus } from "./sidebarLinks";
import GoogleTranslate from "../../Shared/Navbar/GoogleTranslate";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(useCurrentUser) as TLoggedInUser;

  //to check if the link is active
  const isActive = (path: string): boolean => location.pathname === path;

  const handleLogout = async () => {
    try {
      const response = await fetch("https://api.pmgurukkul.com/api/v1/logout");

      if (response.ok) {
        dispatch(logout());
        toast.success("Logged out successfully.");
        navigate("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const menus =
    user?.role === "admin"
      ? adminMenus
      : user?.role === "employee"
      ? user.assignedPages
          ?.map((page) =>
            adminMenus.find((menu) => menu.link.replace("/admin", "") === page)
          )
          .filter(Boolean)
      : userMenus;

  return (
    <div className="w-60 min-w-60 h-screen px-4 py-6 font-Inter flex flex-col sticky left-0 top-0">
      {/* Top section: Logo */}
      <div>
        <a href="/" className="flex items-center gap-2 w-full pb-4 mb-4">
          <img src={IMAGES.pmGurukulLogo} alt="PM-Gurukkul" className="w-40" />
        </a>
      </div>

      {/* Middle section: Navlinks */}
      <div className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {menus.map((menu) => (
            <li
              key={menu?.link}
              className={`px-3 py-2 ${
                isActive(menu?.link as string)
                  ? "bg-neutral-60 text-primary-10 rounded-lg"
                  : "text-neutral-85"
              }`}
            >
              <Link
                to={menu?.link as string}
                className="flex items-center gap-2"
              >
                <span className="text-lg">{menu?.icon}</span>
                {menu?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom section: Google Translate + Logout */}
      <div className="flex flex-col gap-3 mt-4">
        <GoogleTranslate />
        <Ripple styles="rounded-xl">
          <button
            onClick={handleLogout}
            className="bg-neutral-60 border border-neutral-55 py-[10px] px-4 text-primary-10 text-sm leading-5 font-semibold w-full rounded-lg text-center flex items-center gap-2 justify-center"
          >
            <img src={ICONS.logout} alt="logout-icon" className="w-4 h-4" />
            Logout
          </button>
        </Ripple>
      </div>
    </div>
  );
};

export default Sidebar;
