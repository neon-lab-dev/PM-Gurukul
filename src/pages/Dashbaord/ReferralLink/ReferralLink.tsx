import { useState, useRef } from "react";
import { FiShare2, FiCheck, FiCopy, FiLock } from "react-icons/fi";
import { MdPeopleAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { TLoggedInUser } from "../../../types/user.types";
import { useGetMeQuery } from "../../../redux/Features/User/userApi";

const ReferralLink = () => {
  const { data: myProfile } = useGetMeQuery({});
  const userInfo = myProfile?.user;
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [isCopied, setIsCopied] = useState(false);
  const referralLinkRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const referralLink = `https://pm-gurukul.vercel.app/auth/signup/${user?.referralCode}`;

  const handleCopyLink = async () => {
    if (referralLinkRef.current) {
      try {
        await navigator.clipboard.writeText(referralLink);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const hasKycDetails =
    (userInfo?.bankInfo && Object.keys(userInfo.bankInfo).length > 0) ||
    (userInfo?.document?.documentNumber &&
      userInfo.document.documentNumber !== "undefined") ||
    (userInfo?.panCard?.panNumber &&
      userInfo.panCard.panNumber !== "undefined");

  const handleNavigateToProfile = () => {
    navigate("/dashboard/my-profile");
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

        {/* KYC Lock Section */}
        {!hasKycDetails && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <FiLock className="text-yellow-600 text-xl mt-0.5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800 mb-1">
                  KYC Verification Required
                </h3>
                <p className="text-yellow-700 text-sm mb-3">
                  Complete your KYC verification to unlock your referral code and start earning commissions. This helps us ensure a secure environment for all users.
                </p>
                <button
                  onClick={handleNavigateToProfile}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  Complete KYC Now
                </button>
              </div>
            </div>
          </div>
        )}

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
                value={hasKycDetails ? referralLink : "Complete KYC to get your referral link"}
                readOnly
                disabled={!hasKycDetails}
                className={`w-full px-4 py-3 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  hasKycDetails
                    ? "bg-gray-50 border-gray-200 text-gray-600"
                    : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              />
              {!hasKycDetails && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg flex items-center justify-center">
                  <FiLock className="text-gray-400 text-lg" />
                </div>
              )}
            </div>

            <button
              onClick={handleCopyLink}
              disabled={!hasKycDetails || isCopied}
              className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 ease-in-out transform ${
                hasKycDetails
                  ? "bg-blue-500 hover:bg-blue-600 disabled:bg-green-500 hover:scale-105 disabled:scale-100 text-white"
                  : "bg-gray-300 cursor-not-allowed text-gray-400"
              }`}
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
              {hasKycDetails 
                ? "Share your link with friends. When they sign up using your link and purchase any course, you'll receive your referral commission!"
                : "Once you complete KYC verification, you'll get a unique referral link to share with friends and start earning commissions on their course purchases."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralLink;