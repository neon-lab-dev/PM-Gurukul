/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { ICONS } from "../../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVerifyOtpMutation } from "../../../redux/Features/Auth/authApi";
import { toast } from "sonner";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import { OtpFormData } from "../Login/Login";
import useOtpDataFromLocalStorage from "../../../hooks/useOtpDataFromLocalStorage";

interface FormData {
    otp: string;
}

const VerifyPhoneNumber = () => {
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
        // Getting OTP data from localstorage
    const [otpData] = useOtpDataFromLocalStorage<OtpFormData>("otpData");
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(59);
    const [isTimerFinished, setIsTimerFinished] = useState(false);

    useEffect(() => {
        // Function to update the timer every second
        const timerInterval = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft > 0) {
                    return prevTimeLeft - 1;
                } else {
                    clearInterval(timerInterval);
                    setIsTimerFinished(true);
                    return 0;
                }
            });
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timerInterval);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const handleVerifyOtp = async (data: FormData) => {
        try {
            const verifyOtpData = {
                mobileNumber: otpData?.mobileNumber,
                otp: data.otp,
            };
            const response = await verifyOtp(verifyOtpData).unwrap();
            console.log(response);
            if (response?.message) {
                toast.success(response?.message);
                if (response?.newUser) {
                    navigate("/auth/setup-profile");
                } else {
                    navigate("/dashboard/my-profile");
                }
            }
        } catch (err) {
            toast.error((err as any)?.data?.message);
        }
    };


    return (
        <div className="bg-neutral-80 h-screen flex items-center justify-center font-Inter p-5">
            <form onSubmit={handleSubmit(handleVerifyOtp)} className="bg-white border border-neutral-15 rounded-[20px] p-5 md:p-[60px] flex flex-col gap-5 h-[400px] md:h-[436px] w-[529px] max-auto">
                <h1 className="text-primary-25 text-[28px] leading-8 font-semibold text-center mb-5">Verify your Number</h1>

                <div className="flex items-center justify-center gap-2 mb-5">
                    <p className="text-neutral-30 text-sm leading-5">OTP has been sent to <strong>+91 {otpData?.mobileNumber}</strong></p>
                    <Link to={"/auth/login"}>
                        <img src={ICONS.pen} alt="pen-icon" className="size-4" />
                    </Link>
                </div>
                <TextInput
                    label="Enter the OTP to verify"
                    placeholder="Enter 6 Digit OTP"
                    type="tel"

                    error={errors.otp}
                    {...register("otp", {
                        required: "Please enter your OTP",
                        minLength : {value : 6, message : "OTP must be 6 characters"},
                        maxLength : {value : 6, message : "OTP must be 6 characters"}
                    })}
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-primary-10 text-white rounded-xl text-lg font-semibold"
                >
                    {
                        isLoading ? <LoadingSpinner /> : "Verify Number"
                    }
                </button>

                {
                    isTimerFinished ?
                        <Link to={"/auth/login"} className="text-primary-10 text-sm leading-5 font-medium text-center">Resend OTP</Link>
                        :
                        <p className="font-Inter text-neutral-65 text-center">
                            0:{timeLeft.toString().padStart(2, "0")}
                        </p>
                }
            </form>
        </div>
    );
};

export default VerifyPhoneNumber;