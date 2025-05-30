import { Link } from "react-router-dom";
import { ICONS } from "../../../assets";

const EmailSent = () => {
  return (
    <div className="bg-neutral-80 h-screen flex items-center justify-center font-Inter p-5">
      <div className="bg-white border border-neutral-15 rounded-[20px] p-5 md:p-[60px] flex flex-col gap-5  w-[529px] max-auto">
        <img
          src={ICONS.emailSent}
          alt="PMGURUKKUL"
          className="w-[250px] mx-auto"
        />
        <h1 className="text-primary-15 text-xl md:text-2xl font-bold font-Inter text-center">
          Reset link sent to your email 📧
        </h1>
        <p className="text-black text-lg leading-6 mt-4">
          Reset link sent to you email. Please reset your password within 5 minutes.
        </p>
        <Link
          to={"/auth/login"}
          className="px-6 py-3 bg-primary-10 text-white rounded-xl font-semibold text-center"
        >
          Back To Login
        </Link>
      </div>
    </div>
  );
};

export default EmailSent;
