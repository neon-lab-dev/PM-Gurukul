/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForgotPasswordMutation } from "../../../redux/Features/Auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IMAGES } from "../../../assets";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import LoadingSpinner from "../../../components/Loaders/LoadingSpinner/LoadingSpinner";

export type ForgotPasswordFormData = {
    email: string;
    password: string;
};

const ForgotPassword = () => {
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>();

    const handleLogin = async (data: ForgotPasswordFormData) => {
        try {
            const forgotPasswordData = {
                email: data.email
            };
            const response = await forgotPassword(forgotPasswordData).unwrap();
            if (response?.success) {
                toast.success(response?.message);
                navigate("/auth/email-sent");
            }
        } catch (err) {
            toast.error((err as any)?.data?.message);
        }
    };
    return (
        <div className="bg-neutral-80 h-screen flex items-center justify-center font-Inter p-5">
            <form onSubmit={handleSubmit(handleLogin)} className="bg-white border border-neutral-15 rounded-[20px] p-5 md:p-[60px] flex flex-col gap-5  w-[529px] max-auto">
                <div className="flex items-center gap-5 mb-5">
                    <Link to={"/"} className="flex items-center gap-2">
                        <img src={IMAGES.pmGurukulFavicon} alt="PM-Gurukkul" className="size-16" />
                    </Link>
                    <h1 className="text-primary-25 text-[28px] leading-8 font-semibold text-center capitalize">Forgot Your Password?</h1>
                </div>
                <TextInput
                    label="Email"
                    placeholder="Enter email"
                    type="email"
                    error={errors.email}
                    {...register("email", { required: "Email is required" })}
                />
                <button
                    disabled={isLoading}
                    type="submit"
                    className="px-6 py-3 bg-primary-10 text-white rounded-xl text-lg font-semibold"
                >
                    {isLoading ? <LoadingSpinner /> : "Submit"}
                </button>
                <p className="text-primary-15 text-sm leading-5 font-medium text-center">Back to <Link to={"/auth/login"} className="font-bold">Login</Link></p>
            </form>
        </div>
    );
};

export default ForgotPassword;