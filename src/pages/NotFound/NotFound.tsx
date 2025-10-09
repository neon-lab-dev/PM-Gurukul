import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-[#051539] rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">404</h1>

          <h2 className="text-xl md:text-2xl text-gray-600 font-semibold">
            Page Not Found
          </h2>

          <p className="text-gray-500 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back to familiar territory.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-6">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-[#051539] text-white rounded-lg font-medium hover:bg-blue-900 transition-colors w-full sm:w-auto justify-center"
            >
              <FaHome className="w-4 h-4" />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
            >
              <FaArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
