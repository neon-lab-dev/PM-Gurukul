import { useState } from "react";
import { ICONS } from "../../assets";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Function to handle form submission
interface FormEvent extends React.FormEvent<HTMLFormElement> {}

const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (!otpSent) {
        // Simulating OTP sent 
        setOtpSent(true);
    } else {
        // Simulating OTP verification
        alert("Number verified successfully!");
        setOtpSent(false);
        setMobile("");
        setOtp("");
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] ">
      <div className="flex flex-col items-center gap-8 border-[1px] border-secondary bg-white rounded-[20px] max-w-[529px] w-[90%] md:p-6 p-5">
        <span className="text-[28px] font-semibold leading-8 tracking-tighter text-[#303D5C]">
          Login to get Started
        </span>
        {otpSent && (
          <div className="flex items-center gap-1">
            <span>OTP has been sent to {mobile}</span>
            <img src={ICONS.pen} className="w-4 h-4 cursor-pointer" alt="edit icon"
                onClick={() => setOtpSent(false)}
            />
          </div>
        )}
        <form className="flex flex-col gap-5 w-full px-6 py-9" onSubmit={handleSubmit}>
          {!otpSent && (
            <div className="flex flex-col gap-[6px] w-full">
              <label
                htmlFor="mobile"
                className="text-base font-medium leading-6 tracking-tighter"
              >
                Mobile Number*
              </label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
              />
            </div>
          )}
          {otpSent && (
            <div className="flex flex-col gap-[6px] w-full">
              <label
                htmlFor="otp"
                className="text-base font-medium leading-6 tracking-tighter"
              >
                Enter the OTP to verify
              </label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6 Digit OTP"
              />
            </div>
          )}
          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="w-full px-6 py-3 text-[#FFF3F1] bg-[#051539] rounded-xl text-base font-semibold leading-6 tracking-tighter"
            >
              {!otpSent ? "Login" : "Verify Number"}
            </button>
            {otpSent && (
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="border-0 text-[14px] font-medium tracking-tighter text-[#051539] leading-5"
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
