/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { useLoginMutation } from "../../../redux/Features/Auth/authApi";
import { toast } from "sonner";
import LoadingSpinner from "../../../components/Loaders/LoadingSpinner/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import { setUser } from "../../../redux/Features/Auth/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export type OtpFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>();

  const handleLogin = async (data: OtpFormData) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };
      const response = await login(userData).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        const user = {
          _id: response?.user?._id,
          name: response?.user?.full_name,
          role: response?.user?.role,
          email: response?.user?.email,
          referralCode: response?.user?.refralCode,
        };
        dispatch(setUser({ user }));
        if (response?.user?.role === "admin") {
          navigate("/admin/registered-users");
        } else {
          navigate("/dashboard/my-courses");
        }
      }
    } catch (err) {
      toast.error((err as any)?.data?.message);
    }
  };

  return (
    <div className="bg-neutral-80 h-screen flex items-center justify-center font-Inter p-5">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white border border-neutral-15 rounded-[20px] p-5 md:p-[60px] flex flex-col gap-5  w-[529px] max-auto"
      >
        <div className="flex items-center gap-5 mb-5">
          <Link to={"/"} className="flex items-center gap-2">
            <img
              src={IMAGES.pmGurukulFavicon}
              alt="PM-Gurukul"
              className="size-16"
            />
          </Link>
          <h1 className="text-primary-25 text-[28px] leading-8 font-semibold text-center capitalize">
            Login to get started
          </h1>
        </div>
        <TextInput
          label="Email"
          placeholder="Enter email"
          type="email"
          error={errors.email}
          {...register("email", { required: "Email is required" })}
        />
        <div className="relative">
          <TextInput
            label="Password"
            placeholder="Enter your password"
            type={isPasswordVisible ? "text" : "password"}
            error={errors.password}
            {...register("password", {
              required: "Password is required",
            })}
          />
          <img
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            src={isPasswordVisible ? ICONS.eyeOpen : ICONS.eyeClose}
            alt="eye-icon"
            className="size-5 cursor-pointer absolute top-[50px] bottom-0 right-3"
          />
        </div>
        <Link
          to={"/auth/forgot-password"}
          className="font-semibold text-blue-10 text-end text-sm"
        >
          Forgot Password?
        </Link>
        <button
          disabled={isLoading}
          type="submit"
          className="px-6 py-3 bg-primary-10 text-white rounded-xl text-lg font-semibold"
        >
          {isLoading ? <LoadingSpinner /> : "Login"}
        </button>
        <p className="text-primary-15 text-sm leading-5 font-medium text-center">
          Don't Have An Account?{" "}
          <Link to={"/auth/signup"} className="font-bold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
