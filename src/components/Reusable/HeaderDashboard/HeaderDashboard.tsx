import { Link, useLocation } from "react-router-dom";
import { ICONS } from "../../../assets";
import { useState, useEffect } from "react";
import { useCart } from "../../../Providers/CartProvider/CartProvider";
import { useGetMeQuery } from "../../../redux/Features/User/userApi";
const HeaderDashboard = () => {
  const { data: myProfile } = useGetMeQuery({});
  const userInfo = myProfile?.user;
  const { cartData } = useCart();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Set isAdmin based on the current route
  useEffect(() => {
    setIsAdmin(location.pathname.startsWith("/admin"));
  }, [location.pathname]);

  const hasKycDetails =
    (userInfo?.bankInfo && Object.keys(userInfo.bankInfo).length > 0) ||
    (userInfo?.document?.documentNumber &&
      userInfo.document.documentNumber !== "undefined") ||
    (userInfo?.panCard?.panNumber &&
      userInfo.panCard.panNumber !== "undefined");

  console.log(userInfo);

  return (
    <div className="bg-white text-3xl flex justify-between items-center p-4 sticky top-0 z-20 font-Inter">
      <ul>
        <li className="text-xl">
          Welcome back{" "}
          <span className={`font-semibold text-blue-10`}>
            {userInfo?.full_name}
          </span>
        </li>
        {userInfo?.role === "user" && (
          <li
            className={`text-sm mt-[2px] ${
              !hasKycDetails ? "text-red-500" : "text-green-500"
            }`}
          >
            {hasKycDetails ? "KYC Verified" : "Please complete your KYC."}
          </li>
        )}
      </ul>
      {!isAdmin && (
        <ul className="flex gap-5">
          <li className="relative">
            <Link to="/cart">
              <img src={ICONS.Cart} />
            </Link>
            <div className="size-4 rounded-full bg-blue-10 text-white flex items-center justify-center text-xs absolute -top-2 -right-2">
              {cartData?.length}
            </div>
          </li>

          <li>
            <Link to="/dashboard">
              <img src={ICONS.UserCircle} />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HeaderDashboard;
