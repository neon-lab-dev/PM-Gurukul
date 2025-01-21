import { ICONS, IMAGES } from "../../../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/Features/Auth/authSlice";
import { toast } from "sonner";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Set isAdmin based on the current route
  useEffect(() => {
    setIsAdmin(location.pathname.startsWith("/admin"));
  }, [location.pathname]);

  // Helper function to check if the link is active
  const isActive = (path: string): boolean => location.pathname === path;

  // Objects to store the menus and their links
  const userMenus = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "My Courses", link: "/dashboard/my-courses" },
    { name: "Referrals & Payouts", link: "/dashboard/referral" },
    { name: "My Profile / KYC", link: "/dashboard/my-profile" },
  ];

  const adminMenus = [
    { name: "Dashboard", link: "/admin/dashboard" },
    { name: "Registered Users", link: "/admin/registered-users" },
    { name: "Affiliates", link: "/admin/affiliates" },
    { name: "Courses", link: "/admin/courses" },
    { name: "Payouts", link: "/admin/payouts" },
    { name: "Talent List", link: "/admin/talent-list" },
    { name: "Purchase History", link: "/admin/purchase-history" },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://pmgurkulbackend-prw4.vercel.app/api/v1/logout"
      );

      if (response.ok) {
        dispatch(logout());
        toast.success("Logged out successfully.");
        navigate("/");
      } else {
        throw new Error("Logout failed");
      }
    } catch (err) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  // Choose menus based on user type
  const menus = isAdmin ? adminMenus : userMenus;

  return (
    <div className="w-60 min-w-60 h-screen px-4 pt-14 pb-6 font-Inter flex flex-col justify-between">
      <div>
      <Link to="/" className="flex items-center gap-2 w-full pb-4 mb-2">
        <img src={IMAGES.pmGurukulLogo} alt="PM-Gurukul" className="size-10" />
        <h1 className="text-primary-10 text-xl font-medium">PM Gurukul</h1>
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
              <Link to={menu.link}>{menu.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      </div>

      <button onClick={handleLogout} className="w-full px-4 py-2 border border-primary-10 rounded-xl flex items-center justify-center gap-2 font-medium">
        <img src={ICONS.logout} alt="logout-icon" className="size-[18px]" />
        Logout
        </button>
    </div>
  );
};

export default Sidebar;
