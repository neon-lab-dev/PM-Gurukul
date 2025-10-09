import { Link, useLocation } from "react-router-dom";
import { ICONS } from "../../../assets";
import { useState, useEffect } from "react";
import { useCart } from "../../../Providers/CartProvider/CartProvider";
const HeaderDashboard = () => {
  const {cartData} = useCart();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Set isAdmin based on the current route
  useEffect(() => {
    setIsAdmin(location.pathname.startsWith("/admin"));
  }, [location.pathname]);

  return (
    <div className="bg-white h-12 text-3xl flex justify-end items-center pr-4 sticky top-0 z-20">
      <ul className="flex gap-5">
        {!isAdmin && (
          <>
            <li className="relative">
              <Link to="/cart">
                <img src={ICONS.Cart} />
              </Link>
              <div className="size-4 rounded-full bg-blue-10 text-white flex items-center justify-center text-xs absolute -top-2 -right-2">{cartData?.length}</div>
            </li>
          </>
        )}
        <li>
          <Link to="/dashboard">
            <img src={ICONS.UserCircle} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderDashboard;