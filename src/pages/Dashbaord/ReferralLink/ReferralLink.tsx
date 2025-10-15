import { useState, useRef } from "react";
import { FiShare2, FiCheck, FiCopy } from "react-icons/fi";
import { MdPeopleAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { TLoggedInUser } from "../../../types/user.types";

const ReferralLink = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [isCopied, setIsCopied] = useState(false);
  const referralLinkRef = useRef<HTMLInputElement>(null);

  const referralLink = `https://pm-gurukul.vercel.app/auth/signup/${user?.referralCode}`;

  const handleCopyLink = async () => {
    if (referralLinkRef.current) {
      try {
        await navigator.clipboard.writeText(referralLink);
        setIsCopied(true);

        // Reset to copy icon after 3 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Share the Love
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Invite your friends and earn amazing rewards when they join our
            platform. Share your unique referral link and start earning today!
          </p>
        </div>

        {/* Graphics Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center">
              <MdPeopleAlt className="text-6xl text-blue-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <FiShare2 className="text-white text-sm" />
            </div>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Your Referral Link
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                ref={referralLinkRef}
                type="text"
                value={referralLink}
                readOnly
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleCopyLink}
              disabled={isCopied}
              className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 disabled:bg-green-500 text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100"
            >
              {isCopied ? (
                <FiCheck className="text-xl" />
              ) : (
                <FiCopy className="text-xl" />
              )}
            </button>
          </div>

          {/* Success Message */}
          {isCopied && (
            <div className="flex items-center justify-center gap-2 text-green-600 animate-pulse">
              <FiCheck className="text-sm" />
              <span className="text-sm font-medium">Copied to clipboard!</span>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-center">
            <h4 className="font-semibold text-blue-800 mb-1">How it works</h4>
            <p className="text-blue-600 text-sm">
              Share your link with friends. When they sign up using your link and purchase any course,
              you'll receive your referral commission!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralLink;
