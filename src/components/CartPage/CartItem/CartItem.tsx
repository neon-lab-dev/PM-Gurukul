import { ICONS } from "../../../assets";
import { useCart } from "../../../Providers/CartProvider/CartProvider";
import { TCartData } from "../../../types/cartData.types";


const CartItem = ({ item, isDeleteAvailable=true }: { item: TCartData, isDeleteAvailable?:boolean; }) => {
    const paragraphStyle = "text-neutral-85 text-sm leading-5 mt-1";
    const { removeCourseFromCart } = useCart();

    return (
        <div className="flex items-center justify-between w-full capitalize">
            <div>
                <h1 className="heading6">{item?.title}</h1>
                <p className={paragraphStyle}>{item?.category}</p>
            </div>
            <div className="flex items-center gap-6">
                <div>
                    <h1 className="heading6 ">₹{item?.discountedPrice}</h1>
                    <p className={`${paragraphStyle} line-through`}>₹{item?.basePrice}</p>
                </div>
                {
                    isDeleteAvailable && <button onClick={() => removeCourseFromCart(item?._id)}><img src={ICONS.deleteIcon} alt="delete-icon" className="size-6 cursor-pointer" /></button>
                }

            </div>

        </div>
    );
};

export default CartItem;