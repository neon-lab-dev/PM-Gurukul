import { useState } from "react";
import HeroContainer from "../../Reusable/HeroContainer/HeroContainer";
import Container from "../../Shared/Container/Container";
import Badge from "../../Reusable/Badge/Badge";
import { IMAGES } from "../../../assets";
import { toast } from "sonner";
import SuccessWithTick from "../../Reusable/SuccessWithTick/SuccessWithTick";
import LoadingSpinner from "../../Loaders/LoadingSpinner/LoadingSpinner";
import { useCart } from "../../../Providers/CartProvider/CartProvider";
import CourseDetailsHeroLoader from "../../Loaders/CourseDetailsHeroLoader/CourseDetailsHeroLoader";
import Ripple from "../../Reusable/Ripple/Ripple";
import { TCourse } from "../../CoursePage/AllCourses/course.types";
import { Link, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../../redux/Features/User/userApi";

type TCourseDetailsHero = {
  isDetailsLoading: boolean;
  courseDetails: TCourse;
};
const CourseDetailsHero: React.FC<TCourseDetailsHero> = ({
  courseDetails,
  isDetailsLoading,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { cartData: cartInfo, addCourseToCart } = useCart();
  const isCourseAlreadyInCart = cartInfo?.some(
    (item) => item?._id === courseDetails?._id
  );

  const handleAddCourseToCart = () => {
    setIsLoading(true);
    setIsAdded(false);
    setTimeout(() => {
      const cartData = {
        _id: courseDetails._id,
        title: courseDetails.title,
        category: courseDetails?.category,
        image: courseDetails?.poster?.url,
        basePrice: courseDetails?.basePrice,
        discountedPrice: courseDetails.discountedPrice,
        courseType : "singleCourse"
      };

      if (isCourseAlreadyInCart) {
        toast.error("Course is already in the cart!");
        setIsLoading(false);
        setIsAdded(false);
        return;
      }

      addCourseToCart(cartData);
      toast.success("Course added to cart!");
      setIsLoading(false);
      setIsAdded(true);
    }, 1000);
  };

  const handleAddCourseToCartAndRedirect = () => {
    setIsLoading2(true);
    setIsAdded(false);
    setTimeout(() => {
      const cartData = {
        _id: courseDetails._id,
        title: courseDetails.title,
        category: courseDetails?.category,
        image: courseDetails?.poster?.url,
        basePrice: courseDetails?.basePrice,
        discountedPrice: courseDetails.discountedPrice,
        courseType : "singleCourse"
      };

      if (isCourseAlreadyInCart) {
        toast.error("Course is already in the cart!");
        setIsLoading2(false);
        setIsAdded(false);
        return;
      }

      addCourseToCart(cartData);
      toast.success("Course added to cart!");
      setIsLoading2(false);
      setIsAdded(true);
      navigate("/cart");
    }, 1000);
  };

  const basePrice = courseDetails?.basePrice;
  const discountedPrice = courseDetails?.discountedPrice;

  const discountPercentage = ((basePrice - discountedPrice) / basePrice) * 100;
  const { data } = useGetMeQuery({});
  const purchasedCourses = data?.user?.purchasedCourses || [];
  const isPurchased = purchasedCourses.includes(courseDetails?._id);

  return (
    <HeroContainer classNames="pt-12">
      <Container>
        {isDetailsLoading ? (
          <CourseDetailsHeroLoader />
        ) : (
          <div className="font-Inter flex flex-col-reverse lg:flex-row gap-12 xl:gap-0 justify-between py-6 md:py-12 xl:py-[80px]">
            <div className="flex flex-col justify-center">
              <Badge title={courseDetails?.category} />
              <h1 className="text-white capitalize text-[48px] font-bold leading-[64px] mt-1 max-w-[599px]">
                {courseDetails?.title}
              </h1>
              <p className="text-neutral-10 leading-6 mt-1 max-w-[599px]">
                {courseDetails?.description}
              </p>

              <div className="flex items-center gap-6 mt-7">
                <div className="flex items-center gap-2">
                  <img
                    src={IMAGES.pmGurukulFavicon}
                    alt="avatar"
                    className="size-10"
                  />
                  <p className="text-neutral-15 leading-6 text-lg font-medium">
                    {courseDetails?.author
                      ? courseDetails?.author
                      : "PMGURUKKUL"}
                  </p>
                </div>

                <span className="text-neutral-10 text-lg">|</span>

                <div className="flex items-center gap-2">
                  <h1 className="text-neutral-15 leading-6 text-lg font-medium">
                    ₹{courseDetails?.discountedPrice}
                  </h1>
                  <span className="line-through text-neutral-10 text-sm">
                    ₹{courseDetails?.basePrice}
                  </span>
                  <span className="text-neutral-10 text-sm">
                    {discountPercentage.toFixed(0)}% Off
                  </span>
                </div>
              </div>
              {isPurchased ? (
                <div className="flex items-center gap-5 mt-7">
                  <Ripple styles="rounded-[10px]">
                    <Link
                    to={"/dashboard/my-courses"}
                      className="bg-primary-gradient-light px-5 py-[10px] text-primary-10 font-semibold leading-6 rounded-[10px] shadow-primary-shadow min-w-[186px]"
                    >
                      Continue Course
                    </Link>
                  </Ripple>
                </div>
              ) : (
                <div className="flex items-center gap-5 mt-7">
                  <Ripple styles="rounded-[10px]">
                    <button
                      onClick={handleAddCourseToCartAndRedirect}
                      className="bg-primary-gradient-light px-5 py-[10px] text-primary-10 font-semibold leading-6 rounded-[10px] shadow-primary-shadow min-w-[186px]"
                    >
                      {isLoading2 ? (
                        <LoadingSpinner fontSize="text-[15px]" />
                      ) : isAdded || isCourseAlreadyInCart ? (
                        "Already Added To Cart"
                      ) : (
                        `Buy now for ₹${courseDetails?.discountedPrice}`
                      )}
                    </button>
                  </Ripple>
                  <Ripple styles="rounded-[10px]">
                    <button
                      onClick={handleAddCourseToCart}
                      className="text-secondary-15 font-semibold leading-6 rounded-[10px] border border-secondary-15 px-5 py-[10px]"
                    >
                      {isLoading ? (
                        <LoadingSpinner fontSize="text-[15px]" />
                      ) : isAdded || isCourseAlreadyInCart ? (
                        <SuccessWithTick message="Added" />
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </Ripple>
                </div>
              )}
            </div>

            <img
              src={courseDetails?.poster?.url}
              alt=""
              className="h-full max-h-full md:max-h-[349px] xl:max-h-[300px] w-full max-w-full xl:max-w-[404px] rounded-2xl"
            />
          </div>
        )}
      </Container>
    </HeroContainer>
  );
};

export default CourseDetailsHero;
