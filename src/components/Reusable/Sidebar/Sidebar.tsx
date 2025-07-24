import { ICONS, IMAGES } from "../../../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { toast } from "sonner";
import Ripple from "../Ripple/Ripple";
import { TLoggedInUser } from "../../../types/user.types";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBookOpen,
} from "react-icons/hi";
import { FiUsers, FiDollarSign, FiShoppingBag } from "react-icons/fi";
import { MdOutlinePayment, MdOutlineHistoryEdu } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(useCurrentUser) as TLoggedInUser;

  // Helper function to check if the link is active
  const isActive = (path: string): boolean => location.pathname === path;

  // Objects to store the menus and their links
  const userMenus = [
    { name: "Dashboard", link: "/dashboard", icon: <HiOutlineHome /> },
    {
      name: "My Courses",
      link: "/dashboard/my-courses",
      icon: <HiOutlineBookOpen />,
    },
    {
      name: "Referrals & Payouts",
      link: "/dashboard/referral",
      icon: <FiDollarSign />,
    },
    {
      name: "My Profile / KYC",
      link: "/dashboard/my-profile",
      icon: <HiOutlineUser />,
    },
    {
      name: "My Orders",
      link: "/dashboard/my-orders",
      icon: <FiShoppingBag />,
    },
  ];

  const adminMenus = [
    { name: "Dashboard", link: "/admin/dashboard", icon: <HiOutlineHome /> },
    {
      name: "Referrals & Payouts",
      link: "/admin/referrals-and-payouts",
      icon: <FiDollarSign />,
    },
    {
      name: "Registered Users",
      link: "/admin/registered-users",
      icon: <FiUsers />,
    },
    { name: "Affiliates", link: "/admin/affiliates", icon: <RiUser3Line /> },
    { name: "Courses", link: "/admin/courses", icon: <HiOutlineBookOpen /> },
    { name: "Payouts", link: "/admin/payouts", icon: <MdOutlinePayment /> },
    {
      name: "Weekly Payouts",
      link: "/admin/weekly-payouts",
      icon: <MdOutlinePayment />,
    },
    {
      name: "Purchase History",
      link: "/admin/purchase-history",
      icon: <MdOutlineHistoryEdu />,
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://api.pmgurukkul.com/api/v1/logout"
      );

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

  const menus = user?.role === "admin" ? adminMenus : userMenus;

  return (
    <div className="w-60 min-w-60 h-screen px-4 py-6 font-Inter flex flex-col justify-between sticky left-0 top-0">
      <div>
        <Link to="/" className="flex items-center gap-2 w-full pb-4 mb-4">
          <img src={IMAGES.pmGurukulLogo} alt="PM-Gurukul" className="w-40" />
        </Link>
        <div>
          <ul className="flex flex-col gap-2">
            {menus.map((menu) => (
              <li
                key={menu.link}
                className={`px-3 py-2 ${
                  isActive(menu.link)
                    ? "bg-neutral-60 text-primary-10 rounded-lg"
                    : "text-neutral-85"
                }`}
              >
                <Link to={menu.link} className="flex items-center gap-2">
                <span className="text-lg">{menu.icon}</span>
                {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Ripple styles="rounded-xl">
        <button
          onClick={handleLogout}
          className="bg-neutral-60 border border-neutral-55 py-[10px] px-4 text-primary-10 text-sm leading-5 font-semibold w-full rounded-lg text-center flex items-center gap-2 justify-center"
        >
          <img src={ICONS.logout} alt="logout-icon" className="size-[18px]" />
          Logout
        </button>
      </Ripple>
    </div>
  );
};

export default Sidebar;
