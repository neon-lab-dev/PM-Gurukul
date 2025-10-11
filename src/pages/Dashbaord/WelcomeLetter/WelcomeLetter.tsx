import { useGetMeQuery } from "../../../redux/Features/User/userApi";
import { formatDate } from "../../../utils/formatDate";

const WelcomeLetter = () => {
  const { data: profile } = useGetMeQuery({});
  const userData = {
    userId: profile?.user?._id,
    distributorName: profile?.user?.full_name,
    address: profile?.user?.addline1 || profile?.user?.addline2,
    dateOfJoining: profile?.user?.createdAt,
    phoneNumber: profile?.user?.mobileNumber,
    email: profile?.user?.email,
    customerCare: "87 50 210 100",
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            PMGURUKKUL Welcome Letter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Official Welcome and Account Details
          </p>
        </div>

        {/* Main Letter Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Letter Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome Letter
                </h2>
                <p className="text-blue-100">PMGURUKKUL Affiliate Program</p>
              </div>
              <div className="mt-4 md:mt-0 text-center md:text-right">
                <div className="text-sm text-blue-200">
                  Date: {formatDate(userData.dateOfJoining)}
                </div>
                <div className="text-lg font-semibold mt-1">
                  Official Document
                </div>
              </div>
            </div>
          </div>

          {/* User Details Section */}
          <div className="p-6 md:p-8">
            {/* User Information */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-600 pb-2">
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <InfoRow label="User ID" value={userData.userId} />
                  <InfoRow
                    label="Distributor Name"
                    value={userData.distributorName}
                  />
                  <InfoRow
                    label="Date of Joining"
                    value={formatDate(userData.dateOfJoining)}
                  />
                </div>
                <div className="space-y-3">
                  <InfoRow label="Phone Number" value={userData.phoneNumber} />
                  <InfoRow label="Email" value={userData.email} />
                  <InfoRow label="Address" value={userData.address} />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 mb-8 border border-yellow-200 dark:border-yellow-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="mr-2">📞</span>
                Support & Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow
                  label="Customer Care"
                  value={userData.customerCare}
                  highlight={true}
                />
                <InfoRow
                  label="Support Email"
                  value={userData.email}
                  highlight={true}
                />
              </div>
            </div>

            {/* Welcome Message */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Dear {userData.distributorName},
              </h3>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Welcome to <strong>PMGURUKKUL</strong>! We are thrilled to
                  have you as part of our growing community of educators and
                  affiliates. Your journey towards professional growth and
                  financial success begins now.
                </p>

                <p>
                  As a valued member of our affiliate program, you now have
                  access to our comprehensive course platform and the
                  opportunity to earn through our referral system. Your
                  dedication and efforts will be rewarded as you help others
                  discover quality education while building your own success.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    Your Benefits:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                    <li>Access to premium educational content</li>
                    <li>Lucrative affiliate commission structure</li>
                    <li>Real-time tracking and analytics</li>
                    <li>Dedicated support team</li>
                    <li>Regular training and updates</li>
                  </ul>
                </div>

                <p>
                  We encourage you to explore the distributor portal where you
                  can track your referrals, monitor earnings, and access
                  marketing materials. Our customer care team is always
                  available to assist you with any questions or support you may
                  need.
                </p>

                <p>
                  Once again, welcome to the PMGURUKKUL family. We look forward
                  to supporting your success and growing together!
                </p>

                <div className="mt-8">
                  <p className="font-semibold">Best Regards,</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    The PMGURUKKUL Team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for information rows
const InfoRow = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100 dark:border-gray-600">
    <span
      className={`font-medium ${
        highlight
          ? "text-yellow-700 dark:text-yellow-300"
          : "text-gray-600 dark:text-gray-400"
      } text-sm sm:text-base`}
    >
      {label}:
    </span>
    <span
      className={`font-semibold ${
        highlight
          ? "text-yellow-800 dark:text-yellow-200 text-lg"
          : "text-gray-800 dark:text-gray-200"
      } break-all mt-1 sm:mt-0 text-sm sm:text-base`}
    >
      {value}
    </span>
  </div>
);

export default WelcomeLetter;
