import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBookOpen,
  HiOutlineSparkles,
  HiOutlineAnnotation,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { FiUsers, FiDollarSign, FiShoppingBag } from "react-icons/fi";
import { MdOutlinePayment, MdOutlineHistoryEdu } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
import { FaRegFileAlt } from "react-icons/fa";

export const userMenus = [
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
    name: "Certificates",
    link: "/dashboard/certificates",
    icon: <FaRegFileAlt />,
  },
  {
    name: "My Orders",
    link: "/dashboard/my-orders",
    icon: <FiShoppingBag />,
  },
  {
    name: "Showcase Talent",
    link: "/dashboard/showcase-talent",
    icon: <HiOutlineSparkles />,
  },
];

export const adminMenus = [
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
  {
    name: "Talents",
    link: "/admin/talents",
    icon: <HiOutlineSparkles />,
  },
  {
    name: "Testimonials",
    link: "/admin/manage-testimonials",
    icon: <HiOutlineAnnotation />,
  },
  {
    name: "Photo Gallery",
    link: "/admin/manage-photo-gallery",
    icon: <HiOutlinePhotograph />,
  },
];
